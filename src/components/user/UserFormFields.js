import React, { useRef, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import RadioGroup from '@mui/material/RadioGroup';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


import { startUserUploading, updateActiveUser, uploadImage } from '../../actions/user';
import { userStartUpdate } from '../../actions/auth';
import { uiShowLoading } from '../../actions/ui';
import { Radio } from '@mui/material';
import { UserFormChangePassword } from './UserFormChangePassword';
import { ShowLoading } from '../ui/ShowLoading';

export const UserFormFields = ( { formValues, setFormValues} ) => {

    const { name, urlimage, rol, uid: userId } = formValues;

    const dispatch = useDispatch();
    const fileInput = useRef();
    const [error, setError] = useState("");
    const { uploadedImage, activeUser } = useSelector( state => state.user );
    const { uid: authId, rol: myRol } = useSelector( state => state.auth.user );


    const handleFileChange = async(e) => {
        dispatch( uploadImage() );

        const file = e.target.files[0];

        if ( file ) {
            dispatch( startUserUploading(file, name));
        }
    }
    
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmitForm = async(e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch(uiShowLoading(true));
            if(authId!==userId){
                await dispatch( userStartUpdate(formValues) );
                dispatch( updateActiveUser(formValues));
            }else{
                await dispatch( userStartUpdate(formValues, true) );
                dispatch( updateActiveUser(formValues));
            }
            dispatch(uiShowLoading(false));
        }
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
        <>
            <ShowLoading/>
            
            <Box 
                className="animate__animated animate__fadeIn"
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

                {
                    userId!==authId 
                        ? <h3 align="center">Update {activeUser.name} User Information</h3> 
                        : <h3 align="center">Update Your User Information</h3> 
                }

                {
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
                    name="name"
                    label="Name"
                    type="text"
                    autoComplete="off"
                    value={ name || '' }
                    onChange={ handleInputChange }
                />

                { ((myRol === 'ADMIN' && authId === userId) || (myRol === 'ADMIN' && activeUser.rol === 'USER')) && 
                    <Box 
                        sx={{
                            marginBottom: 2,
                            marginTop: 2
                        }}
                    >
                        <FormControl component="fieldset">
                            <FormLabel 
                                component="legend" 
                                sx={{
                                    marginBottom: 1,
                                }}
                            >
                                User Type
                            </FormLabel>
                            <RadioGroup
                                row aria-label="rol" 
                                name="rol" 
                                value={rol || ''}
                                onChange={ handleInputChange }
                            >
                                <FormControlLabel value="ADMIN" control={<Radio />} label="ADMIN" />
                                <FormControlLabel value="USER" control={<Radio />} label="USER" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                }

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

                {!uploadedImage && <Button
                    onClick={handleSubmitForm}
                    startIcon={<SaveIcon />}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save
                </Button>}

                {uploadedImage && <Button
                    startIcon={<SaveIcon />}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled
                >
                    Uploading...
                </Button>}

            </Box> 

            { userId===authId && 
                <UserFormChangePassword />
            }
                    
        </>
    )
}
