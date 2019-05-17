import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as d3 from 'd3';
import * as tubeMap from "d3-tube-map";
import tubeData from '../tubedata/tubedata';
import style from '../assest/styles/PlanStyle';
import { Grid } from '@material-ui/core';

function Plan(props) {

    const { classes } = props;
    const [tubemapIsSet, setTubemapIsSet] = useState(false);

    function setTubemap() {
        if (!tubemapIsSet) {
            setTubemapIsSet(true);
            var container = d3.select('#tube-map');

            var width = document.getElementById('tube-map').clientWidth;
            var height = document.getElementById('tube-map').clientHeight;

            var map = tubeMap.tubeMap()
                .width(width)
                .height(height)
                .margin({
                    top: height / 50,
                    right: width / 7,
                    bottom: height / 10,
                    left: width / 7,
                });

            container.datum(tubeData).call(map);
        }

    }

    //gets called at page load once
    useEffect(() => {
        setTubemap();
    });

    return (
        <Grid container className={classes.root}>
            <Grid item xs id="tube-map" className={classes.map}></Grid>
        </Grid>
    );
}

Plan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Plan);