import React from 'react';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const AlertSnackbar = ({open, msg, variant, setAlertData}) => {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertData(alertData => ({...alertData, open:false}));
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={variant}>
                {msg}
            </Alert>
        </Snackbar>
    );
};

export default AlertSnackbar;
