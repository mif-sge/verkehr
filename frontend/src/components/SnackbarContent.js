import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { style, variantIcon } from '../assest/styles/SnackBarContentStyle';

import { SnackbarContent, IconButton } from '@material-ui/core/';
import { Refresh, Close } from '@material-ui/icons';

function Content(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose}>
          {classes[variant].includes("refresh") ?
            <Refresh className={classes.icon} /> :
            <Close className={classes.icon} />}
        </IconButton>,
      ]}
      {...other}
    />
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'refresh']).isRequired,
};

export default withStyles(style)(Content);
