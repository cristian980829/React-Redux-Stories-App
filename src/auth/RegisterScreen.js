import React, { useState } from 'react';
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
import { Copyright } from './Copyright';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import validator from 'validator';

import { useForm } from '../hooks/useForm';

const theme = createTheme();

export const RegisterScreen = () => {

    const [error, setError] = useState("");

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: '',
        password2: '',
        name: ''
    });

    const { email, name, password, password2 } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isFormValid()){
            console.log(formValues);
        }
    };

    const isFormValid = () => {
        
        if ( !validator.isEmail( email ) ) {
            setError('Email is not valid');
            return false;
        } else if ( name.trim().length === 0 ) {
            setError('Name is required'); 
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            setError('Password should be at least 6 characters and match each other');
            return false
        }
        setError("");
       return true;
    }

    return (
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
                        Sign Up
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
                            name="name"
                            label="Name"
                            type="text"
                            autoComplete="off"
                                value={ name }
                                onChange={ handleInputChange }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="off"
                                value={ password }
                                onChange={ handleInputChange }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Confirm password"
                            type="password"
                            autoComplete="off"
                                value={ password2 }
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
                            Sign Up
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            </Grid> */}
                            <Grid item>
                                <Link 
                                    to="/auth/signin"
                                    className="link"
                                >
                                    Do you have an account? Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}