import { types } from '../types/types';

const initialState = {
    stories: [],
    activeStorie: null,
    images: [],
    isValidImages: true
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

        case types.storieUpdated:
            return {
                ...state,
                stories: state.stories.map(
                    e => ( e._id === action.payload._id ) ? action.payload : e
                )
            }

        case types.storieDeleted:
            return {
                ...state,
                stories: state.stories.filter(
                    e => ( e._id !== state.activeStorie._id )
                ),
                activeStorie: null
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

        case types.storieAddImages:
            return {
                ...state,
                images: [ ...state.images, action.payload ]
            }
            
        case types.storieRemoveImages:
            return {
                ...state,
                images: action.payload 
            }

        case types.storieIsValidImages:
            return {
                ...state,
                isValidImages: action.payload 
            }

        case types.storieClearImages:
            return {
                ...state,
                images: [] 
            } 
        
            case types.storieRemoveOneImage:
            return {
                ...state,
                activeStorie: {
                    ...state.activeStorie,
                    urlImages: state.activeStorie.urlImages.filter(img => img !== action.payload)
                }
            } 

            

        default:
            return state;
    }
}

