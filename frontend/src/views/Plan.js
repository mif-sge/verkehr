import React, { useEffect, useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as d3 from 'd3';
import * as tubeMap from "d3-tube-map";
import tubeData from '../tubedata/tubedata';
import style from '../assest/styles/PlanStyle';
import { Grid, Paper, Typography, Divider } from '@material-ui/core';

function Plan(props) {

    const { classes, calculatedRoute } = props;
    const [tubemapIsSet, setTubemapIsSet] = useState(false);
    const tubeMapRef = createRef();

    function setTubemap() {
        if (!tubemapIsSet) {
            setTubemapIsSet(true);
            var container = d3.select('#tubeMap');

            let width = tubeMapRef.current.clientWidth;
            let height = tubeMapRef.current.clientHeight;
            let topOffset = height / 50;
            let rightOffset = width / 5;
            let bottomOffsett = height / 10;
            let leftOffset = width / 5;

            var map = tubeMap.tubeMap()
                .width(width)
                .height(height)
                .margin({
                    top: topOffset,
                    right: rightOffset,
                    bottom: bottomOffsett,
                    left: leftOffset,
                });

            container.datum(tubeData).call(map);
        }

    }

    console.log(calculatedRoute);

    //gets called at page load once
    useEffect(() => {
        setTubemap();
    });

    return (
        <Grid container className={classes.root}>
            <Grid item xs className={classes.container}>
                <div className={classes.map} id="tubeMap" ref={tubeMapRef} />
            </Grid>
            {calculatedRoute.length > 0 ? <Grid item xs={3} className={classes.container}>
                <Paper className={classes.route}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.routeContent}>Route wurde berechnet</Typography>
                        </Grid>
                        <Grid item xs={12} container spacing={2}>
                            {calculatedRoute.map(partOfTheRoute => (
                                <Grid item xs={12}>
                                    <Paper className={classes.routeContent}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12}>
                                                <Typography className={classes.routeContent}>{partOfTheRoute.name}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="overline" className={classes.routeContent}>Start-Haltestelle: {partOfTheRoute.from}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="overline" className={classes.routeContent}>End-Haltestelle: {partOfTheRoute.to}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid> : null}
        </Grid>
    );
}

Plan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Plan);