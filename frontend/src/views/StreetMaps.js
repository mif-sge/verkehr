import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

//FH Bielefeld, Campus Minden
const position = [52.2965164, 8.9057191];

/**
 * creates the Open Street Map
 */
function StreetMap() {
    return (
        <Map center={position} zoom={13} style={{ position: "absolute", height: "100%", width: "80%", right: 0, top: 0 }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={position}>
                <Popup>FH Bielefeld,<br />Campus Minden</Popup>
            </Marker>
        </Map>
    );
}

export default StreetMap;