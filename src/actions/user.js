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

export const startUserUploading = ( file ) => {
    return async( dispatch ) => {

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const fileUrl = await fileUpload( file );
    
            dispatch( userUploadImage( fileUrl ) );

            dispatch( uploadedImage() );
    
            Swal.close();
            
        } catch (error) {
            console.log(error);
            Swal.close();
        }

    }
}


const userUploadImage = (fileUrl) => ({
    type: types.userUrlUpload,
    payload: fileUrl
});

const uploadedImage = () => ({ type: types.uploadedImage});