import { types } from "../types/types";

const initialState = {
    storieModalOpen: false,
    userModalOpen: false,
    modalViewModel: false
}

export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiStorieOpenModal:
            return {
                ...state,
                storieModalOpen: true
            }

        case types.uiStorieCloseModal:
            return {
                ...state,
                storieModalOpen: false
            }

        case types.uiUserOpenModal:
            return {
                ...state,
                userModalOpen: true
            }

        case types.uiUserCloseModal:
            return {
                ...state,
                userModalOpen: false
            }

        case types.uiModalViewModel:
            return {
                ...state,
                modalViewModel: true
            }

        case types.uiModalEditModel:
            return {
                ...state,
                modalViewModel: false
            }
    
        default:
            return state;
    }


}