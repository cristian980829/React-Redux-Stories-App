import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import validator from 'validator';

import { Copyright } from './Copyright';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';

const theme = createTheme();

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const [ formValues, handleInputChange ] = useForm({
        email: 'cristian980829@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch( startLogin( email, password ) );
        }
    };

    const isFormValid = () => {
        if ( !validator.isEmail( email ) ) {
            setError('Email is not valid');
            return false;
        } else if (password.length < 5 ) {
            setError('Password should be at least 6 characters');
            return false
        }
        setError("");
       return true;
    }

    return (
        <div className="animate__animated animate__fadeIn">

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            {
                                error &&
                                (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="error">{error}</Alert>
                                    </Stack>
                                )
                            }
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                type="email"
                                label="Email Address"
                                name="email"
                                autoComplete="off"
                                value={ email }
                                onChange={ handleInputChange }  
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                    value={ password }
                                    onChange={ handleInputChange }
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                                </Grid> */}
                                <Grid item>
                                    <Link 
                                        to="/auth/signup"
                                        className="link"
                                    >
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}