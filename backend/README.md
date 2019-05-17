# TrafficNode-Server

## Installation

1. Voraussetzungen:
    - [Node.js](https://nodejs.org/)
    - [npm](https://github.com/npm/cli) (Ausgeliefert mit Node.js)
2. Öffnen eines Terminals/der Kommandozeile und Wechseln in das Anwendungsverzeichnis (trafficnode-server).
3. Ausführen von ```npm install```.
4. (Optional) Anlegen der Environment-Datei ```.env``` im Anwendungsverzeichnis mit der folgenden Struktur:
    ```
    NODE_ENV=dev
    PORT=8080

    SERVER_HOST=0.0.0.0
    SERVER_PORT=8080
    SERVER_TIMEOUT_GLOBAL=30000

    LOGGING_LEVEL_FILE_HUMAN=info
    LOGGING_LEVEL_FILE_MACHINE=info
    LOGGING_LEVEL_CONSOLE=info

    NEO4J_URI=bolt://localhost:7687
    NEO4J_USERNAME=neo4j
    NEO4J_PASSWORD=neo4j
    ```

## Anwendung

1. Ausführen von ```npm start``` im Anwendungsverzeichnis (trafficnode-server). 
2. Nutzen der eingebauten Konsole.
3. Öffnen der Adresse _http://localhost:8080/api_ (ggf. Anpassen des Ports anhand der Environment-Datei).

## Konsole

Die eingebaute Konsole erlaubt das Einsehen von Informationen und in Zukunft ggf. die Verwaltung der Anwendung.

| Kommando           | Beschreibung           |
|--------------------|------------------------|
| ```.help```        | Listet alle Kommandos  |
| ```.list-routes``` | Listet alle API-Routen |
| ```.exit```        | Beendet die Anwendung  |

## Entwicklung

### Verzeichnisstruktur

| Verzeichnis       | Beschreibung           |
|-------------------|------------------------|
| ```/```           | Infrastruktur          |
| ```/app```        | Anwendung              |
| ```/app/lib```    | Geschäftslogik         |
| ```/app/models``` | Datenmodelle           |
| ```/app/routes``` | Plugins für API-Routen |
| ```/bin```        | Zusatzklassen          |
| ```/config```     | Konfiguration          |

### Plugins

API-Routen werden dynamisch anhand des Verzeichnisses ```/app/routes``` generiert.
Mehrere Routen werden in einem sogenannten _Plugin_ gebündelt.

| Verzeichnis/Datei                       | Beschreibung            |
|-----------------------------------------|-------------------------|
| ```/app/routes/main```                  | Hauptverzeichnis        |
| ```/app/routes/main/index.js```         | Definition des Plugins  |
| ```/app/routes/main/handlers```         | Behandlungen der Routen |
| ```/app/routes/main/handlers/root.js``` | Behandlung einer Route  |