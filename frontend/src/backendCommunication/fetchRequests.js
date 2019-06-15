import { DEMO, SHORTBUSSTOPS } from "./urls";

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

export async function fetchBusstops() {
    const answer = await fetch(SHORTBUSSTOPS, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    console.log("1", SHORTBUSSTOPS)
    const a = await answer.json();
    console.log("2", a);
    return a;
}