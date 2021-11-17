import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Modal from 'react-modal';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

import { uiCloseModal } from '../../actions/ui';
import { storieStartAddNew } from '../../actions/storie';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, 00%)'
    }
};

Modal.setAppElement('#root');

const initStorie = {
    title: '',
    description: '',
    registration_date: moment().toDate(),
}

const theme = createTheme();

export const StorieModal = () => {

    const [error, setError] = useState("");

    const { modalOpen } = useSelector( state => state.ui );
    const { activeStorie } = useSelector( state => state.storie );
    const dispatch = useDispatch();

    
    const [formValues, setFormValues] = useState( initStorie );

    const { description, title } = formValues;

    useEffect(() => {
        if ( activeStorie ) {
            setFormValues( activeStorie );
        } else {
            setFormValues( initStorie );
        }
    }, [activeStorie, setFormValues])



    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        dispatch( uiCloseModal() );
        //TODO: CLEAR ACTIVE STORIE
        setFormValues( initStorie );
    }
    

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if(isFormValid()){
            dispatch( storieStartAddNew(formValues) );
        }


        closeModal();
        
    }

    const isFormValid = () => {
        
        if ( title.trim().length === 0 ) {
            setError('Title is not valid');
            return false;
        } else if ( description.trim().length === 0 ) {
            setError('Description is required'); 
            return false;
        } 
        setError("");
       return true;
    }

    return (
        <Modal
          isOpen={ modalOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          closeTimeoutMS={ 200 }
          className="modal"
          overlayClassName="modal-fondo"
        >
            <ThemeProvider theme={theme}>
                <Container component="main" >
                    <CssBaseline />
                    <Box
                        sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <AddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            { (activeStorie)? 'Edit storis': 'New storie' }
                        </Typography>
                        <Box component="form" onSubmit={handleSubmitForm}  >
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
                                autoComplete="off"
                                    value={ description }
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
                    </Box>
                </Container>
            </ThemeProvider>

        </Modal>
    )
}
