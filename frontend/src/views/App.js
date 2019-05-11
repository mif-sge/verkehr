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

import { BrowserRouter as Router, Route } from "react-router-dom";
import { routes, routeNames } from '../routes/routes';

import Grid from '@material-ui/core/Grid';

import { style } from '../assest/styles/AppStyle';

import ListItemLink from '../components/ListItemLink';

function App(props) {
  const { classes } = props;

  const [open, setOpen] = useState(true);
  const [pathname, setPathname] = useState("/");

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
          <div
            tabIndex={0}
            role="button"

            onKeyDown={() => toggleDrawer(false)}
          >
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
              {pathname === "/map" ? <Grid container>
                <Grid item xs={12}></Grid>
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
