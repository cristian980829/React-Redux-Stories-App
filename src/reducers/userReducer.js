import { types } from '../types/types';

const initialState = {
    activeUser: null
}

export const userReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.userSetActive:
            return {
                ...state,
                activeUser: action.payload 
            }

        case types.userClearActive:
            return {
                ...state,
                activeUser: null
            }

        default:
            return state;
    }

}


