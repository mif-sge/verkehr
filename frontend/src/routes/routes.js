import Home from '../views/Home';
import Map from '../views/Map';
import Plan from '../views/Plan';

const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/map",
        component: Map
    },
    {
        path: "/plan",
        component: Plan
    }
];

export default routes;