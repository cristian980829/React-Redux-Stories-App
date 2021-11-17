import Swal from 'sweetalert2';

import { fetchConToken } from "../helpers/fetch";
import { prepareStories } from "../helpers/prepareStories";
import { types } from "../types/types";

export const storieLogout =() => ({ type: types.storieLogout });

export const storieStartAddNew = ( storie ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

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
            }


        } catch (error) {
            console.log(error);
        }
    }
}

const storieAddNew = (storie) => ({
    type: types.storieAddNew,
    payload: storie
});

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
