const GRIDDIVIDER = 100;

class TubeMapGenerator {
    constructor(buslines, busstops) {
        this.minLon = 180;
        this.maxLon = -180;
        this.minLat = 90;
        this.maxLat = -90;
        this.lonElementCount = 0;
        this.latElementCount = 0;
        this.gridElementSize = 0;
        this.busstops = busstops;
        this.buslines = buslines;
        this.main();
    }

    getBusstopFromID(id) {
        return this.busstops.filter(busstop => (busstop.id === id))[0];
    }

    generateBusstops() {
        var busstops = {}
        this.buslines.forEach(busline => {
            busline.busstops.forEach(busstopID => {
                let busstop = this.getBusstopFromID(busstopID);
                busstops[busstop.name] = {
                    "label": busstop.name
                };
            });
        });
        return busstops
    }

    calculateBounds(buslines) {
        buslines.forEach(line => {
            line.coordinates.forEach(coord => {
                if (this.minLon > coord.lon) this.minLon = coord.lon;
                if (this.maxLon < coord.lon) this.maxLon = coord.lon;
                if (this.minLat > coord.lat) this.minLat = coord.lat;
                if (this.maxLat < coord.lat) this.maxLat = coord.lat;
            });
        });
    }

    calculateGrid() {
        const lonDiff = this.maxLon - this.minLon
        const latDiff = this.maxLat - this.minLat
        if (lonDiff > latDiff) {
            this.gridElementSize = lonDiff / GRIDDIVIDER;
            this.lonElementCount = GRIDDIVIDER;
            this.latElementCount = parseInt(latDiff / this.gridElementSize) + 1;
        } else {
            this.gridElementSize = latDiff / GRIDDIVIDER;
            this.lonElementCount = parseInt(lonDiff / this.gridElementSize) + 1;
            this.latElementCount = GRIDDIVIDER;
        }
    }

    rasterizeBusstop(busstop) {
        var lonCord = 0;
        var shortestLonDistance = busstop.lon - this.minLon;
        for (var i = 0; i <= this.lonElementCount; i++) {
            let currentLonDistance = Math.abs(busstop.lon - (this.minLon + (this.gridElementSize * i)));
            if (currentLonDistance <= shortestLonDistance) {
                lonCord = i;
                currentLonDistance = shortestLonDistance;
            } else {
                break;
            }
        }
        var latCord = 0;
        var shortestLatDistance = busstop.lat - this.minLat;
        for (i = 0; i <= this.latElementCount; i++) {
            let currentLatDistance = Math.abs(busstop.lat - (this.minLat + (this.gridElementSize * i)));
            if (currentLatDistance <= shortestLatDistance) {
                latCord = i;
                currentLatDistance = shortestLatDistance;
            } else {
                break;
            }
        }
        return {
            "coords": [lonCord, latCord],
            "name": busstop.name,
            "labelPos": "N"
        };
    }

    rasterizeBusstops(busline) {
        var busstops = [];
        busline.busstops.forEach(busstop => {
            busstops.push(this.rasterizeBusstop(this.getBusstopFromID(busstop)));
        });
        return {
            "name": busline.name,
            "label": busline.name,
            "color": "#000000",
            "shiftCoords": [
                0,
                0
            ],
            "nodes": busstops
        };
    }

    rasterizeBuslines() {
        var buslines = [];
        this.buslines.forEach(busline => {
            buslines.push(this.rasterizeBusstops(busline));
        });
        return buslines;
    }

    main() {
        this.calculateBounds(this.buslines);
        this.calculateGrid();
    }
}

export function generateTubemap(buslines, busstops) {
    const tmg = new TubeMapGenerator(buslines, busstops);
    let tubeData = {
        "stations": tmg.generateBusstops(),
        "lines": tmg.rasterizeBuslines()
    }
    return tubeData;
}