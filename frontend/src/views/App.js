import React, { useState } from 'react';

import '../assest/css/App.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { HomeOutlined, MapOutlined, ChevronLeft, DirectionsOutlined } from '@material-ui/icons';


import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { routes, routeNames } from '../routes/routes';

import Grid from '@material-ui/core/Grid';

import { style } from '../assest/styles/AppStyle';

import ListItemLink from '../components/ListItemLink';
import { Paper } from '@material-ui/core';

function App(props) {
  const { classes } = props;

  const [open, setOpen] = useState(true);
  const [pathname, setPathname] = useState("/");
  const [busline, setBusline] = useState("");

  function toggleDrawer(open) {
    setOpen(open);
  }

  return (
    <Router>
      <div className={classes.root}>
        <AppBar className={classes.header} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Route>
              {({ location }) => (<Typography variant="h6" color="inherit">{setPathname(location.pathname)}{routeNames[pathname]}</Typography>)}
            </Route>
          </Toolbar>
        </AppBar>

        <Drawer className={classes.sidebar} open={open} onClose={() => toggleDrawer(false)}>
          <div tabIndex={0} role="button" onKeyDown={() => toggleDrawer(false)}>
            <div className={classes.sidebarHeader}>
              <IconButton onClick={() => toggleDrawer(false)}>
                <ChevronLeft />
              </IconButton>
            </div>
            <List className={classes.sidebarBody}>
              <Divider />
              <ListItemLink to="/" primary={routeNames["/"]} icon={<HomeOutlined />} />
              <Divider />
              <ListItemLink to="/map" primary={routeNames["/map"]} icon={<MapOutlined />} />
              {pathname === "/map" ? <Divider /> : null}
              {pathname === "/map" ? <Grid container spacing={16} className={classes.subMenu}>
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
                          <FormControlLabel control={<Checkbox checked={true} onChange={console.log("Value changed")} value="checkedA" />} label="Krankenhaus" />
                          <FormControlLabel control={<Checkbox checked={false} onChange={console.log("Value changed")} value="checkedA" />} label="Einkaufszentrum" />
                          <FormControlLabel control={<Checkbox checked={false} onChange={console.log("Value changed")} value="checkedA" />} label="Haltestelle" />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid> : null}
              <Divider />
              <ListItemLink to="/plan" primary={routeNames["/plan"]} icon={<DirectionsOutlined />} />
              {pathname === "/plan" ? <Divider /> : null}
              {pathname === "/plan" ? <Grid container>
                <Grid item xs={12}></Grid>
              </Grid> : null}
              <Divider />

            </List>

            {routes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact} component={route.sidebar} />
            ))}
          </div>
        </Drawer>

        <Grid container className={classes.body}>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} component={route.component} />
          ))}
        </Grid>
      </div>
    </Router>

  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(App);
