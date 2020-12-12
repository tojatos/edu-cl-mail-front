import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbarError } from "../actions/notificationActions";
import { GET_INBOX_AMOUNT_URL } from "../../shared";

export const FETCH_STATES = {
  STARTING: "STARTING",
  INITIALIZED: "INITIALIZED",
  COMPLETED: "COMPLETED",
  AWAITING: "AWAITING",
};

const mailsSlice = createSlice({
  name: "mails",
  initialState: {
    fetchState: FETCH_STATES.STARTING,
    mails: {},
  },
  reducers: {
    addMails(state, action) {
      const { inbox, mails } = action.payload;
      if (state.fetchState === FETCH_STATES.STARTING) {
        if (!state.mails[inbox]) state.mails[inbox] = [];
        state.mails[inbox] = state.mails[inbox].concat(mails);
        state.mails[inbox].forEach((e, i) => (e.id = i));
        state.fetchState = FETCH_STATES.INITIALIZED;
      }
      //TODO: get this^ from API
    },
    cleanMails(state) {
      state.mails = {};
    },
  },
});

export const { addMails, cleanMails } = mailsSlice.actions;
export default mailsSlice.reducer;

export const getApiMails = (login, password, inbox) => async (dispatch) => {
  try {
    const result = await axios.post(GET_INBOX_AMOUNT_URL(inbox, 15), {
      username: login,
      password: password,
    });
    if (Array.isArray(result.data)) {
      let mails = result.data;
      dispatch(addMails({ inbox, mails }));
    } else {
      console.warn(result.data);
    }
  } catch (error) {
    console.error(error);
    dispatch(enqueueSnackbarError("Nie udało się pobrać maili."));
  }
};
