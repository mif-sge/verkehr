import { appBarHeight } from './AppStyle';

const style = {
    root: {
        //position: 'absolute',
        height: `calc(100vh - ${appBarHeight}px)`,
        width: '100%',
    },
    container: {
        padding: "4px",
    },
    map: {
        width: '100%', 
        height: '100%',
    },
};

export default style;