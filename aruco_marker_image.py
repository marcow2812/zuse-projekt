import cv2
import numpy as np

# --- Kamera öffnen ---
camera = cv2.VideoCapture(0)
if not camera.isOpened():
    print("[ERROR] Webcame konnte nicht geöffnet werden")
    exit()

# --- ArUco Dictionary und Parameter ---
aruco_dict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_6X6_250)
parameters = cv2.aruco.DetectorParameters()

# --- Kamera-Kalibrierung (Beispielwerte) ---
camera_matrix = np.array([[800, 0, 320],
                          [0, 800, 240],
                          [0, 0, 1]], dtype=float)
dist_coeffs = np.zeros((5, 1))

# --- Overlay-Bild laden (mit Alphakanal) ---
# overlay1 = cv2.imread("overlay.png", cv2.IMREAD_UNCHANGED)
#if overlay1 is None:
#    print("Fehler: Bild overlay.png nicht gefunden.")
#    exit()
# overlay2 = cv2.imread("perry.png", cv2.IMREAD_UNCHANGED)
#if overlay2 is None:
#    print("Fehler: Bild perry.png nicht gefunden.")
#    exit()

# Hauptschleife
while True:
    ret, frame = camera.read()
    if not ret:
        print("[ERROR] Kamerabild konnte nicht gelesen werden")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # --- Marker erkennen ---
    corners, ids, rejected = cv2.aruco.detectMarkers(gray, aruco_dict, parameters=parameters)

    if ids is not None:
        for i, corner in enumerate(corners):
            # --- Eckpunkte vorbereiten ---
            corner = corner.reshape((4, 2)).astype(np.float32)
            pts = corner.astype(int)
            (topLeft, topRight, bottomRight, bottomLeft) = pts

            # --- Gelber Rahmen ---
            cv2.polylines(frame, [pts], isClosed=True, color=(0, 255, 255), thickness=2)

            # --- Ecken markieren (rot) ---
            for (x, y) in pts:
                cv2.circle(frame, (x, y), 4, (0, 0, 255), -1)

            # --- Mittelpunkt markieren (blau) ---
            centerX = int((topLeft[0] + bottomRight[0]) / 2)
            centerY = int((topLeft[1] + bottomRight[1]) / 2)
            cv2.circle(frame, (centerX, centerY), 5, (255, 0, 0), -1)

            # --- Marker-ID anzeigen (grün) ---
            markerId = int(ids[i][0])



            cv2.putText(frame, f"ID: {markerId}", (topLeft[0], topLeft[1] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

            # --- Pose schätzen ---
            marker_length = 0.05
            rvec, tvec, _ = cv2.aruco.estimatePoseSingleMarkers([corner], marker_length,
                                                                camera_matrix, dist_coeffs)
            cv2.drawFrameAxes(frame, camera_matrix, dist_coeffs, rvec[0], tvec[0], 0.03)


            imgList = ["./img/berlin.png", "./img/berlin2.png", "./img/frankfurt.png", "./img/hamburg.png", "./img/muenchen.png", "./img/muenchen2.png"]

            overlay = cv2.imread(imgList[(markerId - 1)], cv2.IMREAD_UNCHANGED)

            #match markerId:
                # ID 1
            #    case 1:
            #        overlay = cv2.imread("./img/berlin.png", cv2.IMREAD_UNCHANGED)
                # ID 2
            #    case 2:
            #        overlay = cv2.imread("./img/berlin2.png", cv2.IMREAD_UNCHANGED)
                # ID 3
            #    case 3:
            #        overlay = cv2.imread("./img/frankfurt.png", cv2.IMREAD_UNCHANGED)
                # ID 4
            #    case 4:
            #        overlay = cv2.imread("./img/hamburg.png", cv2.IMREAD_UNCHANGED)
                # ID 5
            #    case 5:
            #        overlay = cv2.imread("./img/muenchen.png", cv2.IMREAD_UNCHANGED)
                # ID 6
            #    case 6:
            #        overlay = cv2.imread("./img/muenchen2.png", cv2.IMREAD_UNCHANGED)

            # print(imgList[(markerId - 1)])
                    
            #print(f"Marker-ID: {markerId}")

            # --- Overlay-Bild perspektivisch auf Marker projizieren ---
            h, w = overlay.shape[:2]
            src_pts = np.array([[0, 0],
                                [w - 1, 0],
                                [w - 1, h - 1],
                                [0, h - 1]], dtype=np.float32)
            dst_pts = corner
            M = cv2.getPerspectiveTransform(src_pts, dst_pts)
            warped = cv2.warpPerspective(overlay, M, (frame.shape[1], frame.shape[0]))

            # --- Alphamischung ---
            if warped.shape[2] == 4:  # PNG mit Alpha
                alpha = warped[:, :, 3] / 255.0
                for c in range(3):
                    frame[:, :, c] = warped[:, :, c] * alpha + frame[:, :, c] * (1 - alpha)
            else:
                frame = cv2.addWeighted(frame, 1.0, warped, 0.6, 0)

            

            

    # Small Screen
    # cv2.imshow("ArUco Marker Bild-Overlay", frame)

    # Fullscreen
    #window_name = "ArUco Marker Bild-Overlay"
    #cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    #cv2.setWindowProperty(window_name, cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

    window_name = "ArUco Marker Bild-Overlay"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(window_name, 1280, 720)

    # im Loop:
    cv2.imshow(window_name, frame)


    if cv2.waitKey(1) & 0xFF == ord('x'):
        break


camera.release()
cv2.destroyAllWindows()
