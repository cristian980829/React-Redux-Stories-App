import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";

import Swal from 'sweetalert2';

export const startUserSetActive = (id = null) => {
    return async(dispatch, getState) => {

        try {

            if(id === null){
                const user = getState().auth;
                delete user.checking;
                delete user.serverError;
                dispatch( userSetActive( user ) );
            }else{
                const resp = await fetchConToken( `user/${id}` );
                const body = await resp.json();
                
                const user = body.user;
    
                dispatch( userSetActive( user ) );
            }

        } catch (error) {
            Swal.fire('Error', 'There was an error connecting to the server', 'error');
        }

    }
}

export const userSetActive = (user) => ({
    type: types.userSetActive,
    payload: user
});

export const userClearActive = () => ({ type: types.userClearActive});


export const userPasswordUpdate = ( userPasswordValues ) => {
    return async() => {

        try {
            const resp = await fetchConToken(`user`, userPasswordValues, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
               console.log('Actualizada')
            } else {
                console.log("error: ", body.msg)
            }

        } catch (error) {
            console.log(error)
        }

    }
}