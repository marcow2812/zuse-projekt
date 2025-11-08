import pygame
import time

mp3_path = "./music/musik-hintergrund-142725.mp3"

pygame.mixer.init()
pygame.mixer.music.load(mp3_path)

# Datei starten, sofort pausieren, vorspulen
pygame.mixer.music.play(start=5.5)
print("Abspielen ab 5.5 sek.")

# Warten bis fertig (optional)
while pygame.mixer.music.get_busy():
    time.sleep(1)
