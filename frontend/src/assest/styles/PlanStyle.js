import { appBarHeight } from './AppStyle';

const style = {
    root: {
        //position: 'absolute',
        height: `calc(100vh - ${appBarHeight}px)`,
        width: '100%',
    },
    map: {
        padding: "4px",
    },
};

export default style;