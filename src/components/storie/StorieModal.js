import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { uiStorieCloseModal, uiModalEditModel, uiShowLoading } from '../../actions/ui';
import { storieClearActiveStorie, storieStartAddNew, storieStartUpdate } from '../../actions/storie';
import { StorieForm } from './StorieForm';
import { DeleteFab } from '../ui/DeleteFab';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../helpers/theme';
import { EditFab } from '../ui/EditFab';
import { ReturnFab } from '../ui/ReturnFab';

const initStorie = {
    title: '',
    description: '',
    registration_date: moment().toDate()
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const StorieModal = () => {

    const [error, setError] = useState("");

    const { storieModalOpen, modalViewModel } = useSelector( state => state.ui );
    const { activeStorie, images } = useSelector( state => state.storie );
    const { uid } = useSelector( state => state.auth.user );
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

    const handleSubmitForm = async(e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch(uiShowLoading(true));
            if(activeStorie){
                formValues.registration_date = moment().toDate();
                dispatch( storieStartUpdate(formValues) );
            }else{
                await dispatch( storieStartAddNew(formValues, images) );
            }
            closeModal();
            dispatch(uiShowLoading(false));
        }
    }

    const isFormValid = () => {
        
        if ( title.trim().length === 0 ) {
            setError('Title is required');
            return false;
        } else if ( description.trim().length === 0 ) {
            setError('Description is required'); 
            return false;
        } 
        setError("");
       return true;
    }


    const closeModal = () => {
        dispatch( uiStorieCloseModal() );
        dispatch( storieClearActiveStorie() );
        setFormValues( initStorie );
        dispatch( uiModalEditModel() );
    }
    
    const handleClose = () => {
        closeModal();
    };

    return (
        <Dialog
            disableEnforceFocus
            fullScreen
            open={storieModalOpen}
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
                                    {activeStorie ? 'Edit storie' : 'New storie'} 
                                </Typography>
                                <Button autoFocus color="inherit" onClick={handleSubmitForm}>
                                    save
                                </Button>
                            </>
                            : <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    { title }
                                </Typography>
                        }
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            
            <StorieForm 
                formValues={formValues}
                setFormValues={setFormValues}
                error={error}
            />
            
            { (activeStorie && !modalViewModel) && <DeleteFab /> }
            
            { activeStorie && ((modalViewModel && activeStorie.user._id===uid)  && <EditFab />) }
            
            { (activeStorie && !modalViewModel) && <ReturnFab /> }
      </Dialog>

      
    )
}
