import busstops from '../localData/busstops.json';
import hospitals from '../localData/hospitals.json';
import malls from '../localData/malls.json';
import shortBuslines from '../localData/shortBuslines.json';
import buslines from '../localData/buslines.json';
import busroute from '../localData/busroute.json';

//import { SHORTBUSSTOPS, BUSSTOPS, HOSPITALS, MALLS, SHORTBUSLINES, BUSLINES, ROUTE } from "./urls";

export async function fetchBusstops(requestMode) {
    /*const URL = requestMode === "short" ? SHORTBUSSTOPS : BUSSTOPS;
    const answer = await fetch(URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //return await answer.json();*/
    return busstops
}

export async function fetchHospitals() {
    /*const answer = await fetch(HOSPITALS, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //return await answer.json();*/
    return hospitals;
}

export async function fetchMalls() {
    /*const answer = await fetch(MALLS, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //return await answer.json();*/
    return malls;
}

export async function fetchBuslines(requestMode) {
    /*const URL = requestMode === "short" ? SHORTBUSLINES : BUSLINES;
    const answer = await fetch(URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //return await answer.json();*/
    if (requestMode === "short") return shortBuslines;
    else return buslines;
}

export async function fetchRoute(busstopFrom, busstopTo) {
    /*
    const URL = ROUTE(busstopFrom, busstopTo);
    const answer = await fetch(URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //return await answer.json();*/
    return busroute;
}