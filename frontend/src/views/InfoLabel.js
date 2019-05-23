import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/';
import style from '../assest/styles/InfoLabelStyle';

import { Paper, Grid, Typography } from '@material-ui/core';

import { Warning } from '@material-ui/icons';

function InfoLabel(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item xs={2} >
                    <Warning className={classes.icon} />
                </Grid>
                <Grid item xs>
                    <Typography variant="subtitle2" className={classes.text}>Start- und Endhaltestelle sind identisch!</Typography>
                </Grid>
            </Grid>
        </Paper >
    );
}

InfoLabel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(InfoLabel);