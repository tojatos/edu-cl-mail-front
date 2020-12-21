import React, { useEffect } from "react";
import Mailbox from "../Mailbox";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_STATES,
  getMailsAll,
  initializeInboxes,
} from "../../redux/slices/mailsSlice";
import { INBOXES } from "../../shared";

function LoggedInView() {
  const dispatch = useDispatch();
  const mailData = useSelector((state) => state.mailData);
  const userData = useSelector((state) => state.userData);
  const inbox = mailData.currentInbox;

  const notInitialized =
    !mailData.fetchStates[inbox] ||
    mailData.fetchStates[inbox] === FETCH_STATES.STARTING;

  useEffect(() => {
    if (notInitialized) {
      dispatch(initializeInboxes(userData.user.login, userData.user.password));
    }
    Object.values(INBOXES).forEach((i) => {
      if (mailData.fetchStates[i] !== FETCH_STATES.COMPLETED) {
        dispatch(getMailsAll(userData.user.login, userData.user.password, i));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Mailbox inbox={inbox} key={inbox} />; // use the key to reset state of component on change in navigation
}

export default LoggedInView;
