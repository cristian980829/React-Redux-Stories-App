import { types } from '../types/types';

export const uiStorieOpenModal = () => ({ type: types.uiStorieOpenModal });
export const uiStorieCloseModal = () => ({ type: types.uiStorieCloseModal });
export const uiModalViewModel = () => ({ type: types.uiModalViewModel });
export const uiModalEditModel = () => ({ type: types.uiModalEditModel });

export const uiUserOpenModal = () => ({ type: types.uiUserOpenModal });
export const uiUserCloseModal = () => ({ type: types.uiUserCloseModal });


export const uiOpenShowSuccessMessage = (message) => ({ type: types.uiOpenShowSuccessMessage, payload: message });
export const uiOpenShowErrorMessage = (message) => ({ type: types.uiOpenShowErrorMessage, payload: message });
export const uiCloseShowMessage = () => ({ type: types.uiCloseShowMessage });