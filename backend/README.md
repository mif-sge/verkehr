# TrafficNode-Server

## Installation

1. Voraussetzungen:
    - [Node.js](https://nodejs.org/)
    - [npm](https://github.com/npm/cli) (Ausgeliefert mit Node.js)
2. Öffnen eines Terminals/der Kommandozeile und Wechseln in das Anwendungsverzeichnis (trafficnode-server).
3. Ausführen von ```npm install```.
4. (Optional) Anlegen der Environment-Datei ```.env``` im Anwendungsverzeichnis (siehe [Umgebungsvariablen](#Umgebungsvariablen)).
    
## Umgebungsvariablen

Zur Konfiguration der Anwendung können Umgebungsvariablen hinterlegt werden. Diese können sowohl direkt über die Laufzeit als auch über eine externe Environment-Datei eingebracht werden.

### Verfügbare Variablen

| Variable                   | Beschreibung                                                         | Typ                                                                      | Beispiel                                          |
|----------------------------|----------------------------------------------------------------------|--------------------------------------------------------------------------|---------------------------------------------------|
| **Node**                   |                                                                      |                                                                          |                                                   |
| NODE_ENV                   | Umgebungstyp                                                         | (dev &#124; prod)                                                        | NODE_ENV=dev                                      |
| **Server**                 |                                                                      |                                                                          |                                                   |
| SERVER_HOST                | Adresse des Servers                                                  | string                                                                   | SERVER_HOST=0.0.0.0                               |
| SERVER_PORT                | Port des Servers                                                     | int                                                                      | SERVER_PORT=8080                                  |
| SERVER_TIMEOUT_GLOBAL      | Zeit, nach der eine Anfrage an den Server abgebrochen wird           | long                                                                     | SERVER_TIMEOUT_GLOBAL=30000                       |
| **Logging**                |                                                                      |                                                                          |                                                   |
| LOGGING_LEVEL_FILE_HUMAN   | Minimales Log-Level zum Schreiben in die menschen-lesbare Log-Datei  | (error &#124; warn &#124; info &#124; verbose &#124; debug &#124; silly) | LOGGING_LEVEL_FILE_HUMAN=info                     |
| LOGGING_LEVEL_FILE_MACHINE | Minimales Log-Level zum Schreiben in die maschinen-lesbare Log-Datei | (error &#124; warn &#124; info &#124; verbose &#124; debug &#124; silly) | LOGGING_LEVEL_FILE_MACHINE=info                   |
| LOGGING_LEVEL_CONSOLE      | Minimales Log-Level zum Schreiben in die Konsole                     | (error &#124; warn &#124; info &#124; verbose &#124; debug &#124; silly) | LOGGING_LEVEL_CONSOLE=info                        |
| **Database**               |                                                                      |                                                                          |                                                   |
| NEO4J_URI                  | URI der Neo4j-Instanz                                                | string                                                                   | NEO4J_URI=bolt://localhost:7687                   |
| NEO4J_USERNAME             | Benutzername der Neo4j-Instanz                                       | string                                                                   | NEO4J_USERNAME=neo4j                              |
| NEO4J_PASSWORD             | Passwort der Neo4j-Instanz                                           | string                                                                   | NEO4J_PASSWORD=neo4j                              |
| **Eventsystem**            |                                                                      |                                                                          |                                                   |
| EVENTSYSTEM_BROKER_HOST    | URL des Brokers des zentralen Organismus                             | string                                                                   | EVENTSYSTEM_BROKER_HOST=mqtt://test.mosquitto.org |

### Beispiel

Der folgende Ausschnitt zeigt eine vollständige und valide Environment-Datei. Diese kann als ```.env``` in das Anwendungsverzeichnis gelegt werden.

```
# Node
NODE_ENV=dev

# Server
SERVER_HOST=0.0.0.0
SERVER_PORT=8080
SERVER_TIMEOUT_GLOBAL=30000

# Logging
LOGGING_LEVEL_FILE_HUMAN=info
LOGGING_LEVEL_FILE_MACHINE=info
LOGGING_LEVEL_CONSOLE=info

# Database
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=neo4j

# Eventsystem
EVENTSYSTEM_BROKER_HOST=mqtt://test.mosquitto.org
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

| Verzeichnis       | Beschreibung               |
|-------------------|----------------------------|
| ```/```           | Infrastruktur              |
| ```/app```        | Anwendung                  |
| ```/app/lib```    | Geschäftslogik             |
| ```/app/models``` | Datenmodelle               |
| ```/app/routes``` | Plugins für API-Routen     |
| ```/app/events``` | Ereignisse für Eventsystem |
| ```/bin```        | Zusatzklassen              |
| ```/config```     | Konfiguration              |

### Plugins

API-Routen werden dynamisch anhand des Verzeichnisses ```/app/routes``` generiert.
Mehrere Routen werden in einem sogenannten _Plugin_ gebündelt.

| Verzeichnis/Datei                       | Beschreibung            |
|-----------------------------------------|-------------------------|
| ```/app/routes/main```                  | Hauptverzeichnis        |
| ```/app/routes/main/index.js```         | Definition des Plugins  |
| ```/app/routes/main/handlers```         | Behandlungen der Routen |
| ```/app/routes/main/handlers/root.js``` | Behandlung einer Route  |

### Events

Ereignisse können ebenso wie API-Routen dynamisch angefügt werden.
Sie werden anhand des Verzeichnisses ```/app/events``` generiert.