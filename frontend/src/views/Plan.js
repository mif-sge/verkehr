import React, { useEffect } from 'react';

import * as d3 from 'd3';
import * as tubeMap from "d3-tube-map";
import tubeData from '../tubedata/tubedata';

function Plan() {


    //gets called at page load once
    useEffect(() => {

        var container = d3.select('#tube-map');

        var width = 1600;
        var height = 800;

        var map = tubeMap.tubeMap()
            .width(width)
            .height(height)

        container.datum(tubeData).call(map);
    });

    return (
        <div id="tube-map" style={{ height: "900px" }}>
        </div>
    );
}

export default Plan;