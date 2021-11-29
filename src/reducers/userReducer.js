import { types } from '../types/types';

const initialState = {
    activeUser: {},
    users: [],
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
            activeUser: action.payload,
            users: state.users.map(user => user.uid!==action.payload.uid ? user : action.payload)
        }

        case types.usersLoaded:
            return {
                ...state,
                users: [ ...action.payload ]
            }

        default:
            return state;
    }

}


