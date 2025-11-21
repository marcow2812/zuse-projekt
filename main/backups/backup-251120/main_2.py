# Bibliotheken importieren
import cv2
import numpy as np
import math
import pygame
import time


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
    "mTitle": "Mittelalterliche Musik",
    "mId": "M-123456",
    "mAccessed": "08.11.2025",
    "mFilePath": "./music/musik-hintergrund-142725.mp3",
    "mFileURL": "https://pixabay.com/music/folk-musik-hintergrund-142725/",
    "mStartAt": 5.0,
    "mCreatorName": "OTH Amberg-Weiden",
    "mCreatorLink": "https://pixabay.com/users/dueg-oth-34165349/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=142725",
    "mSourceName": "Pixabay",
    "mSourceLink": "https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=142725",

    # Würfelseiten
    "side1": "./img/berlin.png",
    "side2": "./img/berlin2.png",
    "side3": "./img/frankfurt.png",
    "side4": "./img/hamburg.png",
    "side5": "./img/muenchen.png",
    "side6": "./img/muenchen2.png"

    # "apple": {"field1": "./a", "field2": "red", "field3": "fruit"},
    #currentInformation["side1"]
}


mp3_path = currentInformation["mFilePath"]

pygame.mixer.init()
pygame.mixer.music.load(mp3_path)


#last_pos = currentInformation["mStartAt"]
#play_start_time = None
#is_playing = False

is_playing = False
last_pos = currentInformation["mStartAt"]  # Startsekunde (z.B. 5.0)
play_start_time = None


def play_music():
    global last_pos, play_start_time, is_playing
    pygame.mixer.music.play(start=last_pos)
    play_start_time = time.time()
    is_playing = True


def stop_music():
    global last_pos, play_start_time, is_playing

    # Fortschritt seit Start berechnen
    if play_start_time is not None:
        last_pos += (time.time() - play_start_time)

    pygame.mixer.music.stop()
    play_start_time = None
    is_playing = False




# Instanzvariablen
# -------------------------------------------
cubeLength = 0.055      # Seitenlänge: 5,5 cm



# Voreinstellungen Fenster
window_name = "AR-Cube | " + currentInformation["oTitle"]
cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
cv2.resizeWindow(window_name, 1200, 700)

# ----------------------------
# Hilfsfunktionen (Rotation/Quaternion/Euler)
# ----------------------------
# Hinweis: KI-generiert
def rodrigues_to_mat(rvec):
    R, _ = cv2.Rodrigues(rvec)
    return R

# Hinweis: KI-generiert
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

# Hinweis: KI-generiert
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

# Hinweis: KI-generiert
def normalize_quat(q):
    return q / np.linalg.norm(q)

# Hinweis: KI-generiert
def average_quaternions(quats):
    # Markley et al. method (here simple normalized average as approximation)
    Q = np.stack(quats, axis=0)
    avg = np.mean(Q, axis=0)
    return normalize_quat(avg)

# Hinweis: KI-generiert
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
# Hinweis: KI-generiert
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
# cubeLength ist die Kantenlänge des Markers (und wir nehmen an, dass der ganze Würfel die Seitenlänge s = cubeLength hat).
# Die Marker liegen mittig auf jeder Würfelseite -> Abstand vom Zentrum = s/2 entlang der Normalen.

# Hinweis: KI-generiert
def build_marker_to_cube_map(cubeLength):
    s = cubeLength  # Seitenlänge des Würfels (angenommen)
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
# Hinweis: KI-generiert / anschließend angepasst
def create_cube_mesh(size=cubeLength): # Seitenlänge 5cm

    # Anker hier #

    h = size/2 # Größe des Würfelobjektes (size/2 für Hälfte, size/1 für volle Seite)
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

