import Home from '../views/Home';
import StreetMap from '../views/StreetMap';
import Plan from '../views/Plan';

//the routes to each subscreen
const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/map",
        component: StreetMap
    },
    {
        path: "/plan",
        component: Plan
    }
];

const routeNames = {
    "/": "Home",
    "/map": "Karte",
    "/plan": "Plan"
}

export { routes, routeNames };