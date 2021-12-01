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
import { ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import validator from 'validator';

import { Copyright } from './Copyright';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';
import { theme } from '../../helpers/theme';


export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [values, setValues] = useState({showPassword: false});

    const [ formValues, handleInputChange ] = useForm({
        email: 'admin@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isFormValid()){
            console.log(email, password)
            dispatch( startLogin( email, password ) );
        }
    };

    const isFormValid = () => {
        if ( !validator.isEmail( email ) ) {
            setError('Email is not valid');
            return false;
        } else if (password.length < 6 ) {
            setError('Password should be at least 6 characters');
            return false
        }
        setError("");
       return true;
    }


    const handleClickShowPassword = () => {
        setValues({
        ...values,
        showPassword: !values.showPassword
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


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
                                type="email"
                                label="Email Address"
                                name="email"
                                autoComplete="off"
                                value={ email }
                                onChange={ handleInputChange }  
                                autoFocus
                            />
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                type={values.showPassword ? "text" : "password"}
                                value={password}
                                onChange={handleInputChange}
                                name="password"
                                required
                                fullWidth
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                            <Button
                                startIcon={<LoginIcon />}
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

                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}