import React, { useEffect, useState, createRef } from 'react';
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
    const tubeMapRef = createRef();

    function setTubemap() {
        if (!tubemapIsSet) {
            setTubemapIsSet(true);
            var container = d3.select('#tubeMap');

            var width = tubeMapRef.current.clientWidth;
            var height = tubeMapRef.current.clientHeight;

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
            <Grid item xs className={classes.container}>
                <div className={classes.map} id="tubeMap" ref={tubeMapRef} />
            </Grid>
        </Grid>
    );
}

Plan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Plan);