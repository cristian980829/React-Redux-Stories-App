import { types } from '../types/types';

const initialState = {
    stories: [],
    activeStorie: null
};

export const storieReducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case types.storieLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}

