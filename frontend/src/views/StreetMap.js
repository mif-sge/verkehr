import React, { useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import style from '../assest/styles/StreetMapStyle';

import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { fetchBuslines, fetchBusstops, fetchMalls, fetchHospitals } from '../backendCommunication/fetchRequests';
import { busstopIcon, hospitalIcon, mallIcon } from '../assest/img/Icons'

//FH Bielefeld, Campus Minden
const position = [52.2965164, 8.9057191];


/**
 * creates the Open Street Map
 */
function StreetMap(props) {
    const { classes, selectedBusline, showBusstops, showMalls, showHospitals } = props;

    const [buslines, setBuslines] = useState([]);
    const [busstops, setBusstops] = useState([]);
    const [malls, setMalls] = useState([]);
    const [hospitals, setHospitals] = useState([]);

    const [isSubscribed, setIsSubscribed] = useState(true);

    const fetchData = useCallback(async () => {
        const tempBusstops = await fetchBusstops();
        const tempBuslines = await fetchBuslines();
        const tempMalls = await fetchMalls();
        const tempHospitals = await fetchHospitals();
        if (isSubscribed) {
            setBusstops(tempBusstops);
            setBuslines(tempBuslines);
            setMalls(tempMalls);
            setHospitals(tempHospitals);
        }
    }, [isSubscribed]);

    useEffect(() => {
        fetchData();
        return () => (setIsSubscribed(false));
    }, [fetchData]);

    return (
        <Map center={position} zoom={13} className={classes.map}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {busstops.length > 0 && showBusstops === true ? busstops.map(busstop => (<Marker icon={busstopIcon("lightblue")} position={[busstop.lat, busstop.lon]}>
                <Popup>{busstop.name}</Popup>
            </Marker>)) : null}
            {malls.length > 0 && showMalls === true ? malls.map(mall => (<Marker icon={mallIcon("yellow")} position={[mall.lat, mall.lon]}>
                <Popup>{mall.name}</Popup>
            </Marker>)) : null}
            {hospitals.length > 0 && showHospitals === true ? hospitals.map(hospital => (<Marker icon={hospitalIcon("red")} position={[hospital.lat, hospital.lon]}>
                <Popup>{hospital.name}</Popup>
            </Marker>)) : null}
            {buslines.length > 0 ? buslines.filter(function (busline) {
                if (selectedBusline > 0) return busline["id"] === selectedBusline;
                else return busline;
            }).map(busline => <Polyline positions={busline["coordinates"].map(waypoint => [waypoint.lat, waypoint.lon])}></Polyline>) : null}
        </Map>
    );
}

StreetMap.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(StreetMap);