import React  from 'react';
import { useSelector } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export const UserForm = ( { formValues, setFormValues, error } ) => {

    const { email, name, urlimage } = formValues;
    

    const { modalViewModel } = useSelector( state => state.ui );

    
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
                    marginTop: 11,
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    {!modalViewModel ?
                        <>
                            <Box component="form">
                                {
                                    error &&
                                    (
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="error">{error}</Alert>
                                        </Stack>
                                    )
                                } 

                                <h3>Update Your User Info</h3>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="email"
                                    label="Email Address"
                                    name="email1"
                                    autoComplete="off"
                                    value={ email || '' }
                                    onChange={ handleInputChange }  
                                    autoFocus
                                    id="email1"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="name1"
                                    label="Name"
                                    type="text"
                                    autoComplete="off"
                                    value={ name || '' }
                                    onChange={ handleInputChange }
                                    id="name1"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Save
                                </Button>

                                <hr />
                            </Box> 

                            <Box component="form">
                                {
                                    error &&
                                    (
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="error">{error}</Alert>
                                        </Stack>
                                    )
                                } 

                                <h3>Update Your Password</h3>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Previous Password"
                                    type="password"
                                    autoComplete="off"
                                    value={ '' }
                                    onChange={ handleInputChange }
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password2"
                                    label="New Password"
                                    type="password"
                                    autoComplete="off"
                                    value={ '' }
                                    onChange={ handleInputChange }
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Save
                                </Button>

                            </Box> 
                    
                        </>

                
                    : <Box 
                        display="flex" 
                        justifyContent="center"
                    >
                        <Card sx={{ maxWidth: 1000 }}>
                            <CardActions>
                                <Box
                                    sx={{ ml: 2 }}
                                    display="flex" 
                                    width={890}
                                    alignItems="left"
                                    justifyContent="left"
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        Name: { name }
                                    </Typography>
                                </Box>

                            </CardActions>
                            <CardActions>
                                <Box
                                    sx={{ ml: 2 }}
                                    display="flex" 
                                    width={890}
                                    alignItems="left"
                                    justifyContent="left"
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        Email: { email }
                                    </Typography>
                                </Box>
                            </CardActions>

                            <CardActions>
                                <Box
                                    sx={{ ml: 2 }}
                                    display="flex" 
                                    width={890}
                                    alignItems="left"
                                    justifyContent="left"
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        
                                        <img
                                            src={`${urlimage}`}
                                            alt={name}
                                            className="img"
                                        />
                                    </Typography>
                                </Box>
                            </CardActions>

                        </Card>
                    </Box> 
                    }
                </Box>
            </Container>
        </ThemeProvider>
    )
}
