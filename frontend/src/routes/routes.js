import Home from '../views/Home';
import StreetMap from '../views/StreetMap';
import Plan from '../views/Plan';

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