import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { ThemeProvider } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import { theme } from '../../helpers/theme';
import { userPasswordUpdate } from '../../actions/user';


export const UserForm = ( { formValues, setFormValues, activeUser } ) => {

    const dispatch = useDispatch();

    
    const [error, setError] = useState("");

    const [passError, setPassError] = useState("");
    
    const { email, name, urlimage, rol } = formValues;
    
    const initPassword = {
        password: '',
        newPassword: ''
    }

    const [formPassValues, setFormPassValues] = useState( initPassword );

    const { password, newPassword } = formPassValues;

    const { modalViewModel } = useSelector( state => state.ui );

    
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleInputChangePassword = ({ target }) => {
        setFormPassValues({
            ...formPassValues,
            [target.name]: target.value
        });
    }
    
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(isFormValid()){
            console.log(formValues);
        }

    }

    const handleSubmitPasswordForm = (e) => {
        e.preventDefault();
        if(isPasswordFormValid()){

            dispatch( userPasswordUpdate(formPassValues) );      
        }
    }

    const isPasswordFormValid = () => {
        
        if ( newPassword.length < 6 || password.length < 6 ) {
            setPassError('Password should be at least 6 characters');
            return false
        }
        setPassError("");
       return true;
    }

    const isFormValid = () => {
        if ( name.trim().length === 0 ) {
            setError('Name is required'); 
            return false;
        } 
        setError("");
       return true;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                    marginBottom: 5,
                    marginTop: 13,
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    {!modalViewModel ?
                        <>
                            <Box 
                                component="form"
                                sx={{
                                    marginBottom: 3,
                                }}
                            >
                                {
                                    error &&
                                    (
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="error">{error}</Alert>
                                        </Stack>
                                    )
                                } 

                                <h3>Update Your User Information</h3>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    type="text"
                                    autoComplete="off"
                                    value={ name || '' }
                                    onChange={ handleInputChange }
                                    id="name1"
                                />

                                <Button
                                    onClick={handleSubmitForm}
                                    startIcon={<SaveIcon />}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Save
                                </Button>

                            </Box> 
                            <hr />
                            <Box 
                                component="form" 
                                sx={{
                                    marginTop: 5,
                                }}
                                
                            >
                                {
                                    passError &&
                                    (
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="error">{passError}</Alert>
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
                                    value={ password }
                                    onChange={ handleInputChangePassword }
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    autoComplete="off"
                                    value={ newPassword }
                                    onChange={ handleInputChangePassword }
                                />

                                <Button
                                    onClick={handleSubmitPasswordForm}
                                    startIcon={<SaveIcon />}
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
                                        Rol: { rol }
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
