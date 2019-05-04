import Home from '../views/Home';
import StreetMap from '../views/StreetMaps';
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

export default routes;