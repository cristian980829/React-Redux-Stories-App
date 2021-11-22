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

import { uiCloseModal, uiModalEditModel } from '../../actions/ui';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../helpers/theme';
import { EditFab } from '../ui/EditFab';

Modal.setAppElement('#root');

const initStorie = {
    name: '',
    email: '',
    registration_date: moment().toDate()
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

    
    const [formValues, setFormValues] = useState( initStorie );

    const { email, name } = formValues;


    const handleSubmitForm = (e) => {
        e.preventDefault();


    }

    const isFormValid = () => {

    }


    const closeModal = () => {
        dispatch( uiCloseModal() );
        // TODO: CLEAR ACTIVE USER
        setFormValues( initStorie );
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
            <ThemeProvider theme={theme}>
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
            
            

            {(modalViewModel && activeUser.user._id===uid)  && <EditFab />}
            
      </Dialog>

      
    )
}
