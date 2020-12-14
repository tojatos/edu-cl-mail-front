import notificationReducer from "./notificationReducer";
import { combineReducers } from "redux";
import userReducer, { logoutUser } from "../slices/userSlice";
import mailsReducer from "../slices/mailsSlice";
import mailFilterReducer from "../slices/mailFilterSlice";

const appReducer = combineReducers({
  userData: userReducer,
  mailData: mailsReducer,
  mailFilterData: mailFilterReducer,
  notificationReducer,
});
const rootReducer = (state, action) => {
  if (action.type === logoutUser.type) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
