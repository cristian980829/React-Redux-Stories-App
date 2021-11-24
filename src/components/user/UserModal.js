import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';


import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { ThemeProvider } from '@mui/material/styles';

import { uiUserCloseModal, uiModalEditModel } from '../../actions/ui';

import { theme } from '../../helpers/theme';
import { EditFab } from '../ui/EditFab';
import { userClearActive } from '../../actions/user';
import { UserForm } from './UserForm';
import { ReturnFab } from '../ui/ReturnFab';

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

    const { userModalOpen, modalViewModel } = useSelector( state => state.ui );
    const { activeUser } = useSelector( state => state.user );
    const { uid } = useSelector( state => state.auth.user );
    const dispatch = useDispatch();

    
    const [formValues, setFormValues] = useState( initUser );

    const { name } = formValues;

     useEffect(() => {
        if ( activeUser ) {
            setFormValues( activeUser );
        } else {
            setFormValues( initUser );
        }
    }, [activeUser, setFormValues])

    const handleClose = () => {
        dispatch( uiUserCloseModal() );
        dispatch( userClearActive() );
        setFormValues( initUser );
        dispatch( uiModalEditModel() );
    };

    return (
        <Dialog
            disableEnforceFocus
            fullScreen
            open={userModalOpen}
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
                                    {activeUser ? `${name}` : 'Edit User Information'} 
                                </Typography>
                            </>
                            : <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    { name }
                                </Typography>
                        }

                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            

        <UserForm 
                formValues={formValues}
                setFormValues={setFormValues}
                activeUser={activeUser}
            />

            {(modalViewModel && activeUser.uid===uid)  && <EditFab />}

            {(activeUser && !modalViewModel) && <ReturnFab />}
            
      </Dialog>

      
    )
}
