import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";

import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";

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
    return async() => {

        try {
            const resp = await fetchConToken(`user/password`, userPasswordValues, 'PUT' );
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

export const startUserUploading = ( file, name ) => {
    return async( dispatch ) => {

        try {
            const fileUrl = await fileUpload( file );
    
            dispatch( userUploadImage( fileUrl, name ) );

            dispatch( uploadedImage() );
                
        } catch (error) {
            console.log(error);
        }

    }
}

const userUploadImage = (fileUrl, name) => ({
    type: types.userUrlUpload,
    payload: {fileUrl, name}
});

const uploadedImage = () => ({ type: types.userUploadedImage});

export const endUploadedImage = () => ({ type: types.userEndUploadedImage});

export const updateActiveUser = (user) => ({
    type: types.userUpdateActiveUser,
    payload: user
});