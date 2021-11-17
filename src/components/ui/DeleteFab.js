import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from "@material-ui/core/Fab";
import Swal from 'sweetalert2';

import { storieStartDelete } from '../../actions/storie';
import { uiCloseModal } from '../../actions/ui';


export const DeleteFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            target: '#custom-target',
            toast: true
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch( storieStartDelete() );
                    dispatch( uiCloseModal() );
                }
            })
       
    }


    return (
        <>
            <div id="custom-target"></div>
            <div className="fab"
                onClick={ handleDelete}
            >
                <Fab color="primary" aria-label="add">
                    <DeleteIcon />
                </Fab>
            </div>
        </>
    )
}
