# OpenCV, Numpy
import cv2
import numpy as np
import math

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
    # Markley et al. method (here simple normalized average as approximation)
    Q = np.stack(quats, axis=0)
    avg = np.mean(Q, axis=0)
    return normalize_quat(avg)

def mat_to_euler_degrees(R):
    # Convert rotation matrix to Euler angles (yaw, pitch, roll) in degrees
    # We'll use the convention (yaw around Y, pitch around X, roll around Z) (Y-X-Z)
    # Other conventions are possible — adjust if you want different order.
    sy = math.sqrt(R[0,0]*R[0,0] + R[1,0]*R[1,0])
    singular = sy < 1e-6
    if not singular:
        x = math.atan2(R[2,1], R[2,2])  # pitch? (rotation around X)
        y = math.atan2(-R[2,0], sy)    # yaw? (rotation around Y)
        z = math.atan2(R[1,0], R[0,0])  # roll? (rotation around Z)
    else:
        x = math.atan2(-R[1,2], R[1,1])
        y = math.atan2(-R[2,0], sy)
        z = 0
    # Convert to degrees 0-359
    def deg360(rad):
        d = math.degrees(rad) % 360.0
        return d
    return deg360(y), deg360(x), deg360(z)  # (yaw, pitch, roll)


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

# Hier definieren wir die relative Pose jedes Markers im Würfel-Koordinatensystem.
# Koordinaten: Ursprung = Würfelmittelpunkt. +X = rechts, +Y = oben, +Z = vorne (ID2 = vorne).
# marker_length ist die Kantenlänge des Markers (und wir nehmen an, dass der ganze Würfel die Seitenlänge s = marker_length hat).
# Die Marker liegen mittig auf jeder Würfelseite -> Abstand vom Zentrum = s/2 entlang der Normalen.
def build_marker_to_cube_map(marker_length):
    s = marker_length  # Seitenlänge des Würfels (angenommen)
    half = s/2.0
    M = {}
    # ID 2: Vorderseite (+Z)
    R2 = np.eye(3)
    t2 = np.array([0.0, 0.0, half], dtype=float)
    M[2] = (R2, t2)
    # ID 6: Rückseite (-Z) -> Marker schaut nach -Z, also Marker-Z zeigt -Z.
    R6 = rot_y(180.0)
    t6 = np.array([0.0, 0.0, -half], dtype=float)
    M[6] = (R6, t6)
    # ID 1: Oben (+Y). Wir möchten, dass Marker z -> +Y, Rotation Rx(-90)
    R1 = rot_x(-90.0)
    t1 = np.array([0.0, half, 0.0], dtype=float)
    M[1] = (R1, t1)
    # ID 5: Unten (-Y): marker z -> -Y => Rx(+90)
    R5 = rot_x(90.0)
    t5 = np.array([0.0, -half, 0.0], dtype=float)
    M[5] = (R5, t5)
    # ID 3: Rechts (+X): marker z -> +X => Ry(+90)
    R3 = rot_y(90.0)
    t3 = np.array([half, 0.0, 0.0], dtype=float)
    M[3] = (R3, t3)
    # ID 4: Links (-X): marker z -> -X => Ry(-90)
    R4 = rot_y(-90.0)
    t4 = np.array([-half, 0.0, 0.0], dtype=float)
    M[4] = (R4, t4)
    return M

# ----------------------------
# 3D Mesh: kleines Demonstrationsobjekt (Würfel)
# ----------------------------
def create_cube_mesh(size=0.05): # Seitenlänge 5cm
    # centered at origin
    h = size/1 # Größe des Würfelobjektes (size/2 für Hälfte, size/1 für volle Seite)
    vertices = np.array([
        [-h,-h,-h], [ h,-h,-h], [ h, h,-h], [-h, h,-h],  # back face z=-h
        [-h,-h, h], [ h,-h, h], [ h, h, h], [-h, h, h],  # front face z=+h
    ], dtype=float)
    faces = [
        (4,5,6,7),  # front
        (0,1,2,3),  # back
        (0,1,5,4),  # bottom
        (3,2,6,7),  # top
        (1,2,6,5),  # right
        (0,3,7,4)   # left
    ]
    return vertices, faces

