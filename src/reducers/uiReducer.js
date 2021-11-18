import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    modalViewModel: false
}

export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
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