import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Card from '@mui/material/Card';
import { CardActions } from '@mui/material';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';




import { uiCloseModal, uiModalEditModel } from '../../actions/ui';

import { theme } from '../../helpers/theme';
import { EditFab } from '../ui/EditFab';

const theme1 = createTheme();

Modal.setAppElement('#root');

const initUser = {
    email: '',
    name: '',
    urlimage: ''
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const UserModal = () => {

    const [error, setError] = useState("");

    const { modalOpen, modalViewModel } = useSelector( state => state.ui );
    const { activeUser } = useSelector( state => state.user );
    const { uid } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    
    const [formValues, setFormValues] = useState( initUser );

    const { email, name, urlimage } = formValues;

     useEffect(() => {
        if ( activeUser ) {
            setFormValues( activeUser );
        } else {
            setFormValues( initUser );
        }
    }, [activeUser, setFormValues])


    const handleSubmitForm = (e) => {
        e.preventDefault();


    }

    const isFormValid = () => {

    }


    const closeModal = () => {
        dispatch( uiCloseModal() );
        // TODO: CLEAR ACTIVE USER
        setFormValues( initUser );
        dispatch( uiModalEditModel() );
    }
    

    const handleClose = () => {
        closeModal();
    };

    return (
        <Dialog
            fullScreen
            open={modalOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <ThemeProvider theme={theme1}>
                <AppBar color="primary" sx={{ position: 'fixed' }}>
                    <Toolbar>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        
                        {
                            !modalViewModel ? <>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    {activeUser ? 'User' : 'Edit User Information'} 
                                </Typography>
                                <Button autoFocus color="inherit" onClick={handleSubmitForm}>
                                    save
                                </Button>
                            </>
                            : <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    { name }
                                </Typography>
                        }

                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            
            
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


            <Box 
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
                        </Card>
                    </Box> 

                    </Box>
            </Container>
        </ThemeProvider>






            {(modalViewModel && activeUser._id===uid)  && <EditFab />}
            
      </Dialog>

      
    )
}
