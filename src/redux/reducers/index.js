import notificationReducer from "./notificationReducer";
import { combineReducers } from "redux";
import userReducer from "../user/userSlice";

export default combineReducers({
  user: userReducer,
  notificationReducer,
});
