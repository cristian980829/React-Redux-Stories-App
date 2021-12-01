import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AutoStories from '@mui/icons-material/AutoStories';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import validator from 'validator';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

import { Copyright } from './Copyright';
import { useForm } from '../../hooks/useForm';
import { startRegister } from '../../actions/auth';
import { theme } from '../../helpers/theme';
import { startUserUploading, uploadImage, userClearActive } from '../../actions/user';



export const RegisterScreen = () => {

    const fileInput = useRef();
    const dispatch = useDispatch();
    const { uploadedImage, activeUser } = useSelector( state => state.user );
    const { urlimage } = activeUser;
    const [error, setError] = useState("");
    const [values, setValues] = useState({showPassword: false});

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
            dispatch( startRegister( email, password, name, urlimage ) );
            dispatch( userClearActive() );
        }
    };

    const handleFileChange = async(e) => {
        dispatch( uploadImage() );

        const file = e.target.files[0];

        if ( file ) {
            dispatch( startUserUploading(file));
        }
    }

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
        <div className="animate__animated animate__fadeIn ">
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
                            <AutoStories />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                            {
                                error &&
                                (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="error">{error}</Alert>
                                    </Stack>
                                )
                            }

                            {(!uploadedImage && urlimage) && 
                                <div>
                                    <img
                                        src={`${urlimage}`}
                                        alt={name}
                                        className="img-register"
                                    />
                                </div>
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

                            <Stack direction="row" alignItems="left" >
                                <Button 
                                    color="primary" 
                                    aria-label="upload picture" 
                                    component="span"
                                    onClick={()=>fileInput.current.click()}
                                >
                                        <PhotoCamera />
                                </Button>

                                <input 
                                    onChange={ handleFileChange }
                                    ref={fileInput} 
                                    type="file" 
                                    style={{ display: 'none' }} 
                                />
                            </Stack>
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            {!uploadedImage && <Button
                                    onClick={handleSubmit}
                                    startIcon={<CreateNewFolderIcon />}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>}

                                {uploadedImage && <Button
                                    startIcon={<CreateNewFolderIcon />}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled
                                >
                                    Uploading...
                                </Button>
                            }

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
        </div>
    );
}