import React from 'react';
import Fab from "@material-ui/core/Fab";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { uiModalEditModel } from '../../actions/ui';

export const EditFab = () => {

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch( uiModalEditModel() );
    }

    return (
        <div className="fab"
            onClick={ handleEdit}
        >
            <Fab color="primary" aria-label="add">
                <EditIcon />
            </Fab>
        </div>
    )
}
