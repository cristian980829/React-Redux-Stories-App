import Swal from 'sweetalert2';

import { fetchConToken } from "../helpers/fetch";
import { fileUpload } from '../helpers/fileUpload';
import { prepareStories } from "../helpers/prepareStories";
import { types } from "../types/types";
import { uiOpenShowSuccessMessage, uiOpenShowErrorMessage } from './ui';

export const storieLogout =() => ({ type: types.storieLogout });

export const storieStartAddNew = ( storie ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth.user;

        try {
            const resp = await fetchConToken('stories', storie, 'POST');
            const body = await resp.json();


            if ( body.ok ) {
                storie._id = body.storie._id;
                storie.user = {
                    _id: uid,
                    name: name
                }
                dispatch( storieAddNew( storie ) );
                dispatch( uiOpenShowSuccessMessage("Successfully Created!") );
            }else{
                dispatch( uiOpenShowErrorMessage(body.msg) );
            }


        } catch (error) {
            dispatch( uiOpenShowErrorMessage('An error ocurred!') );
            console.log(error);
        }
    }
}

const storieAddNew = (storie) => ({
    type: types.storieAddNew,
    payload: storie
});

export const storieStartUpdate = ( storie ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`stories/${ storie._id }`, storie, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( storieUpdated( storie ) );
                dispatch( uiOpenShowSuccessMessage("Successfully Updated!") );
            } else {
                dispatch( uiOpenShowErrorMessage(body.msg) );
            }


        } catch (error) {
            dispatch( uiOpenShowErrorMessage('An error ocurred!') );
            console.log(error)
        }

    }
}

const storieUpdated = ( storie ) => ({
    type: types.storieUpdated,
    payload: storie
});

export const storieStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { _id } = getState().storie.activeStorie;
        try {
            const resp = await fetchConToken(`stories/${ _id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( storieDeleted() );
                Swal.fire(
                    'Deleted!',
                    'Your storie has been deleted.',
                    'success',
                    )
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}


const storieDeleted = () => ({ type: types.storieDeleted });

export const storieSetActive = (storie) => ({
    type: types.storieSetActive,
    payload: storie
});

export const storieClearActiveStorie = () => ({ type: types.storieClearActivestorie});

export const storieStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken( 'stories' );
            const body = await resp.json();
            
            const stories = prepareStories( body.stories );

            dispatch( storieLoaded( stories ) );

        } catch (error) {
            Swal.fire('Error', 'There was an error connecting to the server', 'error');
        }

    }
}

const storieLoaded = (stories) => ({
    type: types.storieLoaded,
    payload: stories
})

export const startStorieUploading = ( file, name = '' ) => {
    return async( dispatch ) => {

        try {
            const urlimage = await fileUpload( file );

            dispatch( storieUploadImage( urlimage, name ) );

            // dispatch( endUploadImage() );

        } catch (error) {
            // dispatch( endUploadImage() );
            console.log(error);
        }

    }
}

const storieUploadImage = (urlimage, name) => ({
    type: types.userUrlUpload,
    payload: {urlimage, name}
});

export const storieAddImage = (file) => ({
    type: types.storieAddImages,
    payload: file
});

export const storieRemoveImages = (images) => ({
    type: types.storieRemoveImages,
    payload: images
});