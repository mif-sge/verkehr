import React, { useState, useEffect, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { style } from '../assest/styles/AppStyle';
import '../assest/css/App.css';

import { AppBar, Button, Checkbox, Divider, Drawer, FormControl, FormControlLabel, FormGroup, Grid, IconButton, List, MenuItem, Paper, Select, Toolbar, Typography, Snackbar } from '@material-ui/core';
import ListItemLink from '../components/ListItemLink';
import InfoLabel from '../components/InfoLabel';
import SnackbarContent from '../components/SnackbarContent';

import { Route, Switch } from "react-router-dom";

import { HomeOutlined, MapOutlined, ChevronLeft, DirectionsOutlined, Menu } from '@material-ui/icons';

import { fetchRoute, fetchBusstops, fetchBuslines } from '../backendCommunication/fetchRequests';

import StreetMap from './StreetMap';
import Home from './Home';
import Plan from './Plan';


const routeNames = {
  "/": "Home",
  "/map": "Karte",
  "/plan": "Plan"
}

const SHORTFETCH = "short";

/**
 * creates the main screen
 */
function App(props) {
  const { classes } = props;

  // show/hide drawer (sidebar)
  const [open, setOpen] = useState(false);

  // path of current page
  const [pathname, setPathname] = useState("/");

  // busline to show at the map
  const [busline, setBusline] = useState(0);
  const [buslines, setBuslines] = useState([]);

  // show/hide hospital, mall and bus stop markers
  const [hospitalMarker, setHospitalMarker] = useState(true);
  const [mallMarker, setMallMarker] = useState(true);
  const [busStopMarker, setBusStopMarker] = useState(true);

  // bus stops for calculate the route from busstop to busstop
  const [busstopFrom, setBusstopFrom] = useState(0);
  const [busstopTo, setBusstopTo] = useState(0);

  const [busstops, setBusstops] = useState([]);

  const [isSubscribed, setIsSubscribed] = useState(true);

  const fetchData = useCallback(async () => {
    const tempBusstops = await fetchBusstops();
    const tempBuslines = await fetchBuslines(SHORTFETCH);
    if (isSubscribed) {
      setBusstops(tempBusstops);
      setBuslines(tempBuslines);
    }
  }, [isSubscribed]);

  useEffect(() => {
    fetchData();
    return () => (setIsSubscribed(false));
  }, [fetchData]);

  function checkIfArrayHasContent(array) {
    if (Array.isArray(array) && array.length) {
      return true;
    }
    return false;
  }

  //onclick
  function calculateRouteClicked() {
    fetchRoute(busstopFrom, busstopTo);
  }

  function checkIfRouteCalculationButtonShouldBeDisabled() {
    if (busstopFrom !== 0 && busstopTo !== 0 && busstopFrom !== busstopTo) {
      return false;
    }
    return true;
  }

  function checkIfInfoTextShouldBeShown() {
    if (busstopFrom !== 0 && busstopTo !== 0 && busstopFrom === busstopTo) {
      return true;
    }
    return false;
  }

  const appHeader = <AppBar className={classes.header} position="static">
    <Toolbar>
      <IconButton id="openMenuButton" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <Route>
        {({ location }) => (<Typography id="pageHeaderTypography" variant="h6" color="inherit">{setPathname(location.pathname)}{routeNames[pathname]}</Typography>)}
      </Route>
    </Toolbar>
  </AppBar>

  const mapSubMenu = <Grid id="mapSubMenu" container spacing={2} className={classes.mapSubMenu}>
    <Grid item xs={12}>
      <FormControl className={classes.busDropDown} >
        <Select value={busline} onChange={(e) => setBusline(e.target.value)} displayEmpty name="busline">
          <MenuItem value={0}>
            <em>- Buslinie auswählen -</em>
          </MenuItem>
          {buslines.map(busline => (<MenuItem value={busline.id} key={busline.id}>{busline.name}</MenuItem>))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <Paper className={classes.poiContainer}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Markierungen</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormGroup> {/* <Formgroup row> for multi coloumn checkbox layout */}
              <FormControlLabel control={<Checkbox color="primary" checked={hospitalMarker} onChange={(e) => setHospitalMarker(e.target.checked)} />} label="Krankenhaus" />
              <FormControlLabel control={<Checkbox color="primary" checked={mallMarker} onChange={(e) => setMallMarker(e.target.checked)} />} label="Einkaufszentrum" />
              <FormControlLabel control={<Checkbox color="primary" checked={busStopMarker} onChange={(e) => setBusStopMarker(e.target.checked)} />} label="Haltestelle" />
            </FormGroup>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>

  const planSubMenu = <Paper id="planSubMenu" className={classes.planSubMenu}>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom style={{ paddingLeft: 8 }}>Route</Typography>
      </Grid>
      <Grid item xs={12} container spacing={2} style={{ margin: 0 }}>
        <Grid item xs={12} container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="overline" gutterBottom>von</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.busDropDown} >
              <Select disabled={checkIfArrayHasContent(busstops) ? false : true} value={busstopFrom} onChange={(e) => setBusstopFrom(e.target.value)} displayEmpty name="busstopFrom">
                <MenuItem value={0}>
                  <em>- Haltestelle auswählen -</em>
                </MenuItem>
                {busstops.map((busstop) => (<MenuItem key={busstop.id} value={busstop.id}>{busstop.name}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="overline" gutterBottom>nach</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.busDropDown} >
              <Select disabled={checkIfArrayHasContent(busstops) ? false : true} value={busstopTo} onChange={(e) => setBusstopTo(e.target.value)} displayEmpty name="busstopTo">
                <MenuItem value={0}>
                  <em>- Haltestelle auswählen -</em>
                </MenuItem>
                {busstops.map((busstop) => (<MenuItem key={busstop.id} value={busstop.id}>{busstop.name}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button id="routeCalculationButton" disabled={checkIfRouteCalculationButtonShouldBeDisabled() ? true : false} variant="contained" color="primary" onClick={calculateRouteClicked}>Route berechnen</Button>
        </Grid>
        {checkIfInfoTextShouldBeShown() ? <Grid item xs={12}>
          <InfoLabel />
        </Grid> : null}
      </Grid>
    </Grid>
  </Paper>

  //main page where all components wre put together
  return (
    <Fragment>
      <div className={classes.root}>
        {appHeader}

        <Drawer className={classes.sidebar} open={open} onClose={() => setOpen(false)}>
          <div tabIndex={0} role="button" onKeyDown={() => setOpen(false)}>
            <div className={classes.sidebarHeader}>
              <IconButton id="closeMenuButton" onClick={() => setOpen(false)}>
                <ChevronLeft />
              </IconButton>
            </div>
            <List className={classes.sidebarBody}>
              <Divider />
              <ListItemLink id="homeLink" to="/" primary={routeNames["/"]} icon={<HomeOutlined />} />
              <Divider />
              <ListItemLink id="mapLink" to="/map" primary={routeNames["/map"]} icon={<MapOutlined />} />
              {pathname === "/map" ? <Divider /> : null}
              {pathname === "/map" ? mapSubMenu : null}
              <Divider />
              <ListItemLink id="planLink" to="/plan" primary={routeNames["/plan"]} icon={<DirectionsOutlined />} />
              {pathname === "/plan" ? <Divider /> : null}
              {pathname === "/plan" ? planSubMenu : null}
              <Divider />
            </List>
          </div>
        </Drawer>

        <Grid container className={classes.body}>
          <Switch>
            <Route key={0} path={"/"} exact={true} render={(props) => <Home {...props} />} />
            <Route key={1} path={"/map"} exact={false} render={(props) => <StreetMap {...props} selectedBusline={busline} showHospitals={hospitalMarker} showMalls={mallMarker} showBusstops={busStopMarker} />} />
            <Route key={2} path={"/plan"} exact={false} render={(props) => <Plan {...props} />} />
          </Switch>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={checkIfArrayHasContent(busstops) ? false : true}
        autoHideDuration={0}
        onClose={fetchData}
      >
        <SnackbarContent
          onClose={fetchData}
          variant="refresh"
          message={<div>Daten konnte nicht geladen werden!<br /> Bitte versuchen Sie es erneut. </div>}
        />
      </Snackbar>
    </Fragment>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(App);
