# aruco_glb_optimized.py
# ============================================================
# ARUCO + GLB Rendering (robust & performance-optimized)
# - Lädt .glb/.gltf und rendert es perspektivisch über ArUco-Würfelpose
# - Mesh cleaning, decimation, triangulation fallback
# - Backface culling + optional point-cloud fallback
# - Material baseColorFactor verwendet falls vorhanden
# ============================================================

import cv2
import numpy as np
import math
import trimesh
import sys

# ----------------------------
# Hilfsfunktionen (Rotation/Quaternion/Euler)
# ----------------------------
def rodrigues_to_mat(rvec):
    R, _ = cv2.Rodrigues(rvec)
    return R

def mat_to_quat(R):
    m = R
    trace = m[0,0] + m[1,1] + m[2,2]
    if trace > 0:
        s = 0.5 / math.sqrt(trace + 1.0)
        w = 0.25 / s
        x = (m[2,1] - m[1,2]) * s
        y = (m[0,2] - m[2,0]) * s
        z = (m[1,0] - m[0,1]) * s
    else:
        if m[0,0] > m[1,1] and m[0,0] > m[2,2]:
            s = 2.0 * math.sqrt(1.0 + m[0,0] - m[1,1] - m[2,2])
            w = (m[2,1] - m[1,2]) / s
            x = 0.25 * s
            y = (m[0,1] + m[1,0]) / s
            z = (m[0,2] + m[2,0]) / s
        elif m[1,1] > m[2,2]:
            s = 2.0 * math.sqrt(1.0 + m[1,1] - m[0,0] - m[2,2])
            w = (m[0,2] - m[2,0]) / s
            x = (m[0,1] + m[1,0]) / s
            y = 0.25 * s
            z = (m[1,2] + m[2,1]) / s
        else:
            s = 2.0 * math.sqrt(1.0 + m[2,2] - m[0,0] - m[1,1])
            w = (m[1,0] - m[0,1]) / s
            x = (m[0,2] + m[2,0]) / s
            y = (m[1,2] + m[2,1]) / s
            z = 0.25 * s
    return np.array([w, x, y, z], dtype=float)

def quat_to_mat(q):
    w, x, y, z = q
    n = w*w + x*x + y*y + z*z
    if n < 1e-12:
        return np.eye(3)
    s = 1.0 / n
    wx, wy, wz = s*w*x, s*w*y, s*w*z
    xx, xy, xz = s*x*x, s*x*y, s*x*z
    yy, yz, zz = s*y*y, s*y*z, s*z*z
    R = np.array([
        [1 - 2*(yy+zz),     2*(xy - wz),   2*(xz + wy)],
        [2*(xy + wz),     1 - 2*(xx+zz),   2*(yz - wx)],
        [2*(xz - wy),       2*(yz + wx), 1 - 2*(xx+yy)]
    ], dtype=float)
    return R

def normalize_quat(q):
    return q / np.linalg.norm(q)

def average_quaternions(quats):
    Q = np.stack(quats, axis=0)
    avg = np.mean(Q, axis=0)
    return normalize_quat(avg)

def mat_to_euler_degrees(R):
    sy = math.sqrt(R[0,0]*R[0,0] + R[1,0]*R[1,0])
    singular = sy < 1e-6
    if not singular:
        x = math.atan2(R[2,1], R[2,2])
        y = math.atan2(-R[2,0], sy)
        z = math.atan2(R[1,0], R[0,0])
    else:
        x = math.atan2(-R[1,2], R[1,1])
        y = math.atan2(-R[2,0], sy)
        z = 0
    def deg360(rad):
        return math.degrees(rad) % 360.0
    return deg360(y), deg360(x), deg360(z)

# Rotation-Matrizen
def rot_x(angle_deg):
    a = math.radians(angle_deg)
    ca, sa = math.cos(a), math.sin(a)
    return np.array([[1,0,0],[0,ca,-sa],[0,sa,ca]], dtype=float)