# Main-Methode
def main():

    # Kamera einbinden
    camera = cv2.VideoCapture(0)
    if not camera.isOpened():
        print("[ERROR] Webcame konnte nicht geöffnet werden")
        return
    else:
        print("[LOG] Webcame erfolgreich geöffnet")

    # ArUco Dictionary einbinden (und Detector)
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

    # Marker->Würfel Map
    marker_to_cube = build_marker_to_cube_map(cubeLength)

    # 3D Objekt erstellen (Würfel)
    mesh_vertices, mesh_faces = create_cube_mesh(size=cubeLength*0.6)

    # imgList = ["./img/black.png", "./img/black.png", "./img/black.png", "./img/black.png", "./img/black.png", "./img/black.png"]

    # imgList2 = [["img", "./img/berlin.png"], ["color", "red"], ["none"]]
    # Abfrage: print(imgList2[0][1])

    # imgList3 = {
    #    "1": "./img/berlin.png",
    #    "2": "red",
    #    "3": "none",
    # }
    # print(imgList3["1"])


    

    
    # Endlosschleife
    while True:


        ret, frame = camera.read()
        if not ret:
            print("[ERROR] Kamerabild konnte nicht gelesen werden")
            break

        # KI-generierte Bildanpassung:

        # ---- HIER EINSETZEN ----
        # -----------------------------------------
        # Letterbox-Scaling (keine Verzerrung)
        # -----------------------------------------
        TARGET_W = 1200
        TARGET_H = 700

        h, w = frame.shape[:2]
        aspect_cam = w / h
        aspect_target = TARGET_W / TARGET_H

        if aspect_cam > aspect_target:
            new_w = TARGET_W
            new_h = int(TARGET_W / aspect_cam)
        else:
            new_h = TARGET_H
            new_w = int(TARGET_H * aspect_cam)

        frame_resized = cv2.resize(frame, (new_w, new_h), interpolation=cv2.INTER_LINEAR)

        frame_padded = np.zeros((TARGET_H, TARGET_W, 3), dtype=np.uint8)

        x_offset = (TARGET_W - new_w) // 2
        y_offset = (TARGET_H - new_h) // 2

        frame_padded[y_offset:y_offset+new_h, x_offset:x_offset+new_w] = frame_resized

        frame = frame_padded
        # ---- BIS HIER ----

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
                rvec, tvec, _ = cv2.aruco.estimatePoseSingleMarkers([c], cubeLength, camera_matrix, dist_coeffs)
                rvec = rvec[0].reshape((3,1))
                tvec = tvec[0].reshape((3,1))
                R_cam_m = rodrigues_to_mat(rvec)
                t_cam_m = tvec.reshape(3)

                # Wenn ein Overlay-Bild für diese Marker-ID vorhanden ist, lade und projiziere es
                overlay_path = None
                try:
                    # ID aus Liste imgList auslesen
                    #overlay_path = imgList[(marker_id - 1)]
                    overlay_path = currentInformation[f"side{marker_id}"]
                    #print(currentInformation[f"side{marker_id}"])

                except Exception:
                    overlay_path = None

                if overlay_path is not None:
                    overlay = cv2.imread(overlay_path, cv2.IMREAD_UNCHANGED)
                    if overlay is None:
                        # Overlay nicht gefunden => Hinweis, aber wir machen weiter
                        # Fehler: Bild konnte nicht gefunden oder geladen werden
                        print(f"[ERROR]: Bild '{overlay_path}' konnte nicht gefunden oder geladen werden")
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
                else:
                    print("[ERROR] overlay_path ist None")

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
                cv2.drawFrameAxes(frame, camera_matrix, dist_coeffs, rvec, tvec, cubeLength*0.5)

        #if len(cube_poses) > 0:
        #        if not is_playing:
        #            play_music()
        #            is_playing = True
        #else:
        #    if is_playing:
        #        stop_music()
        #        is_playing = False

        if len(cube_poses) > 0:
        # Marker sichtbar → Musik spielen/weiterlaufen
            if not is_playing:
                play_music()
        else:
            # Marker nicht sichtbar → Musik stoppen & Position speichern
            if is_playing:
                stop_music()


        # Jetzt: 3D-Projektion des Würfels basierend auf den gemessenen cube_poses (VORDERGRUND)
        if len(cube_poses) > 0:


            # print("Marker erkannt!")
            #play_music()


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
            #text = f"y-Achse (vertikal): {yaw_deg:.1f}°   x-Achse (horizontal): {pitch_deg:.1f}°   z-Achse (nach vorne): {roll_deg:.1f}"
            #cv2.putText(frame, text, (10,30), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0,200,255), 2)

            # Zusätzlich: numerisch als 0..359
            #cv2.putText(frame, f"y-Achse (vertikal):{int(yaw_deg)%360} x-Achse (horizontal):{int(pitch_deg)%360} z-Achse (nach vorne):{int(roll_deg)%360}",
            #            (10,120), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200,200,50), 2)

            # x-Achse
            cv2.putText(frame, f"x-Achse (horizontal): {pitch_deg:.1f}", (10,30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,200,255), 2)
            # y-Achse
            cv2.putText(frame, f"y-Achse (vertikal): {yaw_deg:.1f}", (10,60), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,200,255), 2)
            # z-Achse
            cv2.putText(frame, f"z-Achse (nach vorne): {roll_deg:.1f}", (10,90), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,200,255), 2)

            # x-Achse Grad
            cv2.putText(frame, f"x-Achse (horizontal): {int(pitch_deg)%360}", (10,120), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200,200,50), 2)
            # y-Achse Grad
            cv2.putText(frame, f"y-Achse (vertikal): {int(yaw_deg)%360}", (10,150), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200,200,50), 2)
            # z-Achse Grad
            cv2.putText(frame, f"z-Achse (nach vorne): {int(roll_deg)%360}", (10,180), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200,200,50), 2)


            

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

            # Farbdefinitionen für jede Würfelseite (B, G, R)
            cube_colors = [
                (0, 0, 255),     # Rot – Vorderseite
                (0, 255, 0),     # Grün – Rückseite
                (255, 0, 0),     # Blau – Unten
                (0, 255, 255),   # Gelb – Oben
                (255, 0, 255),   # Magenta – Rechts
                (255, 255, 0)    # Cyan – Links
            ]

            # Anker hier #


            for _, fi in face_depths:
                face = mesh_faces[fi]
                poly = np.array([imgpts[idx] for idx in face], dtype=np.int32)
                # einfache Farbgebung, abhängig von face id
                color = cube_colors[fi % len(cube_colors)]
                # fill polygon (dies legt die 3D-Projektion in den Vordergrund, über den Overlays)
                cv2.fillConvexPoly(frame, poly, color)
                cv2.polylines(frame, [poly], True, (10,10,10), 1)

            #for _, fi in face_depths:
            #    face = mesh_faces[fi]
            #    poly = np.array([imgpts[idx] for idx in face], dtype=np.int32)
            #    # einfache Farbgebung, abhängig von face id
            #    color = tuple([int(120 + (fi*30)%120), int(50 + (fi*50)%200), int(200 - (fi*20)%120)])
            #    # fill polygon (dies legt die 3D-Projektion in den Vordergrund, über den Overlays)
            #    cv2.fillConvexPoly(frame, poly, color)
            #    cv2.polylines(frame, [poly], True, (10,10,10), 1)

            # Optional: draw cube center point
            center2d, _ = cv2.projectPoints(np.array([[0,0,0]], dtype=float), np.zeros(3), np.zeros(3),
                                            camera_matrix, dist_coeffs)
            center2d = tuple(center2d.ravel().astype(int))
            cv2.circle(frame, center2d, 5, (0,255,0), -1)
        else:

            #stop_music()
            cv2.putText(frame, "Keine Marker erkannt!", (10,30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)


        
        #cv2.setWindowProperty(window_name, cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

        cv2.imshow(window_name, frame)

        if cv2.waitKey(1) & 0xFF == ord('x'):
            print("[LOG] Fenster geschlossen: x durch Benutzereingabe")
            break

    camera.release()
    cv2.destroyAllWindows()

# Main-Methode aufrufen
if __name__ == "__main__":
    main()