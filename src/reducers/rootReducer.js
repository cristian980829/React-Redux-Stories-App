import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { storieReducer } from './storieReducer';



export const rootReducer = combineReducers({
    auth: authReducer,
    storie: storieReducer
})

