import React, { useRef, useState }  from 'react';
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
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { theme } from '../../helpers/theme';
import { userPasswordUpdate, startUserUploading, updateActiveUser } from '../../actions/user';
import { userStartUpdate } from '../../actions/auth';


export const UserForm = ( { formValues, setFormValues} ) => {

    const fileInput = useRef();

    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    const [passError, setPassError] = useState("");
    
    const { email, name, urlimage, rol, uid: userId } = formValues;
    
    const initPassword = {
        password: '',
        newPassword: ''
    }

    const [formPassValues, setFormPassValues] = useState( initPassword );

    const { password, newPassword } = formPassValues;

    const { modalViewModel } = useSelector( state => state.ui );
    const { uploadedImage } = useSelector( state => state.user );
    const { uid: authId } = useSelector( state => state.auth.user );


    const handleFileChange = async(e) => {
        setUploading(true);
        const file = e.target.files[0];

        if ( file ) {
            await dispatch( startUserUploading(file, name, setUploading));
            // setUploading(false);
        }
    }
    
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
    
    const handleSubmitForm = async(e) => {
        e.preventDefault();
        if(isFormValid()){
            await dispatch( userStartUpdate(formValues) );
            dispatch( updateActiveUser(formValues) );
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

                                {userId!==authId ?
                                     <h3>Update {name} User Information</h3> 
                                     : <h3>Update Your User Information</h3> }

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

                                {uploadedImage && <img
                                    src={`${urlimage}`}
                                    alt={name}
                                    className="img"
                                />}

                                {!uploading && <Button
                                    onClick={handleSubmitForm}
                                    startIcon={<SaveIcon />}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Save
                                </Button>}

                                {uploading && <Button
                                    startIcon={<SaveIcon />}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled
                                >
                                    Uploading...
                                </Button>}

                            </Box> 
                            <hr />
                            { userId===authId && <Box 
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

                            </Box> }
                    
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
