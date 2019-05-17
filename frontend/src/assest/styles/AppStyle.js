const appBarHeight = 64;

const style = {
    root: {
        flexGrow: 1,
    },
    header: {
        height: appBarHeight,
    },
    body: {
        minHeight: `calc(100vh - ${appBarHeight}px)`,
    },
    sidebar: {

    },
    sidebarHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    sidebarBody: {
        width: 270,
        padding: '0 0px',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    mapSubMenu: {
        padding: 10,
    },
    busDropDown: {
        width: '100%',
    },
    poiContainer: {
        padding: 10,
    },
    planSubMenu: {
        padding: 10,
        margin: 10,
    }
};



export { style, appBarHeight };