def rot_y(angle_deg):
    a = math.radians(angle_deg)
    ca, sa = math.cos(a), math.sin(a)
    return np.array([[ca,0,sa],[0,1,0],[-sa,0,ca]], dtype=float)
def rot_z(angle_deg):
    a = math.radians(angle_deg)
    ca, sa = math.cos(a), math.sin(a)
    return np.array([[ca,-sa,0],[sa,ca,0],[0,0,1]], dtype=float)

def build_marker_to_cube_map(marker_length):
    s = marker_length
    half = s/2.0
    M = {}
    R2 = np.eye(3); t2 = np.array([0.0, 0.0, half])
    R6 = rot_y(180.0); t6 = np.array([0.0, 0.0, -half])
    R1 = rot_x(-90.0); t1 = np.array([0.0, half, 0.0])
    R5 = rot_x(90.0);  t5 = np.array([0.0, -half, 0.0])
    R3 = rot_y(90.0);  t3 = np.array([half, 0.0, 0.0])
    R4 = rot_y(-90.0); t4 = np.array([-half, 0.0, 0.0])
    M[2] = (R2, t2); M[6] = (R6, t6); M[1] = (R1, t1)
    M[5] = (R5, t5); M[3] = (R3, t3); M[4] = (R4, t4)
    return M

