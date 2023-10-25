import React, { useImperativeHandle, useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={3} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = React.forwardRef((props, ref) => {
    const [snackbarOption, setSnackbarOption] = useState({
        show: false,
        type: 'success',
        duration: 4000,
        message: ''
    });

    const showSnackbar = (obj) => {
        setSnackbarOption({ ...obj });
    }

    useImperativeHandle(ref, () => ({
        showSnackbar
    }));

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOption((option) => {
            return { ...option, show: false }
        });
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={snackbarOption.show}
            autoHideDuration={4000}
            color={'#1A73E8'}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} style={{ color: '#fff' }} severity={snackbarOption.type} sx={{ width: '100%' }}>
                {snackbarOption.message}
            </Alert>
        </Snackbar>
    )
})

export default CustomSnackbar;