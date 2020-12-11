import userReducer from './userReducer';
import notificationReducer from "./notificationReducer";
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    userReducer, notificationReducer
});

export default rootReducer;
