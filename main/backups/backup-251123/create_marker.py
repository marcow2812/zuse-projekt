#import cv2
#import cv2.aruco as aruco

# Dictionary holen (neue API)
#aruco_dict = aruco.getPredefinedDictionary(aruco.DICT_6X6_250)

#for id in range(20):
#    img = aruco.generateImageMarker(aruco_dict, id, 200)
#    cv2.imwrite(f"marker_{id}.png", img)

#print("Marker erstellt!")

import cv2
import cv2.aruco as aruco

# aktuelles Dictionary laden
aruco_dict = aruco.getPredefinedDictionary(aruco.DICT_ARUCO_ORIGINAL)

for id in range(20):
    img = aruco.generateImageMarker(aruco_dict, id, 200)
    cv2.imwrite(f"marker_{id}.png", img)