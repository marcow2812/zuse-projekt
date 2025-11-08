# show_glb_model.py
# ------------------------------
# Lädt ein 3D-Objekt (.glb, .gltf, .obj etc.)
# und zeigt es interaktiv in einem Fenster an.
#
# Steuerung:
#   - Linke Maustaste: drehen
#   - Mausrad: zoomen
#   - Rechte Maustaste: verschieben
# ------------------------------

import trimesh

def main():
    # Pfad zu deinem 3D-Modell (.glb)
    model_path = "./3d/medieval-architecture-2725.glb"

    print(f"[INFO] Lade 3D-Modell: {model_path}")
    try:
        # Laden des Modells
        mesh = trimesh.load(model_path, force='mesh')
    except Exception as e:
        print(f"[ERROR] Modell konnte nicht geladen werden: {e}")
        return

    # Modell-Infos ausgeben
    print(f"[INFO] Vertices: {len(mesh.vertices)}, Faces: {len(mesh.faces)}")
    print(f"[INFO] Bounding box: {mesh.bounds}")

    # Szene erzeugen und anzeigen
    scene = mesh.scene()
    print("[INFO] Öffne interaktives 3D-Fenster...")
    scene.show()  # öffnet ein interaktives pyglet-Fenster

if __name__ == "__main__":
    main()
