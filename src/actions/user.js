import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";

import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";
import { uiOpenShowErrorMessage, uiOpenShowSuccessMessage } from "./ui";

export const startUserSetActive = (id = null) => {
    return async(dispatch, getState) => {

        try {

            if(id === null){
                const user = getState().auth.user;
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
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`user/password`, userPasswordValues, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
               dispatch( uiOpenShowSuccessMessage("Successfully Updated!") );
            } else {
                dispatch( uiOpenShowErrorMessage(body.msg) );
                console.log("error: ", body.msg)
            }

        } catch (error) {
            console.log(error);
            dispatch( uiOpenShowErrorMessage('An error ocurred!') );
        }

    }
}

export const startUserUploading = ( file, name = '' ) => {
    return async( dispatch ) => {

        try {
            const urlimage = await fileUpload( file );

            dispatch( userUploadImage( urlimage, name ) );

            dispatch( endUploadImage() );

        } catch (error) {
            dispatch( endUploadImage() );
            console.log(error);
        }

    }
}

const userUploadImage = (urlimage, name) => ({
    type: types.userUrlUpload,
    payload: {urlimage, name}
});

export const uploadImage = () => ({ type: types.userUploadedImage});

const endUploadImage = () => ({ type: types.userEndUploadedImage});

export const updateActiveUser = (user) => ({
    type: types.userUpdateActiveUser,
    payload: user
});

export const usersStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken( 'user' );
            const body = await resp.json();
            
            let users = body.users;
            let uid = '';

            users = users.map(user => {
                uid = user._id;
                delete user._id;
                return {
                    uid,
                    ...user
                }
            })

            dispatch( usersLoaded( users ) );

        } catch (error) {
            Swal.fire('Error', 'There was an error connecting to the server', 'error');
        }

    }
}

const usersLoaded = (users) => ({
    type: types.usersLoaded,
    payload: users
})