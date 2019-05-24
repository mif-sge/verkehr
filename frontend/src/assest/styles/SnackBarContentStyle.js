import { CheckCircle, Error, Info, Warning } from '@material-ui/icons';
import { green, amber } from '@material-ui/core/colors';

export const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: Error,
    info: Info,
    refresh: Error,
};

export const style = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    refresh: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});