<div align=right>
    <!-- <img src="https://raw.githubusercontent.com/marcow2812/zuse-projekt/refs/heads/main/main/data/img/ecube/ECube_green_top_small.png" style="height:70px;margin-right:20px"> -->
    <img src="https://raw.githubusercontent.com/marcow2812/zuse-projekt/refs/heads/main/main/data/img/favicon.png" style="height:70px;margin-right:50px">
    <a href="https://www.konrad-zuse-schule.de">
        <img src="https://www.konrad-zuse-schule.de/_assets/e4457f0bd19a5627ff505285c525e2c0/Images/logo_text.png" style="height:70px">
    </a>
</div>
<!-- <img src="https://www.jugend-forscht.de/typo3temp/_processed_/0/2/csm_Jugend_forscht_Plakat_2026_6a8bd73170.png" style="height:80px"> -->
<!-- <span style="color:#CCCCCC">© Stiftung Jugend forscht e. V.</span> -->

# Projektplanung

> [!IMPORTANT]
> Der AR-Cube ist ein Non-Profit-Projekt der Konrad-Zuse-Schule Hünfeld. Alle Funktionen befinden sich derzeit noch in der Entwicklungsphase.<br>
<!-- Pilotprojekt laufen derzeit an der ... -->
<!-- Sind Sie Schüler*in, Lehrer*in oder Direktor*in einer Schule in Deutschland? Bei Interesse an einer Pilotphase wenden Sie sich gerne an ... -->

> [!TIP]
> Unter folgendem Link kannst du das Projekt live im Browser testen: <a href="https://marcow2812.github.io/zuse-projekt/main/">Projektarbeit</a>

**Bildung neu gedacht - AR-Würfel für Grundschulen und weiterführende Bildungseinrichtungen**
**Bildung neu gedacht - Augmented Reality in Klassenräumen**

Ziel ist die Entwicklung eines python-basierten Programms, welches durch Zugriff auf die eingebaute Kamera eines Endgerätes einen Würfel anhand von ArUco Markern erkennt und auf dem Bildschirm 3D-Objekte auf den Würfel projeziert. Durch Drehung des Würfels können die Objekte von verschiedenen Seiten betrachtet werden. Zusätzlich können zum angezeigten Objekt indivudelle Sounds abgespielt und hilfreiche Informationen zum Lernen angezeigt werden.



## Hintergrund

Wie kann der Unterricht in Schulen spannender, abwechslungsreicher und lehrreicher werden? Wie können Kinder und Jugendliche selbstständig Themen entdecken und Neues lernen? Mit dieser Frage habe ich mich während meiner Projektarbeit auseinandergesetzt.
Der Hintergrund ist, dass jeder Schüler und jede Schülerin auf eine andere Weise lernt.
Manche bevorzugen es, Texte zu einem Thema zu lesen. Andere schauen sich
Videos an und wieder andere können sich mit Objekten besser vertraut machen,
wenn sie etwas anfassen können und eigene Eindrücke und Erfahrungen sammeln können.

## Projektablauf

- [x] GLB-Datei lokal einbinden
- [ ] Anpassung Anzeigebild von Webcame (Hoch-/Querformat)
- [x] GLB-Code in explore.html einbauen
- [ ] Winkelerkennung (x, y, z)
- [ ] Drehung der GLB-Objekte anhand der Winkelerkennung
- [ ] Bottom-Menü anpassen
- [ ] Audio-Wiedergabe einbauen
- [ ] Platzierung der <script>-Elemente anpassen, sodass Skripte korrekt nach ihrer Implementierung aufgerufen werden (und nicht auf nicht existierende Objekte an einer unteren Stelle zugreifen wollen)
- [ ] Sidenav anpassen (Links, Feedback, Beta, Online-Status, Impressum, Datenschutz, ...)
- [ ] z-index anpassen

```mermaid
graph TD;
    Erkannt-->Ja;
    Erkannt-->Nein;
    Ja-->Weiter;
    Nein-->Weiter;
```

# Würfel

Folgendes Faltmuster stellt vereinfacht den Würfel dar.

        [1]
    [4] [2] [3]
        [5]
        [6]

Dabei sind die einzelnen Seiten wiederum folgendermaßen gedreht:
Seite 1: 0 Grad (unverändert)
Seite 2: 0 Grad (unverändert)
Seite 3: 90 Grad (90 Grad im Uhrzeigersinn)
Seite 4: 270 Grad (90 Grad gegen den Uhrzeigersinn)
Seite 5: 180 Grad (180 Grad Drehung)
Seite 6: 180 Grad (180 Grad Drehung)

Marker 1:
```
+=============+
|  # - - - -  |
|  # - - - -  |
|  # - - - -  |
|  # - - - -  |
|  # - # # #  |
+=============+
```

Marker 2:
```
+=============+
|  # - - - -  |
|  # - - - -  |
|  # - - - -  |
|  # - - - -  |
|  - # - - #  |
+=============+
```

