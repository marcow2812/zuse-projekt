import cv2
import numpy as np

# --- Kamera öffnen ---
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Fehler: Konnte Webcam nicht öffnen.")
    exit()

# --- ArUco Dictionary und Parameter ---
# Wichtig: dasselbe Dictionary wie beim erzeugten Marker!
aruco_dict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_6X6_250)
parameters = cv2.aruco.DetectorParameters()

# --- Kamera-Kalibrierung (Beispielwerte – bitte bei Bedarf anpassen) ---
camera_matrix = np.array([[800, 0, 320],
                          [0, 800, 240],
                          [0, 0, 1]], dtype=float)
dist_coeffs = np.zeros((5, 1))  # keine Verzeichnung angenommen

# --- Hauptschleife ---
while True:
    ret, frame = cap.read()
    if not ret:
        print("Fehler beim Lesen des Kamerabilds.")
        break

    # In Graustufen umwandeln
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Marker erkennen
    corners, ids, rejected = cv2.aruco.detectMarkers(gray, aruco_dict, parameters=parameters)

    if ids is not None:
        for i, corner in enumerate(corners):
            # --- Eckpunkte vorbereiten ---
            corner = corner.reshape((4, 2)).astype(np.float32)
            pts = corner.astype(int)

            # --- Gelber Rahmen ---
            cv2.polylines(frame, [pts], isClosed=True, color=(0, 255, 255), thickness=2)

            # --- Ecken markieren (rot) ---
            for (x, y) in pts:
                cv2.circle(frame, (x, y), 4, (0, 0, 255), -1)

            # --- Mittelpunkt ---
            (topLeft, topRight, bottomRight, bottomLeft) = pts
            centerX = int((topLeft[0] + bottomRight[0]) / 2)
            centerY = int((topLeft[1] + bottomRight[1]) / 2)
            cv2.circle(frame, (centerX, centerY), 5, (255, 0, 0), -1)

            # --- Marker-ID anzeigen ---
            marker_id = int(ids[i][0])
            cv2.putText(frame, f"ID: {marker_id}", (topLeft[0], topLeft[1] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

            # --- Pose schätzen ---
            marker_length = 0.05  # Markergröße in Metern
            rvec, tvec, _ = cv2.aruco.estimatePoseSingleMarkers([corner], marker_length,
                                                                camera_matrix, dist_coeffs)

            # --- 3D-Achsen zeichnen ---
            cv2.drawFrameAxes(frame, camera_matrix, dist_coeffs, rvec[0], tvec[0], 0.03)

            # --- Optional: Position im Terminal ausgeben ---
            print(f"Marker {marker_id}: tvec = {tvec[0][0]}")

    # --- Bild anzeigen ---
    cv2.imshow("ArUco Marker Erkennung", frame)

    # 'q' zum Beenden
    if cv2.waitKey(1) & 0xFF == ord('x'):
        break

# --- Aufräumen ---
cap.release()
cv2.destroyAllWindows()
