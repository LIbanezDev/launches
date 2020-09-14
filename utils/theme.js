import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#cf1111',
        },
        warning: {
           main: '#e9db2b'
        },
        error: {
            main: '#d41c1c',
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;