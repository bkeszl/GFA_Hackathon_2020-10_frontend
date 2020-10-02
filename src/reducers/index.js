import { combineReducers } from 'redux';
import reduxReducer from './reduxReducer';

export const rootReducer = combineReducers({
    redux: reduxReducer
})