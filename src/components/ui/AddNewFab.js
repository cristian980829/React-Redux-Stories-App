import React from 'react';
import { useDispatch } from 'react-redux';
import { uiStorieOpenModal } from '../../actions/ui';
import AddIcon from '@mui/icons-material/Add';

import Fab from "@material-ui/core/Fab";


export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( uiStorieOpenModal() );
    }


    return (
        <div className="fab"
            onClick={ handleClickNew}
        >
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    )
}
