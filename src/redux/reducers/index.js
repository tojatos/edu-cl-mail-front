import notificationReducer from "./notificationReducer";
import { combineReducers } from "redux";
import userReducer, { logoutUser } from "../user/userSlice";
import mailsReducer from "../mails/mailsSlice";

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
