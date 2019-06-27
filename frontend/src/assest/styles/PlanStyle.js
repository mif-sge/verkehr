import { appBarHeight } from './AppStyle';

const style = {
    root: {
        //position: 'absolute',
        height: `calc(100vh - ${appBarHeight}px)`,
        width: '100%',
    },
    container: {
        padding: "10px",
    },
    map: {
        width: '100%',
        height: '100%',
    },
    route: {
        height: "100%",
        width: "100%",
    },
    routeContent: {
        marginLeft: "10px",
    }
};

export default style;