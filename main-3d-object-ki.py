# OpenCV, Numpy
import cv2
import numpy as np
import math
import trimesh  # zum Laden des .glb 3D-Modells

# ----------------------------
# Hilfsfunktionen (Rotation/Quaternion/Euler)
# ----------------------------
def rodrigues_to_mat(rvec):
    R, _ = cv2.Rodrigues(rvec)
    return R

def mat_to_quat(R):
    # Rotation matrix to quaternion (w, x, y, z)
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
    wx, wy, wz = s * w * x, s * w * y, s * w * z
    xx, xy, xz = s * x * x, s * x * y, s * x * z
    yy, yz, zz = s * y * y, s * y * z, s * z * z
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
    def deg360(rad): return math.degrees(rad) % 360.0
    return deg360(y), deg360(x), deg360(z)

# ----------------------------
# Cube <-> Marker Geometrie (relativ zum Mittelpkt. des Würfels)
# ----------------------------
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
    M[2], M[6], M[1], M[5], M[3], M[4] = (R2,t2),(R6,t6),(R1,t1),(R5,t5),(R3,t3),(R4,t4)
    return M

# ----------------------------
# Haupt-Teil
# ----------------------------
def main():
    camera = cv2.VideoCapture(0)
    if not camera.isOpened():
        print("[ERROR] Webcam konnte nicht geöffnet werden")
        return

    aruco_dict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_6X6_250)
    try:
        parameters = cv2.aruco.DetectorParameters_create()
    except AttributeError:
        parameters = cv2.aruco.DetectorParameters()

    camera_matrix = np.array([[800, 0, 320],
                              [0, 800, 240],
                              [0, 0, 1]], dtype=float)
    dist_coeffs = np.zeros((5, 1))
    marker_length = 0.055
    marker_to_cube = build_marker_to_cube_map(marker_length)

    # 3D-Objekt (.glb) laden
    model_path = "./3d/medieval-architecture-2725.glb"
    try:
        mesh = trimesh.load(model_path, force='mesh')
        model_vertices = np.array(mesh.vertices, dtype=float)
        model_faces = np.array(mesh.faces)
        model_scale = marker_length * 0.5 / max(np.linalg.norm(model_vertices, axis=1))
        model_vertices *= model_scale
        print(f"[INFO] 3D-Modell geladen: {len(model_vertices)} Vertices, {len(model_faces)} Flächen")
    except Exception as e:
        print(f"[WARN] 3D-Objekt konnte nicht geladen werden: {e}")
        mesh = None

    window_name = "ArUco Marker + 3D-Objekt Projektion"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(window_name, 1280, 720)

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
                rvec, tvec, _ = cv2.aruco.estimatePoseSingleMarkers([c], marker_length, camera_matrix, dist_coeffs)
                rvec = rvec[0].reshape((3,1))
                tvec = tvec[0].reshape((3,1))
                R_cam_m = rodrigues_to_mat(rvec)
                t_cam_m = tvec.reshape(3)
                if marker_id not in marker_to_cube:
                    continue
                R_m_cub, t_m_cub = marker_to_cube[marker_id]
                R_cam_cube = R_cam_m @ R_m_cub.T
                t_cam_cube = t_cam_m - R_cam_cube @ t_m_cub
                cube_poses.append((R_cam_cube, t_cam_cube))
                cv2.drawFrameAxes(frame, camera_matrix, dist_coeffs, rvec, tvec, marker_length*0.5)

        if len(cube_poses) > 0 and mesh is not None:
            rots, trans = [], []
            for Rct, tct in cube_poses:
                rots.append(mat_to_quat(Rct))
                trans.append(tct)
            R_avg = quat_to_mat(average_quaternions(rots))
            t_avg = np.mean(np.stack(trans, axis=0), axis=0)

            yaw_deg, pitch_deg, roll_deg = mat_to_euler_degrees(R_avg)
            cv2.putText(frame, f"Yaw:{yaw_deg:.1f} Pitch:{pitch_deg:.1f} Roll:{roll_deg:.1f}",
                        (10,30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,200,255), 2)

            # --- 3D-Objekt-Projektion ---
            verts_world = (R_avg @ model_vertices.T).T + t_avg[np.newaxis,:]
            imgpts, _ = cv2.projectPoints(verts_world, np.zeros(3), np.zeros(3), camera_matrix, dist_coeffs)
            imgpts = imgpts.reshape(-1,2)

            # einfache Tiefensortierung
            face_depths = [(np.mean([verts_world[idx,2] for idx in f]), f) for f in model_faces]
            face_depths.sort(reverse=True)
            for depth, face in face_depths:
                poly = np.array([imgpts[idx] for idx in face], dtype=np.int32)
                color = (180, 180, 230)
                cv2.fillConvexPoly(frame, poly, color)
                cv2.polylines(frame, [poly], True, (60,60,100), 1)

        else:
            cv2.putText(frame, "Kein Marker oder 3D-Objekt erkannt", (10,30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)

        cv2.imshow(window_name, frame)
        if cv2.waitKey(1) & 0xFF == ord('x'):
            break

    camera.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
