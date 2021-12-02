import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


import { theme } from '../../helpers/theme';

import { UserFormFields } from './UserFormFields';
import { UserFormInfo } from './UserFormInfo';
import { uiCloseShowMessage } from '../../actions/ui';


export const UserForm = ( { formValues, setFormValues} ) => {

    const dispatch = useDispatch();

    const { modalViewModel, showMessage } = useSelector( state => state.ui );   

    const { open, message, error } = showMessage;
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        dispatch( uiCloseShowMessage() );
    };

    return (
        <>

        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                 <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>

        
        
        <ThemeProvider theme={theme}>
            <Container
                component="main" 
                maxWidth="sm"    
            >
                <CssBaseline />
                <Box
                    sx={{
                    marginBottom: 5,
                    marginTop: 13,
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    {
                        !modalViewModel 
                            ?
                                <UserFormFields
                                    formValues={formValues}
                                    setFormValues={setFormValues} 
                                />
                            : 
                                <UserFormInfo />
                    }
                </Box>
            </Container>
        </ThemeProvider>
        </>
    )
}
