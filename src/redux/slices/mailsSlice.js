import axios from "axios";
import {createSlice} from "@reduxjs/toolkit";
import {GET_MAIL_RANGE_URL, GET_NUM_MAILS_URL, INBOXES,} from "../../shared";
import {enqueueSnackbarError, enqueueSnackbarInfo, enqueueSnackbarSuccess,} from "../actions/notificationActions";

const _ = require('lodash');

export const FETCH_STATES = {
  STARTING: "STARTING",
  // INITIALIZED: "INITIALIZED",
  COMPLETED: "COMPLETED",
  AWAITING: "AWAITING",
};

const mailsSlice = createSlice({
  name: "mails",
  initialState: {
    currentInbox: INBOXES.ODBIORCZA,
    fetchStates: {},
    mails: {},
    mailCount: {},
  },
  reducers: {
    // initMails(state, action) {
    //   const { inbox, mails } = action.payload;
    //   if (!state.fetchStates[inbox])
    //     state.fetchStates[inbox] = FETCH_STATES.STARTING;
    //   if (state.fetchStates[inbox] === FETCH_STATES.STARTING) {
    //     if (!state.mails[inbox]) state.mails[inbox] = [];
    //     state.mails[inbox] = mails;
    //     state.mails[inbox].forEach((e, i) => (e.id = i));
    //     //TODO: get this^ from API
    //
    //     state.fetchStates[inbox] = FETCH_STATES.INITIALIZED;
    //     // if every inbox is fetched
    //     // if (Object.values(INBOXES).every((i) => state.mails[i]))
    //   }
    // },
    // setAllMails(state, action) {
    //   const { inbox, mails } = action.payload;
    //   if (!state.mails[inbox]) state.mails[inbox] = [];
    //   state.mails[inbox] = mails;
    //   state.mails[inbox].forEach((e, i) => (e.id = i));
    //   //TODO: get this^ from API
    //
    //   state.fetchStates[inbox] = FETCH_STATES.COMPLETED;
    // },
    setCurrentInbox(state, action) {
      state.currentInbox = action.payload;
    },
    cleanMails(state) {
      state.mails = {};
      state.mailCount = {};
    },
    setMailCount(state, action) {
      const { inbox, mailCount } = action.payload;
      state.mailCount[inbox] = mailCount;
    },
    awaitRequest(state, action) {
      const inbox = action.payload;
      state.fetchStates[inbox] = FETCH_STATES.AWAITING;
    },
    setStarting(state, action) {
      const inbox = action.payload;
      state.fetchStates[inbox] = FETCH_STATES.STARTING;
    },
    noNewMails(state, action) {
      const inbox = action.payload;
      if ([FETCH_STATES.STARTING, FETCH_STATES.AWAITING].includes(state.fetchStates[inbox]))
        state.fetchStates[inbox] = FETCH_STATES.COMPLETED;
    },
    appendMails(state, action) {
      const { inbox, mails } = action.payload;
      if(!inbox || !mails) return;
      if (state.mails[inbox]) {
        const mailsThatDoNotExistAlready = mails.filter(m => !state.mails[inbox].some(x => x.id === m.id));
        // console.log(`mails: ${mailsThatDoNotExistAlready}`);

        console.log(_.orderBy(state.mails[inbox].concat(mailsThatDoNotExistAlready), ['id'], ['desc']));
        state.mails[inbox] = _.orderBy(state.mails[inbox].concat(mailsThatDoNotExistAlready), ['id'], ['desc']);
      } else {
        console.log(_.orderBy(mails, ['id'], ['desc']));
        state.mails[inbox] = _.orderBy(mails, ['id'], ['desc']);

      }

      if(state.mails[inbox].length >= state.mailCount[inbox]) {
        state.fetchStates[inbox] = FETCH_STATES.COMPLETED;
      }
    },
  },
});

export const {
  // initMails,
  cleanMails,
  setStarting,
  // setAllMails,
  setMailCount,
  setCurrentInbox,
  awaitRequest,
  noNewMails,
  appendMails,
} = mailsSlice.actions;
export default mailsSlice.reducer;

export const initializeInboxes = () => async (dispatch) => {
  Object.values(INBOXES).forEach((i) => {
    dispatch(getMailsInitial(i));
    // dispatch(getMailsAll(login, password, i));
  });
};

