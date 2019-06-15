//const API = `/api`; // Production
const API = `http://localhost:80/api`; // Development
const BUSSTOPS = `/bus/stops?requestMode=`;
export const SHORTBUSSTOPS = `${API}${BUSSTOPS}short`;
export const EXTENDEDBUSSTOPS = `${API}${BUSSTOPS}extended`;
export const DEMO = `${API}/demo`;