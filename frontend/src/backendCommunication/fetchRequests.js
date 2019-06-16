import { DEMO } from "./urls";

export async function calculateRoute() {
    const answer = await fetch(DEMO, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    console.log(await answer);
}

export function fetchBusstops() {
    //TODO fetch bus stops
    return [
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
}