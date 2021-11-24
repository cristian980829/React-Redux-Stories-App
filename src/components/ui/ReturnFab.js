import React from 'react';
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';
import { uiModalViewModel } from '../../actions/ui';

export const ReturnFab = () => {

    const dispatch = useDispatch();

    const handleViewModel = () => {
        dispatch( uiModalViewModel() );
    }

    return (
        <div className="fab"
            onClick={ handleViewModel}
        >
            <Fab color="primary" aria-label="add">
                <ArrowBackIcon />
            </Fab>
        </div>
    )
}
