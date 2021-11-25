import { types } from '../types/types';

const initialState = {
    activeUser: {},
    uploadedImage: false
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
                activeUser: {}
            }

        case types.userUrlUpload:
            return {
                ...state,
                activeUser: { ...state.activeUser, ...action.payload }
            }

        case types.userUploadedImage:
            return {
                ...state,
                uploadedImage: true
            }

        case types.userEndUploadedImage:
            return {
                ...state,
                uploadedImage: false
            }
        
        case types.userUpdateActiveUser:
        return {
            ...state,
            activeUser: action.payload
        }

        default:
            return state;
    }

}


