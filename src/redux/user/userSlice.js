import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  enqueueSnackbarError,
  enqueueSnackbarSuccess,
} from "../actions/notificationActions";

const apiUrl =
  process.env.REACT_APP_API_URL || "https://krzysztofruczkowski.pl:2020/api";
const loginCheckUrl = `${apiUrl}/login_check`;

let user = {};
let loggedIn = false;
try {
  const userStr = localStorage.getItem("user");
  if (userStr !== null) {
    user = JSON.parse(userStr);
    loggedIn = true;
  }
} catch {}

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: loggedIn,
    user: user,
  },
  reducers: {
    loginUser(state, action) {
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.loggedIn = true;
      state.user = { ...action.payload };
    },
    logoutUser(state) {
      localStorage.clear();
      state.loggedIn = false;
      state.user = {};
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

export const checkLogin = (login, password) => async (dispatch) => {
  try {
    const result = await axios.post(loginCheckUrl, {
      username: login,
      password: password,
    });

    if (result.data === true) {
      dispatch(loginUser({ login, password }));
      dispatch(enqueueSnackbarSuccess("Pomyślnie zalogowano"));
    } else {
      dispatch(enqueueSnackbarError("Nieprawidłowy login lub hasło"));
    }
  } catch (error) {
    dispatch(enqueueSnackbarError("Nie udało się połączyć z serwerem."));
    console.error(error);
  }
};
