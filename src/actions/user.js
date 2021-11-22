import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";

import Swal from 'sweetalert2';

export const startUserSetActive = (id) => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken( `user/${id}` );
            const body = await resp.json();
            
            const user = body.user;

            dispatch( userSetActive( user ) );

        } catch (error) {
            Swal.fire('Error', 'There was an error connecting to the server', 'error');
        }

    }
}

export const userSetActive = (user) => ({
    type: types.userSetActive,
    payload: user
});