import React from 'react';
import { useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from "@material-ui/core/Fab";

import { storieStartDelete } from '../../actions/storie';

import Swal from 'sweetalert2';


export const DeleteFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            target: '#custom-target',
            position: 'fixed'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch( storieStartDelete() );
                    dispatch( uiCloseModal() );
                    Swal.fire(
                    'Deleted!',
                    'Your storie has been deleted.',
                    'success'
                    )
                }
            })
    }

    return (
        <>
        <div id="custom-target"></div>
        <div className="fab"
            onClick={ handleDelete}
        >
            <Fab color="secondary" aria-label="add">
                <DeleteIcon />
            </Fab>
        </div>
        </>
    )
}