Marker 3:
```
+=============+
|  # - - - -  |
|  # - - - -  |
|  # - - - -  |
|  # - - - -  |
|  - # # # -  |
+=============+
```

Marker 4:
```
+=============+
|  # - - - -  |
|  # - - - -  |
|  # - - - -  |
|  # - # # #  |
|  # - - - -  |
+=============+
```

Marker 5:
```
+=============+
|  # - - - -  |
|  # - - - -  |
|  # - - - -  |
|  # - # # #  |
|  # - # # #  |
+=============+
```

Marker 6:
```
+=============+
|  # - - - -  |
|  # - - - -  |
|  # - - - -  |
|  # - # # #  |
|  - # - - #  |
+=============+
```


# Einrichtung der Umgebung

Sollte `Python` auf dem Gerät nicht vorinstalliert sein, kann das Programm unter Linux mit dem folgenden Befehl installiert werden:
```
sudo apt-get update
sudo apt-get upgrade
sudo apt install python3
```
Für die vereinfachte Installation der Pakete installieren wir die Bibliothek `Pip`:
```
sudo apt-get install pip
```
> [!TIP]
> Im folgenden Schritt wird eine virtuelle Umgebung für Python verwendet. Dieser Schritt ist nicht zwingend notwendig, wird allerdings für eine korrekte Installation der Pakete empfohlen.

Anschließend installieren wir die virtuelle Umgebung `Venv` für Python und richten diese ein:
```
sudo apt install python3.12-venv
python3 -m venv venv
source venv/bin/activate
```

Im nächsten Schritt können wir die benötigten Bibliotheken `OpenCV-Contrib` und `Numpy` installieren:
```
pip install opencv-contrib-python numpy
```

Zum Abspielen von .mp3 Dateien verwenden wir `pygame`:
```
pip install pygame
```

Um `3D-Objekte` einzubinden, verwenden wir die folgenden Bibliotheken:
```
pip install trimesh pyglet
```

## Projektablauf

Projekt-Ablauf:
Liste mit Bild-Pfaden der Würfelseiten
Größe Würfel (in Meter)
(Zu erzeugendes 3D-Objekt)

Programm starten
|
Würfel erkannt?
|
Eckpunkte/Ränder/ID erkennnen und einzeichnen
|
Bilder auf Würfelseiten projezieren
|
Drehung und Winkel berechnen
|
3D-Objekt basierend auf Drehung einzeichnen

## Auswertung und Ergebnisse


> [!NOTE]
> ArUco Marker werden zuverlässiger erkannt, wenn sie von einem weißen Rand
umgeben sind (Kontrast muss vorliegen). Mit einem schwarzen Hintergrund kann
der Marker nicht erkannt oder gelesen werden. Die Messung und Erkennung ist bei optimal vorliegenden Bedingungen auf bis
zu 3 Meter zuverlässig (Würfelgröße 5cm).

> [!TIP]
> Die Zuverlässigkeit der Erkennung ist abhängig von der Auflösung der Kamera,
den vorliegenden Lichtverhältnissen, der Größe der Marker und teils von der
Leistungsstärke des Geräts.

> [!NOTE]
> Das Erzeugen von 3D-Objekten auf den Würfel ist möglich. Dabei verbraucht dieser Schritt eine hohe Leistung, was im getesteten Szenario die Erkennung nur alle 3 - 4 Sekunden ermöglicht (am Beispiel eines MacBooks 2020 mit Intel i5).


<!-- 
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

-->

## Verwendete Lizenzen

<p>Bootstrap Icons - https://icons.getbootstrap.com</p>
<p>Github Juan Mellado - https://github.com/jcmellado/js-aruco</p>
<p>Github Datalog - https://github.com/datalog/qrcode-svg/tree/master</p>
<p>Google Model Viewer - https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js</p>
<p>Sketchfab - https://sketchfab.com/search?features=downloadable&type=models</p>
<p>Smithsonian - https://www.si.edu/</p>

<br>
<p>Universität Tübingen - https://www.unimuseum.uni-tuebingen.de/de/sammlungen/3d-museum</p>
<p>ScanMotion 3D - https://scanmotion-3d.de/3d-scan-museum-artefakte/</p>
<p>Museenstiftung - https://3d-objekte.museumsstiftung.de/app/</p>

<h2>Weitere Links</h2>

<a href="https://docs.opencv.org/4.x/d0/d84/tutorial_js_usage.html">docs.opencv.org</a>
<a href="https://github.com/habbes/opencv-web-video">Github Web Video</a>
<a href="https://docs.opencv.org/4.x/js_video_display.html">OpenCV Video Chapture</a>
<a href="https://stackoverflow.com/questions/75615296/open-cv-js-to-access-webcam-and-show-output">Stackoverflow Webcame Integration</a>

<br>

<a href="https://pixabay.com/de/sound-effects/">Lizenzfreie Sounds</a>
<a href="https://pixabay.com/de/3d-models/">Lizenzfreie 3D-Objekte</a>



<div align=right>
    Marco W., 2025
</div>
