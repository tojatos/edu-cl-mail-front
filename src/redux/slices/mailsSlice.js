import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import {
  GET_INBOX_ALL_URL,
  GET_INBOX_AMOUNT_URL,
  INBOXES,
  INITIAL_MAIL_AMOUNT,
} from "../../shared";

export const FETCH_STATES = {
  STARTING: "STARTING",
  INITIALIZED: "INITIALIZED",
  COMPLETED: "COMPLETED",
  AWAITING: "AWAITING",
};

const mailsSlice = createSlice({
  name: "mails",
  initialState: {
    currentInbox: INBOXES.ODBIORCZA,
    fetchStates: {},
    mails: {},
  },
  reducers: {
    initMails(state, action) {
      const { inbox, mails } = action.payload;
      if (!state.fetchStates[inbox])
        state.fetchStates[inbox] = FETCH_STATES.STARTING;
      if (state.fetchStates[inbox] === FETCH_STATES.STARTING) {
        if (!state.mails[inbox]) state.mails[inbox] = [];
        state.mails[inbox] = mails;
        state.mails[inbox].forEach((e, i) => (e.id = i));
        //TODO: get this^ from API

        state.fetchStates[inbox] = FETCH_STATES.INITIALIZED;
        // if every inbox is fetched
        // if (Object.values(INBOXES).every((i) => state.mails[i]))
      }
    },
    setAllMails(state, action) {
      const { inbox, mails } = action.payload;
      if (!state.mails[inbox]) state.mails[inbox] = [];
      state.mails[inbox] = mails;
      state.mails[inbox].forEach((e, i) => (e.id = i));
      //TODO: get this^ from API

      state.fetchStates[inbox] = FETCH_STATES.COMPLETED;
    },
    setCurrentInbox(state, action) {
      state.currentInbox = action.payload;
    },
    cleanMails(state) {
      state.mails = {};
    },
  },
});

export const {
  initMails,
  cleanMails,
  setAllMails,
  setCurrentInbox,
} = mailsSlice.actions;
export default mailsSlice.reducer;

export const initializeInboxes = (login, password) => async (dispatch) => {
  Object.values(INBOXES).forEach((i) => {
    dispatch(getMailsInitial(login, password, i));
    dispatch(getMailsAll(login, password, i));
  });
};
export const getMailsInitial = (login, password, inbox) => async (dispatch) => {
  try {
    const result = await axios.post(
      GET_INBOX_AMOUNT_URL(inbox, INITIAL_MAIL_AMOUNT),
      {
        username: login,
        password: password,
      }
    );
    if (Array.isArray(result.data)) {
      let mails = result.data;
      dispatch(initMails({ inbox, mails }));
    } else {
      console.warn(result.data);
    }
  } catch (error) {
    console.warn(error);
    // dispatch(
    //   enqueueSnackbarError("Nie udało się pobrać maili ze skrzynki " + inbox)
    // );
  }
};
export const getMailsAll = (login, password, inbox) => async (dispatch) => {
  try {
    const result = await axios.post(GET_INBOX_ALL_URL(inbox), {
      username: login,
      password: password,
    });
    if (Array.isArray(result.data)) {
      let mails = result.data;
      dispatch(setAllMails({ inbox, mails }));
    } else {
      console.warn(result.data);
    }
  } catch (error) {
    console.warn(error);
    // dispatch(
    //   enqueueSnackbarError("Nie udało się pobrać maili ze skrzynki " + inbox)
    // );
  }
};
