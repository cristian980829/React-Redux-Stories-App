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

import { uiCloseModal } from '../../actions/ui';
import { storieStartAddNew } from '../../actions/storie';
import { StorieForm } from './StorieForm';

Modal.setAppElement('#root');

const initStorie = {
    title: '',
    description: '',
    registration_date: moment().toDate(),
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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


    const closeModal = () => {
        dispatch( uiCloseModal() );
        //TODO: CLEAR ACTIVE STORIE
        setFormValues( initStorie );
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
            <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                >
                <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                New storie
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSubmitForm}>
                save
                </Button>
            </Toolbar>
            </AppBar>
            
            <StorieForm 
                formValues={formValues}
                setFormValues={setFormValues}
                error={error}
            />
            
      </Dialog>
      
    )
}
