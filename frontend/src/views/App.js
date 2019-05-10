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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { HomeOutlined, MapOutlined, ChevronLeft, DirectionsOutlined } from '@material-ui/icons';

const styles = {
  icon: {
    fontSize: 32,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    justifyContent: 'flex-end',
  },
};

function App(props) {
  const { classes } = props;

  const [open, setOpen] = useState(true);

  function toggleDrawer(open) {
    setOpen(open);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => toggleDrawer(false)}>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Schließen
              </Typography>&nbsp;&nbsp;
              <ChevronLeft />
            </IconButton>
          </div>
          <Divider />

          <List className={classes.list}>
            <ListItem button>
              <ListItemIcon><HomeOutlined /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><MapOutlined /></ListItemIcon>
              <ListItemText primary="Map" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><DirectionsOutlined /></ListItemIcon>
              <ListItemText primary="Plan" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
