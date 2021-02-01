import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import {
  GET_INBOX_ALL_URL,
  GET_INBOX_AMOUNT_URL,
  GET_NUM_MAILS_URL,
  INBOXES,
  INITIAL_MAIL_AMOUNT,
} from "../../shared";
import {
  enqueueSnackbarError,
  enqueueSnackbarInfo,
  enqueueSnackbarSuccess,
} from "../actions/notificationActions";

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
    awaitRequest(state, action) {
      const inbox = action.payload;
      state.fetchStates[inbox] = FETCH_STATES.AWAITING;
    },
    noNewMails(state, action) {
      const inbox = action.payload;
      if ([FETCH_STATES.STARTING, FETCH_STATES.AWAITING].includes(state.fetchStates[inbox]))
        state.fetchStates[inbox] = FETCH_STATES.COMPLETED;
    },
    appendMails(state, action) {
      const { inbox, mails } = action.payload;
      state.mails[inbox] = mails.concat(state.mails[inbox])
      state.mails[inbox].forEach((e, i) => (e.id = i));
      //TODO: get this^ from API
      state.fetchStates[inbox] = FETCH_STATES.COMPLETED;
    },
  },
});

export const {
  initMails,
  cleanMails,
  setAllMails,
  setCurrentInbox,
  awaitRequest,
  noNewMails,
  appendMails,
} = mailsSlice.actions;
export default mailsSlice.reducer;

export const initializeInboxes = (login, password) => async (dispatch) => {
  Object.values(INBOXES).forEach((i) => {
    dispatch(getMailsInitial(login, password, i));
    // dispatch(getMailsAll(login, password, i));
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
  }
};
// export const getMailsAll = (login, password, inbox) => async (dispatch) => {
//   try {
//     const result = await axios.post(GET_INBOX_ALL_URL(inbox), {
//       username: login,
//       password: password,
//     });
//     if (Array.isArray(result.data)) {
//       let mails = result.data;
//       dispatch(setAllMails({ inbox, mails }));
//     } else {
//       console.warn(result.data);
//     }
//   } catch (error) {
//     console.warn(error);
//   }
// };

export const getAndAppendMails = (login, password, inbox, amount) => async (dispatch) => {
  try {
    const result = await axios.post(
      GET_INBOX_AMOUNT_URL(inbox, amount),
      {
        username: login,
        password: password,
      }
    );
    if (Array.isArray(result.data)) {
      let mails = result.data;
      dispatch(appendMails({ inbox, mails }));
    } else {
      console.warn(result.data);
    }
  } catch (error) {
    console.warn(error);
  }
};

export const reloadMailsIfNew = (
  inbox,
  notify=true
) => async (dispatch, getState) => {
  try {
    const login = getState().userData.user.login;
    const password = getState().userData.user.password;
    const currentMailCount = getState().mailData.mails[inbox]?.length || 0;
    dispatch(awaitRequest(inbox));
    const result = await axios.post(GET_NUM_MAILS_URL(inbox), {
      username: login,
      password: password,
    });
    const mailCount = result.data;
    if (mailCount <= currentMailCount) {
      if(notify) dispatch(enqueueSnackbarInfo("Nie ma nowych maili"));
      dispatch(noNewMails(inbox));
    } else {
      if(notify) dispatch(enqueueSnackbarSuccess("Znaleziono nowe maile, pobieranie..."));
      dispatch(getAndAppendMails(login, password, inbox, mailCount - currentMailCount));
    }
  } catch (error) {
    if(notify) dispatch(enqueueSnackbarError("Błąd w połączeniu z serwerem"));
    dispatch(noNewMails(inbox));
    console.warn(error);
  }
};
