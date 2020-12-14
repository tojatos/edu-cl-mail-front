import notificationReducer from "./notificationReducer";
import { combineReducers } from "redux";
import userReducer, { logoutUser } from "../slices/userSlice";
import mailsReducer from "../slices/mailsSlice";

const appReducer = combineReducers({
  userData: userReducer,
  mailData: mailsReducer,
  notificationReducer,
});
const rootReducer = (state, action) => {
  if (action.type === logoutUser.type) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
