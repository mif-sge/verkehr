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
        padding: '0 8px',
        justifyContent: 'flex-end',
    },
    sidebarBody: {
        width: 250,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};



export { style, appBarHeight };
