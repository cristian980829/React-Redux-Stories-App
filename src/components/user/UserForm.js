import React  from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';



import { theme } from '../../helpers/theme';

import { UserFormFields } from './UserFormFields';
import { UserFormInfo } from './UserFormInfo';
import { MessageSnack } from '../ui/MessageSnack';


export const UserForm = ( { formValues, setFormValues} ) => {


    const { modalViewModel } = useSelector( state => state.ui );   

    return (
        <>

        <MessageSnack/>

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
