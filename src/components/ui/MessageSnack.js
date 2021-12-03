import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { uiCloseShowMessage } from '../../actions/ui';

export const MessageSnack = () => {

    const dispatch = useDispatch();

    const { showMessage } = useSelector( state => state.ui );

    const { open, message, error } = showMessage;
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        dispatch( uiCloseShowMessage() );
    };

    return (
        <div>
            {!error && <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                 <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>}

        {error && <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                 <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>}
        </div>
    )

}