export const getMailsInitial = (inbox) => async (dispatch, getState) => {
  dispatch(setStarting(inbox));
  const login = getState().userData.user.login;
  const password = getState().userData.user.password;
  const currentMailCount = getState().mailData.mails[inbox]?.length || 0;
  const mailCount = await getMailCount(login, password, inbox);
  dispatch(setMailCount({inbox, mailCount}));
  // const rangesCount = Math.floor(mailCount / 5) + 1;
  const mailsToFetchAtOnce = 10;
  const ranges = _.range(0, mailCount - currentMailCount, mailsToFetchAtOnce).map(x => [x, x+mailsToFetchAtOnce - 1]).reverse()
  // console.log("ranges: " + ranges);

  // ranges.map(async r => await getMailRange())

  // dispatch(appendMails({ inbox, mails }));
  for (const r of ranges) {
    let mails = await getMailRange(login, password, inbox, r[0], r[1])
    dispatch(appendMails({ inbox, mails }));
  }


  // try {
  //   const result = await axios.post(
  //     GET_MAIL_RANGE_URL(inbox, 0, 4),
  //     {
  //       username: login,
  //       password: password,
  //     }
  //   );
  //   if (Array.isArray(result.data)) {
  //     let mails = result.data;
  //     // console.log(mails);
  //     dispatch(appendMails({ inbox, mails }));
  //   } else {
  //     console.warn(result.data);
  //   }
  // } catch (error) {
  //   console.warn(error);
  // }
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

// export const getAndAppendMails = (login, password, inbox, amount) => async (dispatch) => {
//   try {
//     const result = await axios.post(
//       GET_INBOX_AMOUNT_URL(inbox, amount),
//       {
//         username: login,
//         password: password,
//       }
//     );
//     if (Array.isArray(result.data)) {
//       let mails = result.data;
//       dispatch(appendMails({ inbox, mails }));
//     } else {
//       console.warn(result.data);
//     }
//   } catch (error) {
//     console.warn(error);
//   }
// };

export const downloadNewMails = (inbox) => async (dispatch, getState) => {
  const login = getState().userData.user.login;
  const password = getState().userData.user.password;
  const mailCount = getState().mailData.mailCount[inbox];
  const currentMailCount = getState().mailData.mails[inbox]?.length || 0;
  try {
    const result = await axios.post(
      GET_MAIL_RANGE_URL(inbox, currentMailCount, mailCount),
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


const getMailCount = async (login, password, inbox) => {
  const result = await axios.post(GET_NUM_MAILS_URL(inbox), {
    username: login,
    password: password,
  });
  return result.data["numberOfMails"];
}

const getMailRange = async (login, password, inbox, from, to) => {
  try {
    const result = await axios.post(
      GET_MAIL_RANGE_URL(inbox, from, to),
      {
        username: login,
        password: password,
      }
    );
    if (Array.isArray(result.data)) {
      return result.data;
    } else {
      console.warn(result.data);
    }
  } catch (error) {
    console.warn(error);
  }
}


export const reloadMailsIfNew = (
  inbox,
  notify=true
) => async (dispatch, getState) => {
  try {
    const login = getState().userData.user.login;
    const password = getState().userData.user.password;
    const currentMailCount = getState().mailData.mails[inbox]?.length || 0;
    dispatch(awaitRequest(inbox));
    // const result = await axios.post(GET_NUM_MAILS_URL(inbox), {
    //   username: login,
    //   password: password,
    // });
    // const mailCount = result.data;
    const mailCount = await getMailCount(login, password, inbox);
    dispatch(setMailCount({ inbox, mailCount }));
    if (mailCount <= currentMailCount) {
      if(notify) dispatch(enqueueSnackbarInfo("Nie ma nowych maili"));
      dispatch(noNewMails(inbox));
    } else {
      if(notify) dispatch(enqueueSnackbarSuccess("Znaleziono nowe maile, pobieranie..."));
      // dispatch(getAndAppendMails(login, password, inbox, mailCount - currentMailCount));
      dispatch(downloadNewMails(inbox));
    }
  } catch (error) {
    if(notify) dispatch(enqueueSnackbarError("Błąd w połączeniu z serwerem"));
    dispatch(noNewMails(inbox));
    console.warn(error);
  }
};
