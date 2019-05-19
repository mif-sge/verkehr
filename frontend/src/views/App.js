import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { style } from '../assest/styles/AppStyle';
import '../assest/css/App.css';

import { AppBar, Button, Checkbox, Divider, Drawer, FormControl, FormControlLabel, FormGroup, Grid, IconButton, List, MenuItem, Paper, Select, Toolbar, Typography } from '@material-ui/core';
import ListItemLink from '../components/ListItemLink';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { routes, routeNames } from '../routes/routes';

import { HomeOutlined, MapOutlined, ChevronLeft, DirectionsOutlined, Menu } from '@material-ui/icons';

import { calculateRoute, fetchBusstops } from '../backendCommunication/fetchRequests';


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
  const [busline, setBusline] = useState("");

  // show/hide hospital, mall and bus stop markers
  const [hospitalMarker, setHospitalMarker] = useState(true);
  const [mallMarker, setMallMarker] = useState(true);
  const [busStopMarker, setBusStopMarker] = useState(true);

  // bus stops for calculate the route from busstop to busstop
  /* const [selectedBusstops, setSelectedBusstops] = useState({
    busstopFrom: 0,
    busstopTo: 0
  }); */
  const [busstopFrom, setBusstopFrom] = useState(0);
  const [busstopTo, setBusstopTo] = useState(0);

  const busstops = fetchBusstops();

  //onclick
  function calculateRouteClicked() {
    calculateRoute();
  }

  function checkIfRouteCalculationButtonShouldBeDisabled() {
    if (busstopFrom !== 0 && busstopTo !== 0 && busstopFrom !== busstopTo) {
      return false;
    }
    //TODO add snackbar push
    return true;
  }

  const appHeader = <AppBar className={classes.header} position="static">
    <Toolbar>
      <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <Route>
        {({ location }) => (<Typography variant="h6" color="inherit">{setPathname(location.pathname)}{routeNames[pathname]}</Typography>)}
      </Route>
    </Toolbar>
  </AppBar>

  const mapSubmenu = <Grid container spacing={16} className={classes.mapSubMenu}>
    <Grid item xs={12}>
      <FormControl className={classes.busDropDown} >
        <Select value={busline} onChange={(e) => setBusline(e.target.value)} displayEmpty name="age">
          <MenuItem value="">
            <em>- Buslinie auswählen -</em>
          </MenuItem>
          <MenuItem value={1}>Linie 1</MenuItem>
          <MenuItem value={2}>Linie 2</MenuItem>
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

  const planSubMenu = <Paper className={classes.planSubMenu}>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Route</Typography>
      </Grid>
      <Grid item xs={12} container spacing={16}>
        <Grid item xs={12} container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="overline" gutterBottom>von</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.busDropDown} >
              <Select value={busstopFrom} onChange={(e) => setBusstopFrom(e.target.value)} displayEmpty name="busstopFrom">
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
              <Select value={busstopTo} onChange={(e) => setBusstopTo(e.target.value)} displayEmpty name="busstopTo">
                <MenuItem value={0}>
                  <em>- Haltestelle auswählen -</em>
                </MenuItem>
                {busstops.map((busstop) => (<MenuItem key={busstop.id} value={busstop.id}>{busstop.name}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button disabled={checkIfRouteCalculationButtonShouldBeDisabled() ? true : false} variant="contained" color="primary" onClick={calculateRouteClicked}>Route berechnen</Button>
        </Grid>
      </Grid>
    </Grid>
  </Paper>

  //main page where all components wre put together
  return (
    <Router>
      <div className={classes.root}>
        {appHeader}

        <Drawer className={classes.sidebar} open={open} onClose={() => setOpen(false)}>
          <div tabIndex={0} role="button" onKeyDown={() => setOpen(false)}>
            <div className={classes.sidebarHeader}>
              <IconButton onClick={() => setOpen(false)}>
                <ChevronLeft />
              </IconButton>
            </div>
            <List className={classes.sidebarBody}>
              <Divider />
              <ListItemLink to="/" primary={routeNames["/"]} icon={<HomeOutlined />} />
              <Divider />
              <ListItemLink to="/map" primary={routeNames["/map"]} icon={<MapOutlined />} />
              {pathname === "/map" ? <Divider /> : null}
              {pathname === "/map" ? mapSubmenu : null}
              <Divider />
              <ListItemLink to="/plan" primary={routeNames["/plan"]} icon={<DirectionsOutlined />} />
              {pathname === "/plan" ? <Divider /> : null}
              {pathname === "/plan" ? planSubMenu : null}
              <Divider />
            </List>
            {routes.map((route, index) => (<Route key={index} path={route.path} exact={route.exact} component={route.sidebar} />))}
          </div>
        </Drawer>

        <Grid container className={classes.body}>
          {routes.map((route, index) => (<Route key={index} path={route.path} exact={route.exact} component={route.component} />))}
        </Grid>
      </div>
    </Router>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(App);
