import { types } from "../types/types";

const initialState = {
    storieModalOpen: false,
    userModalOpen: false,
    modalViewModel: false,
    showMessage: {
        open: false,
        message: "",
        error: false
    },
    showLoading: false
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

        case types.uiOpenShowSuccessMessage:
            return {
                ...state,
                showMessage: {
                    ...state.showMessage,
                    open: true,
                    message: action.payload
                }
            }

        case types.uiOpenShowErrorMessage:
            return {
                ...state,
                showMessage: {
                    open: true,
                    message: action.payload,
                    error: true
                }
            }

        case types.uiCloseShowMessage:
            return {
                ...state,
                showMessage: {
                    ...state.showMessage,
                    open: false,
                    message: ""
                }
            }

        case types.uiShowLoading:
            return {
                ...state,
                showLoading: action.payload
            }
    
        default:
            return state;
    }


}