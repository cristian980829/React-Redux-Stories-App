import { types } from '../types/types';

const initialState = {
    checking: true,
    serverError: false,
    user: {}
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.authLogin:
            return {
                ...state,
                user: action.payload,
                checking: false
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                user: {},
                checking: false
            }

        case types.authSetServerError:
            return {
                ...state,
                serverError: true
            }

        case types.authUserUpdated:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }

}


