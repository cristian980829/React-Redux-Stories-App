import React  from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export const StorieForm = ( { formValues, setFormValues, error } ) => {

    const { description, title } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" >
                <CssBaseline />
                <Box
                    sx={{
                    marginTop: 8,
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Box component="form">
                        {
                            error &&
                            (
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">{error}</Alert>
                                </Stack>
                            )
                        } 

                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            name="title"
                            label="Title"
                            type="text"
                            autoComplete="off"
                                value={ title }
                                onChange={ handleInputChange }
                        />

                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            name="description"
                            label="Description"
                            type="text"
                            multiline
                            rows={15}
                            autoComplete="off"
                                value={ description }
                                onChange={ handleInputChange }
                        />

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
