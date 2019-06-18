import tubeData from '../tubedata/tubedata';

export function generateTubemap(buslines) {
    calculateBounds(buslines);
    return tubeData;
}

function calculateBounds(buslines) {
    var minLon = 180, maxLon = -180, minLat = 90, maxLat = -90;
    buslines.forEach(line => {
        line.coordinates.forEach(coord => {
            if (minLon > coord.lon) minLon = coord.lon;
            if (maxLon < coord.lon) maxLon = coord.lon;
            if (minLat > coord.lat) minLat = coord.lat;
            if (maxLat < coord.lat) maxLat = coord.lat;
        });
    });
}