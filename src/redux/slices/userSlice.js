import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  enqueueSnackbarError,
  enqueueSnackbarSuccess,
} from "../actions/notificationActions";
import { LOGIN_CHECK_URL } from "../../shared";

export const LOGIN_REQUEST_STATES = {
  NONE: "NONE",
  AWAITING: "AWAITING",
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginRequestState: LOGIN_REQUEST_STATES.NONE,
    loggedIn: false,
    user: {},
  },
  reducers: {
    loginUser(state, action) {
      if (!state.loggedIn) {
        state.loggedIn = true;
        state.user = action.payload;
      }
    },
    logoutUser(state) {
      state.loggedIn = false;
      state.user = {};
    },
    setLoginRequestState(state, action) {
      state.loginRequestState = action.payload;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  setLoginRequestState,
} = userSlice.actions;
export default userSlice.reducer;

export const checkLogin = (login, password) => async (dispatch, getState) => {
  if (getState().userData.loginRequestState === LOGIN_REQUEST_STATES.AWAITING)
    return;
  try {
    dispatch(setLoginRequestState(LOGIN_REQUEST_STATES.AWAITING));
    const result = await axios.post(LOGIN_CHECK_URL, {
      username: login,
      password: password,
    });
    dispatch(setLoginRequestState(LOGIN_REQUEST_STATES.NONE));

    if (result.data === true) {
      dispatch(loginUser({ login, password }));
      dispatch(enqueueSnackbarSuccess("Pomyślnie zalogowano"));
    } else {
      dispatch(enqueueSnackbarError("Nieprawidłowy login lub hasło"));
    }
  } catch (error) {
    dispatch(setLoginRequestState(LOGIN_REQUEST_STATES.NONE));
    dispatch(enqueueSnackbarError("Nie udało się połączyć z serwerem."));
    console.error(error);
  }
};
