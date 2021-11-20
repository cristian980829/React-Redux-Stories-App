import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { storieReducer } from './storieReducer';
import { uiReducer } from './uiReducer';
import { userReducer } from './userReducer';



export const rootReducer = combineReducers({
    auth: authReducer,
    storie: storieReducer,
    ui: uiReducer,
    user: userReducer
})