# ----------------------------
# Haupt-Programm
# ----------------------------
def main():
    # Kamera öffnen
    camera = cv2.VideoCapture(0)
    if not camera.isOpened():
        print("[ERROR] Webcam konnte nicht geöffnet werden")
        return

    # ArUco
    aruco_dict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_6X6_250)
    try:
        parameters = cv2.aruco.DetectorParameters_create()
    except AttributeError:
        parameters = cv2.aruco.DetectorParameters()

    # Kamera-Parameter (beispielhaft — bei Bedarf kalibrieren!)
    camera_matrix = np.array([[800, 0, 320],
                              [0, 800, 240],
                              [0, 0, 1]], dtype=float)
    dist_coeffs = np.zeros((5,1))

    marker_length = 0.055  # Meter
    marker_to_cube = build_marker_to_cube_map(marker_length)

    # -------- 3D Modell laden & vorbereiten ----------
    model_path = "./3d/heart-23.glb"  # anpassen

    mesh = None
    material_color = (180,180,230)  # default
    model_triangles = None          # will become an (N,3,3) array of triangle vertices

    try:
        mesh = trimesh.load(model_path, force='mesh')
        print(f"[INFO] Original mesh: {len(mesh.vertices)} vertices, {len(mesh.faces)} faces")

        # 0) Grundreinigung
        try:
            mesh.remove_degenerate_faces()
        except Exception:
            pass
        try:
            mesh.remove_duplicate_faces()
        except Exception:
            pass
        try:
            mesh.remove_unreferenced_vertices()
        except Exception:
            pass
        try:
            mesh.rezero()
        except Exception:
            pass
        try:
            mesh.fix_normals()
        except Exception:
            pass

        # 1) Materialfarbe (baseColorFactor) falls vorhanden
        try:
            if hasattr(mesh.visual, "material") and mesh.visual.material is not None:
                base = mesh.visual.material.baseColorFactor[:3]
                material_color = tuple(int(255*c) for c in base)
                print("[INFO] material baseColorFactor used:", material_color)
            elif hasattr(mesh.visual, "vertex_colors") and mesh.visual.vertex_colors is not None:
                # fallback (use average vertex color)
                vc = np.array(mesh.visual.vertex_colors)
                if vc.size:
                    avg = np.mean(vc[:,:3], axis=0)
                    material_color = tuple(int(c) for c in avg)
                    print("[INFO] averaged vertex color used:", material_color)
        except Exception:
            pass

        # 2) Vereinfachen wenn sehr groß
        TARGET_FACES = 3000
        try:
            if len(mesh.faces) > TARGET_FACES:
                mesh = mesh.simplify_quadratic_decimation(TARGET_FACES)
                print(f"[INFO] Mesh simplified to {len(mesh.faces)} faces")
        except Exception as e:
            print("[WARN] simplify_quadratic_decimation failed:", e)

        # 3) Triangles array (unabhängig von faces topology)
        try:
            model_triangles = mesh.triangles.copy()  # shape (n_tri, 3, 3)
            if model_triangles is None or len(model_triangles) == 0:
                raise ValueError("no triangles")
        except Exception as e:
            print("[WARN] mesh.triangles not usable:", e)
            # fallback: try to triangulate faces by building new Trimesh (rare)
            mesh = trimesh.Trimesh(vertices=mesh.vertices, faces=mesh.faces, process=True)
            model_triangles = mesh.triangles.copy()

        # 4) Normalisieren / Skalieren / Orientation fix
        bbox_min, bbox_max = mesh.bounds
        model_size = np.linalg.norm(bbox_max - bbox_min)
        if model_size <= 0:
            model_size = 1.0
        desired_size = marker_length * 0.8
        scale = desired_size / model_size
        # apply scaling to triangles
        model_triangles *= scale

        # orientation fix: glTF (+Y up, +Z forward) -> OpenCV (+Y down, +Z forward)
        # rotate -90 deg around X, then optionally flip Z if needed
        rot_fix = np.array([[1,0,0],[0,0,1],[0,-1,0]], dtype=float)
        # optional extra Z flip for some models; keep as configurable flag
        DO_Z_FLIP = False

        # apply rotation to all triangle vertices
        model_triangles = np.einsum('ij,tvj->tvi', rot_fix, model_triangles)
        if DO_Z_FLIP:
            model_triangles[:,:,2] *= -1

        # center triangles around origin
        centroid = np.mean(model_triangles.reshape(-1,3), axis=0)
        model_triangles = model_triangles - centroid[np.newaxis, np.newaxis, :]

        print(f"[INFO] prepared triangles: {model_triangles.shape[0]} triangles, scale={scale:.4f}")

    except Exception as e:
        print("[WARN] Could not load 3D model:", e)
        mesh = None
        model_triangles = None

    # Window
    window_name = "ARUCO + GLB Optimized"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(window_name, 1280, 720)

    # Performance / fallback thresholds
    TRIANGLE_POINTCLOUD_FALLBACK = 15000   # if triangles exceed this, render point cloud instead
    POINT_SAMPLES = 4000                   # number of points to sample for point-cloud fallback

    while True:
        ret, frame = camera.read()
        if not ret:
            print("[ERROR] Kein Kamerabild gelesen")
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        corners, ids, rejected = cv2.aruco.detectMarkers(gray, aruco_dict, parameters=parameters)

        cube_poses = []

        if ids is not None:
            ids = ids.flatten()
            for i, c in enumerate(corners):
                marker_id = int(ids[i])
                # pose for the single marker (camera <- marker)
                rvec, tvec, _ = cv2.aruco.estimatePoseSingleMarkers([c], marker_length, camera_matrix, dist_coeffs)
                rvec = rvec[0].reshape((3,1))
                tvec = tvec[0].reshape(3)
                R_cam_m = rodrigues_to_mat(rvec)
                t_cam_m = tvec

                if marker_id not in marker_to_cube:
                    continue

                R_m_cub, t_m_cub = marker_to_cube[marker_id]
                R_cam_cube = R_cam_m @ R_m_cub.T
                t_cam_cube = t_cam_m - R_cam_cube @ t_m_cub

                cube_poses.append((R_cam_cube, t_cam_cube))

                # draw axes for debug
                cv2.drawFrameAxes(frame, camera_matrix, dist_coeffs, rvec, tvec, marker_length*0.5)

        # If we have at least one pose and a loaded mesh, render it
        if cube_poses and (model_triangles is not None):
            # average orientation + position
            rots = [mat_to_quat(R) for R, _ in cube_poses]
            trans = [t for _, t in cube_poses]
            R_avg = quat_to_mat(average_quaternions(rots))
            t_avg = np.mean(np.stack(trans, axis=0), axis=0)

            # transform triangles into camera coords: verts_world (n_tri,3,3)
            # apply rotation+translation: X_cam = R_avg @ X_model + t_avg
            tris_cam = np.einsum('ij,tvj->tvi', R_avg, model_triangles) + t_avg[np.newaxis, np.newaxis, :]

            # project all triangle vertices
            tri_verts_flat = tris_cam.reshape(-1,3)
            imgpts, _ = cv2.projectPoints(tri_verts_flat, np.zeros(3), np.zeros(3), camera_matrix, dist_coeffs)
            imgpts = imgpts.reshape(-1,2)
            imgpts_tri = imgpts.reshape(-1,3,2)  # shape (n_tri, 3, 2)

            # Depth per triangle (mean z)
            tri_depths = np.mean(tris_cam[:,:,2], axis=1)
            order = np.argsort(tri_depths)[::-1]  # far->near

            # Fallback to point cloud rendering if too many triangles
            if len(tris_cam) > TRIANGLE_POINTCLOUD_FALLBACK:
                # sample points on mesh surface for fast rendering
                print("[INFO] Many triangles detected — using point-cloud fallback for performance")
                try:
                    pts = mesh.sample(POINT_SAMPLES)
                    pts_world = (R_avg @ pts.T).T + t_avg
                    p_img, _ = cv2.projectPoints(pts_world, np.zeros(3), np.zeros(3), camera_matrix, dist_coeffs)
                    p_img = p_img.reshape(-1,2).astype(int)
                    for (x,y) in p_img:
                        if 0 <= x < frame.shape[1] and 0 <= y < frame.shape[0]:
                            frame[y,x] = material_color
                except Exception as e:
                    print("[WARN] point-cloud fallback failed:", e)
            else:
                # Backface culling + draw triangles
                cam_dir = np.array([0,0,1.0])
                # choose to enable culling (recommended). Set False to forcibly disable.
                ENABLE_CULLING = True

                for idx in order:
                    tri = tris_cam[idx]         # (3,3)
                    imgtri = imgpts_tri[idx]    # (3,2)
                    # compute normal in camera space
                    v0, v1, v2 = tri[0], tri[1], tri[2]
                    normal = np.cross(v1 - v0, v2 - v0)
                    # dot with camera forward
                    if ENABLE_CULLING:
                        if normal.dot(cam_dir) <= 0:
                            # face points away from camera -> skip
                            continue
                    # prepare polygon pts integer and bounded
                    poly = np.array(imgtri, dtype=np.int32)
                    # clip polygon if outside image bounds (skip tiny/degenerate)
                    if np.any(np.isnan(poly)) or poly.shape[0] != 3:
                        continue
                    # small validity check - all coords inside a bit of extended range
                    xs = poly[:,0]; ys = poly[:,1]
                    if np.max(xs) < -100 or np.min(xs) > frame.shape[1] + 100: continue
                    if np.max(ys) < -100 or np.min(ys) > frame.shape[0] + 100: continue

                    # fill triangle with material_color
                    cv2.fillConvexPoly(frame, poly, material_color)
                    cv2.polylines(frame, [poly], True, (50,50,80), 1)

        else:
            # no model or no marker
            cv2.putText(frame, "Kein Marker oder 3D-Objekt erkannt", (10,30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)

        cv2.imshow(window_name, frame)
        key = cv2.waitKey(1) & 0xFF
        if key == ord('x'):
            break
        if key == ord('c'):
            # toggle culling for debug
            print("[INFO] Toggle culling pressed (not implemented live toggle in this version)")

    camera.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()