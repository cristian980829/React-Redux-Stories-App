import { types } from '../types/types';

const initialState = {
    stories: [],
    activeStorie: null
};

export const storieReducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case types.storieSetActive:
            return {
                ...state,
                activeStorie: action.payload
            }
        
        case types.storieAddNew:
            return {
                ...state,
                stories: [
                    action.payload,
                    ...state.stories
                ]
            }
    
        case types.storieClearActivestorie:
            return {
                ...state,
                activeStorie: null
            }

        case types.storieLoaded:
            return {
                ...state,
                stories: [ ...action.payload ]
            }

        case types.storieLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}

