import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as d3 from 'd3';
import * as tubeMap from "d3-tube-map";
import tubeData from '../tubedata/tubedata';
import style from '../assest/styles/PlanStyle';

function Plan(props) {

    const { classes } = props;

    //gets called at page load once
    useEffect(() => {

        var container = d3.select('#tube-map');

        var width = document.getElementById('tube-map').clientWidth;
        var height = document.getElementById('tube-map').clientHeight;
        console.log(width, "  ", height)

        var map = tubeMap.tubeMap()
            .width(width)
            .height(height)

        container.datum(tubeData).call(map);
    });

    return (
        <div id="tube-map" className={classes.map}>
        </div>
    );
}

Plan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Plan);