# ----------------------------
# Hier beginnt der zusammengeführte Haupt-Teil
# ----------------------------
# Wir übernehmen und kombinieren die Logik aus:
# - aruco_marker_image.py (Bild-Overlay, Metadaten, UI)
# - aruco_marker_ki-generiert.py (Pose, Quaternionen, 3D-Würfel-Projektion)
#
# Ziel: 2D-Bilder im Hintergrund (auf Marker projiziert), 3D-Würfel im Vordergrund (zentriert auf gemittelten Würfelpose).
#
# Hinweis: Alle Kommentare aus beiden Quelldateien wurden beibehalten.

def main():
    # Kamera einbinden & öffnen
    camera = cv2.VideoCapture(0)
    if not camera.isOpened():
        print("[ERROR] Webcame konnte nicht geöffnet werden")
        return

    # --- ArUco Dictionary und Detector ---
    aruco_dict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_6X6_250)
    try:
        parameters = cv2.aruco.DetectorParameters_create()  # ältere OpenCV-Version
    except AttributeError:
        parameters = cv2.aruco.DetectorParameters()  # neuere OpenCV-Version

    # Kamera-Kalibrierung (Beispielwerte)
    camera_matrix = np.array([[800, 0, 320],
                              [0, 800, 240],
                              [0, 0, 1]], dtype=float)
    dist_coeffs = np.zeros((5, 1))

    # Marker / Würfel Geometrie (in Metern)
    marker_length = 0.055  # <- reale Marker-Kantenlänge in Metern (ANPASSEN)

    # Marker->Würfel Map
    marker_to_cube = build_marker_to_cube_map(marker_length)

    # 3D Objekt erstellen (Würfel)
    mesh_vertices, mesh_faces = create_cube_mesh(size=marker_length*0.6)

    # --- Overlay-Bilder / Metadaten (aus aruco_marker_image.py) ---
    # --- Overlay-Bild laden (mit Alphakanal) ---
    # overlay1 = cv2.imread("overlay.png", cv2.IMREAD_UNCHANGED)
    # if overlay1 is None:
    #    print("Fehler: Bild overlay.png nicht gefunden.")
    #    exit()
    # overlay2 = cv2.imread("perry.png", cv2.IMREAD_UNCHANGED)
    # if overlay2 is None:
    #    print("Fehler: Bild perry.png nicht gefunden.")
    #    exit()

    imgList = ["./img/black.png", "./img/black.png", "./img/black.png", "./img/black.png", "./img/black.png", "./img/black.png"]

    # imgList2 = [["img", "./img/berlin.png"], ["color", "red"], ["none"]]
    # Abfrage: print(imgList2[0][1])

    # imgList3 = {
    #    "1": "./img/berlin.png",
    #    "2": "red",
    #    "3": "none",
    # }
    # print(imgList3["1"])


    # Zuordnung
    currentInformation = {
        # 3D-Objekt
        "oId": "O-123456",
        "oTitle": "Mittelalterliche Architektur",
        "oAccessed": "08.11.2025",
        "oFilePath": "./3d/medieval-architecture-2725.glb",
        "oFileURL": "https://pixabay.com/de/3d-models/mittelalterliche-architektur-2725/",
        "oCreatorName": "SerenityArt",
        "oCreatorLink": "https://pixabay.com/de/users/serenityart-38195676/?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2725",
        "oSourceName": "Pixabay",
        "oSourceLink": "https://pixabay.com/de//?utm_source=link-attribution&utm_medium=referral&utm_campaign=object3d&utm_content=2725",
                
        # Musik
        "mTitle": "noMittelalterliche Musikne",
        "mId": "M-123456",
        "mAccessed": "08.11.2025",
        "mFilePath": "./music/musik-hintergrund-142725.mp3",
        "mFileURL": "https://pixabay.com/music/folk-musik-hintergrund-142725/",
        "mStartAt": 5,
        "mCreatorName": "OTH Amberg-Weiden",
        "mCreatorLink": "https://pixabay.com/users/dueg-oth-34165349/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=142725",
        "mSourceName": "Pixabay",
        "mSourceLink": "https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=142725",

        # Würfelseiten
        "side1": "./img/black.png",
        "side2": "./img/black.png",
        "side3": "./img/black.png",
        "side4": "./img/black.png",
        "side5": "./img/black.png",
        "side6": "./img/black.png"

        # "apple": {"field1": "./a", "field2": "red", "field3": "fruit"},
    }

    window_name = "ArUco Marker Bild-Overlay + Cube"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(window_name, 1280, 720)

    while True:
        ret, frame = camera.read()
        if not ret:
            print("[ERROR] Kamerabild konnte nicht gelesen werden")
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # --- Marker erkennen ---
        corners, ids, rejected = cv2.aruco.detectMarkers(gray, aruco_dict, parameters=parameters)

        # Wir sammeln die Pose-Informationen pro Marker für spätere Würfel-Mittelung
        cube_poses = []  # Liste von (R_cam_cube, t_cam_cube) aus jedem detektierten Marker

        # Erst: rendern (projizieren) wir alle 2D-Overlays auf die erkannten Marker (HINTERGRUND)
        if ids is not None:
            ids = ids.flatten()
            for i, c in enumerate(corners):
                marker_id = int(ids[i])

                # --- Eckpunkte vorbereiten ---
                corner = c.reshape((4, 2)).astype(np.float32)
                pts_int = corner.astype(int)
                (topLeft, topRight, bottomRight, bottomLeft) = pts_int

                # Rahmen (gelb)
                cv2.polylines(frame, [pts_int], isClosed=True, color=(0, 255, 255), thickness=2)

                # Eckpunkte (rot)
                for (x, y) in pts_int:
                    cv2.circle(frame, (x, y), 3, (0, 0, 255), -1)

                # --- Mittelpunkt markieren (blau) ---
                centerX = int((topLeft[0] + bottomRight[0]) / 2)
                centerY = int((topLeft[1] + bottomRight[1]) / 2)
                cv2.circle(frame, (centerX, centerY), 5, (255, 0, 0), -1)

                # Marker-ID anzeigen (grün)
                cv2.putText(frame, f"ID: {marker_id}", (topLeft[0], topLeft[1] - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

                # Marker-Pose relativ zur Kamera (für 3D-Berechnungen)
                rvec, tvec, _ = cv2.aruco.estimatePoseSingleMarkers([c], marker_length, camera_matrix, dist_coeffs)
                rvec = rvec[0].reshape((3,1))
                tvec = tvec[0].reshape((3,1))
                R_cam_m = rodrigues_to_mat(rvec)
                t_cam_m = tvec.reshape(3)

                # Wenn ein Overlay-Bild für diese Marker-ID vorhanden ist, lade und projiziere es
                overlay_path = None
                try:
                    # imgList index basiert auf markerId-1; guard für IndexError
                    overlay_path = imgList[(marker_id - 1)]
                except Exception:
                    overlay_path = None

                if overlay_path is not None:
                    overlay = cv2.imread(overlay_path, cv2.IMREAD_UNCHANGED)
                    if overlay is None:
                        # Overlay nicht gefunden => Hinweis, aber wir machen weiter
                        # Fehler: Bild konnte nicht gefunden oder geladen werden
                        print(f"Fehler: Bild '{overlay_path}' konnte nicht gefunden oder geladen werden")
                    else:
                        # Overlay-Bild perspektivisch auf Marker projizieren (HINTERGRUND)
                        h, w = overlay.shape[:2]
                        src_pts = np.array([[0, 0],
                                            [w - 1, 0],
                                            [w - 1, h - 1],
                                            [0, h - 1]], dtype=np.float32)
                        dst_pts = corner  # float32 4x2
                        M = cv2.getPerspectiveTransform(src_pts, dst_pts)

                        # Anker hier #


                        warped = cv2.warpPerspective(overlay, M, (frame.shape[1], frame.shape[0]), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0,0))

                        # Alphamischung
                        if warped.shape[2] == 4:  # PNG mit Alpha
                            alpha = warped[:, :, 3].astype(float) / 255.0
                            alpha_3 = cv2.merge([alpha, alpha, alpha])
                            overlay_rgb = warped[:, :, :3].astype(float)
                            background = frame.astype(float)
                            # sichere Alpha-Blending: nur dort mischen, wo alpha > 0
                            mask = alpha_3 > 0.01
                            blended = background.copy()
                            blended[mask] = overlay_rgb[mask] * alpha_3[mask] + background[mask] * (1 - alpha_3[mask])
                            frame = np.clip(blended, 0, 255).astype(np.uint8)

                        else:
                            # Falls kein Alpha: leichte Mischung
                            frame = cv2.addWeighted(frame, 1.0, warped, 0.6, 0)

                # Falls Marker nicht in our map: skip 3D-calc for cube pose
                if marker_id not in marker_to_cube:
                    # print a small note in the frame
                    cv2.putText(frame, f"Marker {marker_id} not in cube-map", (pts_int[0][0], pts_int[0][1] + 20),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
                    continue

                # Berechne Marker->Würfel Transform (wie in ki-generiert)
                R_m_cub, t_m_cub = marker_to_cube[marker_id]  # R and t in cube frame

                # R_cam_cube = R_cam_m * R_m_cub^{-1}  (R_m_cub^{-1} == R_m_cub.T)
                R_cam_cube = R_cam_m @ R_m_cub.T
                t_cam_cube = t_cam_m - R_cam_cube @ t_m_cub

                cube_poses.append((R_cam_cube, t_cam_cube))

                # draw axis for marker (sichtbar in Vordergrund - bleibt sichtbar)
                cv2.drawFrameAxes(frame, camera_matrix, dist_coeffs, rvec, tvec, marker_length*0.5)

        # Jetzt: 3D-Projektion des Würfels basierend auf den gemessenen cube_poses (VORDERGRUND)
        if len(cube_poses) > 0:
            rots = []
            trans = []
            for Rct, tct in cube_poses:
                rots.append(mat_to_quat(Rct))
                trans.append(tct)
            avg_q = average_quaternions(rots)
            R_avg = quat_to_mat(avg_q)
            t_avg = np.mean(np.stack(trans, axis=0), axis=0)

            # Euler (yaw, pitch, roll)
            yaw_deg, pitch_deg, roll_deg = mat_to_euler_degrees(R_avg)

            # Anzeige
            text = f"Yaw: {yaw_deg:.1f}°   Pitch: {pitch_deg:.1f}°   Roll: {roll_deg:.1f}"
            cv2.putText(frame, text, (10,30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,200,255), 2)

            # Zusätzlich: numerisch als 0..359
            cv2.putText(frame, f"yaw:{int(yaw_deg)%360} pitch:{int(pitch_deg)%360} roll:{int(roll_deg)%360}",
                        (10,60), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200,200,50), 2)

            # 3D Objekt (Mesh) im Würfelzentrum -> transformieren und projizieren
            # Mesh im Würfel-Koordinatensystem platzieren (Zukunft: wende zusätzlich lokale Rotation an)
            # Punkte in camera coordinates: X_cam = R_avg * X_cube + t_avg
            verts_world = (R_avg @ mesh_vertices.T).T + t_avg[np.newaxis,:]
            # Projektion
            imgpts, _ = cv2.projectPoints(verts_world, np.zeros(3), np.zeros(3), camera_matrix, dist_coeffs)
            imgpts = imgpts.reshape(-1,2)

            # Zeichne Flächen sortiert nach mittlerer Tiefe (zum einfachen Z-Sorting)
            face_depths = []
            for fi, face in enumerate(mesh_faces):
                depth = np.mean([verts_world[idx,2] for idx in face])
                face_depths.append((depth, fi))
            face_depths.sort(reverse=True)  # weitere zuerst (malen hinteren Flächen zuerst)

            for _, fi in face_depths:
                face = mesh_faces[fi]
                poly = np.array([imgpts[idx] for idx in face], dtype=np.int32)
                # einfache Farbgebung, abhängig von face id
                color = tuple([int(120 + (fi*30)%120), int(50 + (fi*50)%200), int(200 - (fi*20)%120)])
                # fill polygon (dies legt die 3D-Projektion in den Vordergrund, über den Overlays)
                cv2.fillConvexPoly(frame, poly, color)
                cv2.polylines(frame, [poly], True, (10,10,10), 1)

            # Optional: draw cube center point
            center2d, _ = cv2.projectPoints(np.array([[0,0,0]], dtype=float), np.zeros(3), np.zeros(3),
                                            camera_matrix, dist_coeffs)
            center2d = tuple(center2d.ravel().astype(int))
            cv2.circle(frame, center2d, 5, (0,255,0), -1)
        else:
            cv2.putText(frame, "Keine ausreichende Marker-Pose erkannt", (10,30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)

        # Small Screen / Fullscreen Optionen aus aruco_marker_image.py (kommentiert beibehalten)
        # cv2.imshow("ArUco Marker Bild-Overlay", frame)
        # Fullscreen
        #window_name = "ArUco Marker Bild-Overlay"
        #cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
        #cv2.setWindowProperty(window_name, cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

        cv2.imshow(window_name, frame)

        if cv2.waitKey(1) & 0xFF == ord('x'):
            break

    camera.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()