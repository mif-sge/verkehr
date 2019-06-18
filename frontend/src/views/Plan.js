import React, { useEffect, useState, createRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as d3 from 'd3';
import * as tubeMap from "d3-tube-map";
import style from '../assest/styles/PlanStyle';
import { Grid } from '@material-ui/core';

import { fetchBuslines } from '../backendCommunication/fetchRequests';
import { generateTubemap } from '../tubedata/TubeDataGenerator';

function Plan(props) {

    const { classes } = props;
    const tubeMapRef = createRef();

    const [tubemapIsSet, setTubemapIsSet] = useState(false);
    const [buslines, setBuslines] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(true);

    const fetchData = useCallback(async () => {
        const tempBuslines = await fetchBuslines();
        if (isSubscribed) {
            setBuslines(tempBuslines);
        }
    }, [isSubscribed]);

    const setTubemap = useCallback(() => {
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
                    right: width / 5,
                    bottom: height / 10,
                    left: width / 5,
                });

            container.datum(generateTubemap(buslines)).call(map);
        }
    }, [tubeMapRef, tubemapIsSet, buslines]);

    useEffect(() => {
        fetchData();
        setTubemap();
        return () => (setIsSubscribed(false));
    }, [fetchData, setTubemap]);

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