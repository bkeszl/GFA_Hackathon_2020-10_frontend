import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import locationReducer from './LoacationReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    needyLocation: locationReducer,
})