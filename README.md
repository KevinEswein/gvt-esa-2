# ESA 2: 2D Geometrie aus Linien

- **Thema:** WebGL Geometrie von Hand erstellen und darstellen
- **Bearbeitungszeit:** 45 - 60 Min.
- **Voraussetzungen:** LE 1 - 6 (inkl. GEO)
- **Vorbereitung:** Entwerfen Sie von Hand eine für Sie ansprechende 2D-Geometrie auf einem Raster

## Aufgabenstellung
1. Erstellen Sie eine eigene 2D-Geometrie aus Linien (etwa 30 Vertices)
2. und stellen Sie diese mittels WebGL dar
3. Dabei können Sie GL_LINES, GL_LINE_STRIP oder GL_LINE_LOOP verwenden

## Hinweise
- Sie können die Geometrie auch algorithmisch erzeugen
  - bedeutet Sie schreiben Code (for-Schleifen, etc.), die die Vertices generieren (mehr dazu recherchierbar unter Stichwort „Procedural Modelling“)
- Linienstärke
  - Die Linienstärke zu ändern funktioniert manchmal (je nach Version) in einigen Browsern nicht
  - In der Anlage unter Dateien finden Sie ein Testprogramm, mit dem man feststellen kann, ob der verwendete Browser ein Anpassen der Linienstärke zulässt
- Achten Sie darauf, den count-Parameter der Funktion drawArrays() korrekt zu setzen
  - nicht auf die Anz. Werte im "vertices" Array → auf die Anz. der 2D-Vertices

## Visualisierung
Lösung auf der Webseite übersichtlich darstellen

## Material
Sie können sich inspirieren lassen
https://de.freepik.com/vektoren-kostenlos/satz-lineare-tierillustrationen_3771101.htm

## Fehlerbehandlung, Test und QA
- In der Konsole prüfen, ob Fehlermeldungen auftreten

## Dokumentation
- Dokumentieren Sie Ihre Quellen für verwandtes Material
- Quellenangaben, Benutzungshinweise + Anmerkungen (falls notwendig) gehören auf diese Webseite

## Bewertung (8 Pkt.)
- Komplexität + visueller Anspruch des erstellten Materials (8 Pkt.)
