import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import style from '../assest/styles/HomeStyle';

import { Grid } from '@material-ui/core/';

import logo from '../assest/img/logo.png';

/**
 * generates color codes for text and background color dependent on day time
 * format is for example '#ffffff' for white
 * return tuple of text and background colors
 */
function gernerateColorCodes() {
    //some needed constant variables
    const minRGB = 32;
    const maxRGB = 255;
    const today = new Date();
    const currentHour = today.getHours();

    //defining the variables
    var t = 0;
    var textColor = "#000000";
    if (currentHour < 6 || currentHour > 18) {
        textColor = "#ffffff";
    }

    //background should be white around 12 o'clock and close to black at 0 o'clock
    if (currentHour < 12) {
        t = currentHour / 12;
    } else {
        t = (24 - currentHour) / 12;
    }

    //changing rgb value to hex code
    const hex = Number(parseInt(t * maxRGB + (1 - t) * minRGB)).toString(16);
    const backgroundColor = "#" + hex + hex + hex;

    return [textColor, backgroundColor]; //Flieg los, Kartoffelbrei
}

/**
 * creates the home screen
 */
function Home(props) {
    const { classes } = props;

    const [colorCodes, setColorCode] = useState(gernerateColorCodes());

    //gets called at page load once
    useEffect(() => {
        //sets the timer for the refresh of the colors
        setInterval(() => {
            setColorCode(gernerateColorCodes());
        }, 1000 * 60 * 60); //every hour
    });

    // structure of DOM-tree
    return (
        <Grid container className={classes.root} style={{ color: colorCodes[0], backgroundColor: colorCodes[1] }}>
            <img src={logo} className={classes.logo} alt="logo" />
            <p>Hello World!</p>
        </Grid>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Home);