import Swal from 'sweetalert2';

import { fetchConToken } from "../helpers/fetch";
import { filesUpload } from '../helpers/fileUpload';
import { prepareStories } from "../helpers/prepareStories";
import { types } from "../types/types";
import { uiOpenShowSuccessMessage, uiOpenShowErrorMessage } from './ui';

export const storieLogout =() => ({ type: types.storieLogout });

export const storieStartAddNew = ( storie, images ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth.user;

        try {

            const urlImages = await filesUpload(images);

            storie = {
                ...storie,
                urlImages
            }

            const resp = await fetchConToken('stories', storie, 'POST');
            const body = await resp.json();


            if ( body.ok ) {
                storie._id = body.storie._id;
                storie.user = {
                    _id: uid,
                    name: name
                }
                dispatch( storieAddNew( storie ) );
                dispatch(storieClearImages());
                dispatch( uiOpenShowSuccessMessage("Successfully Created!") );
            }else{
                dispatch( uiOpenShowErrorMessage(body.msg) );
                dispatch(storieClearImages());
            }


        } catch (error) {
            dispatch(storieClearImages());
            dispatch( uiOpenShowErrorMessage('An error ocurred!') );
            console.log(error);
        }
    }
}

const storieAddNew = (storie) => ({
    type: types.storieAddNew,
    payload: storie
});

export const storieClearImages = () => ({
    type: types.storieClearImages
})

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

export const storieAddImage = (file) => ({
    type: types.storieAddImages,
    payload: file
});

export const storieRemoveImages = (images) => ({
    type: types.storieRemoveImages,
    payload: images
});

export const storieIsValidImages = (valid) => ({
    type: types.storieIsValidImages,
    payload: valid
});
