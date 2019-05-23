# Client Server Communication
> Dieses Dokument gibt einen Überblick über die vom Webclient an den Server ausgehenden HTTP(S)-Anfragen. Dazu gehören unter anderem Informationen über den Header, die zu liefernden Daten sowie deren Struktur.

## Typdefinition
- id ist vom Typ Integer <br>
- lat/lon sind vom Typ Float <br>
- Der Rest ist vom Typ String

## Requests

Im Idealfall gilt für alle Requests, dass ein timestamp gesendet wird. Sofern dieser noch aktuell ist, sprich keiner der angefragten Datensätze seit der letzten Anfrage aktualisiert wurde, werden auch keine Daten übertragen. Ein guter Statuscode ist dafür z.B. 204 - No Content (die Anfrage wurde erfolgreich durchgeführt, enthält jedoch bewusst keine Daten). So können Aktualisierungen durchgeführt werden, ohne unter Umständen unnötigen Datenverkehr zu verursachen.

### 1 - Bushaltestellen

#### Beschreibung
Benötigt werden die Bushaltestellen für das Menü, die Karte und den Fahrplan. Für das Menü sind lat/lon allerdings unerheblich.

#### Normale Anfrage mit allen Daten
URL = /api/busstops
````
fetch(URL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: {
        'requestMode': 'extended',
    },
});
````

#### Beispiel-Response: 
````
[
    {
        id: 1,
        name: "Haltestelle 1",
        lat: 1,
        lon: 1,
    },
    {
        id: 2,
        name: "Haltestelle 2",
        lat: 2,
        lon: 2,
    },
    {
        id: 3,
        name: "Haltestelle 3",
        lat: 3,
        lon: 3,
    },
    {
        id: 4,
        name: "Haltestelle 4",
        lat: 4,
        lon: 4,
    },
    {
        id: 5,
        name: "Haltestelle 5",
        lat: 5,
        lon: 5,
    },
]
````

#### Kleine Anfrage mit weniger Daten für das Menü
URL = /api/busstops
````
fetch(URL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: {
        'requestMode': 'short',
    },
});
````
#### Beispiel-Response: 
````
[
    {

        id: 1,
        name: "Haltestelle 1",
    },
    {
        id: 2,
        name: "Haltestelle 2",
    },
    {
        id: 3,
        name: "Haltestelle 3",
    },
    {
        id: 4,
        name: "Haltestelle 4",
    },
    {
        id: 5,
        name: "Haltestelle 5",
    },
]
````

### 2 - POI
POI sind neben den Bushaltestellen noch die Krankenhäuser und die Einkaufszentren. Die Anfragen sind äquivalent zu den Anfragen für die Bushaltestellen, bloß dass es hier keine 'short'-Variante gibt. Der Body fällt weg.

####  Beispiel-Anfrage
URL = /api/hospitals
````
fetch(URL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});
````

#### Beispiel-Response: 
````
[
    {
        id: 1,
        name: "Krankenhaus 1",
        lat: 1,
        lon: 1,
    },
    {
        id: 2,
        name: "Krankenhaus 2",
        lat: 2,
        lon: 2,
    },
]
````
####  Beispiel-Anfrage
URL = /api/malls
````
fetch(URL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});
````

#### Beispiel-Response: 
````
[
    {
        id: 1,
        name: "Einkaufszentrum 1",
        lat: 1,
        lon: 1,
    },
    {
        id: 2,
        name: "Einkaufszentrum 2",
        lat: 2,
        lon: 2,
    },
]
````

### 3 - Buslinien
Auch hier gibt es wieder zwei verschiedene Variaten. Einmal werden für die Karte die IDs der Haltestellen sowie die einzelnen Koordinaten der jeweiligen Buslinie benötigt. Für den Fahrplan hingegen sind nur die IDs relevant und die Koordinaten müssen nicht mit gesendet werden.

####  Beispiel-Anfrage für die Karte mit den Straßen-Koordianten
URL = /api/lines
````
fetch(URL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: {
        'requestMode': 'extended',
    }
});
````

#### Beispiel-Response: 
````
[
    {
        id: 1,
        name: 'Buslinie 1',
        busstops: [
            1, 2, 3, 4, 5
        ],
        coordinates: [
            {
                lat: 1,
                lon: 1,
            },
            {
                lat: 2,
                lon: 2,
            },
            {
                lat: 100000,
                lon: 100000,
            },
        ]
    },{
        id: 2,
        name: 'Buslinie 2',
        busstops: [
            6, 7, 8, 9, 10
        ],
        coordinates: [
            {
                lat: 100001,
                lon: 100001,
            },
            {
                lat: 100002,
                lon: 100002,
            },
            {
                lat: 200000,
                lon: 200000,
            },
        ]
    },
]
````
####  Beispiel-Anfrage für den Fahrplan ohne die Straßen-Koordianten
URL = /api/lines
````
fetch(URL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: {
        'requestMode': 'short',
    }
});
````

#### Beispiel-Response: 
````
[
    {
        id: 1,
        name: 'Buslinie 1',
        busstops: [
            1, 2, 3, 4, 5
        ],
    },{
        id: 2,
        name: 'Buslinie 2',
        busstops: [
            6, 7, 8, 9, 10
        ],
    },
]
````

### 4 - Route
Dem Server werden mit der Anfrage die beiden Haltestellen per ID mitgeliefert, damit die kürzeste Route berechnet werden kann. Zurück kommt dann eine Liste der einzelnen Linien mit den jeweiligen Haltestellen, an denen ein/um/ausgestiegen werden muss.
####  Beispiel-Anfrage
URL = /api/route
````
fetch(URL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: {
        busstopFrom: 1,
        busstomTo: 7,
    }
});
````

#### Beispiel-Response: 
````
[
    {
        id: 1, /* ID der Buslinie */
        busstopFrom: 1,
        busstopTo: 5,
    }, 
    {
        id: 2, /* ID der Buslinie */
        busstopFrom: 5,
        busstopTo: 7,
    }, 
]
````