import React, { useState }  from 'react';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { userPasswordUpdate } from '../../actions/user';

export const UserFormChangePassword = () => {

    const initPassword = {
        password: '',
        newPassword: ''
    }
    
    const dispatch = useDispatch();
    const [passError, setPassError] = useState("");
    const [formPassValues, setFormPassValues] = useState( initPassword );
    
    const { password, newPassword } = formPassValues;
    

    const handleInputChangePassword = ({ target }) => {
        setFormPassValues({
            ...formPassValues,
            [target.name]: target.value
        });
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

    return (
        <Box 
            component="form" 
            sx={{
                marginTop: 3,
            }}
            
        >
            <hr />
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
    )
}
