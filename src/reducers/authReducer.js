import { types } from '../types/types';

const initialState = {
    checking: true,
    serverError: false
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }

        case types.authSetServerError:
            return {
                ...state,
                serverError: true
            }


        default:
            return state;
    }

}


