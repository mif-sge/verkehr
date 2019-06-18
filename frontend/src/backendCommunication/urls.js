//const API = `/api`; // production
const API = `http://localhost:80/api`; // development

export const DEMO = `${API}/demo`;

export const POI = `${API}/poi`;
export const BUSSTOPS = `${POI}?type=busstop`;
export const SHORTBUSSTOPS = `${BUSSTOPS}& requestMode=short`;
export const HOSPITALS = `${POI}?type=hospital`;
export const MALLS = `${POI}?type=mall`;

export const BUSLINES = `${API}/lines`;
export const SHORTBUSLINES = `${BUSLINES}?requestMode=short`;

export function ROUTE(busstopFrom, busstopTo) {
    return `${API}/route?busstopFrom=${busstopFrom}&busstopTo=${busstopTo}`;
}