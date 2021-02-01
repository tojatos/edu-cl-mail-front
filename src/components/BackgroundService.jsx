import {FETCH_STATES, getMailsAll, initializeInboxes, reloadMailsIfNew} from "../redux/slices/mailsSlice";
import {useCallback, useEffect} from "react";
import {INBOXES} from "../shared";
import {useDispatch, useSelector} from "react-redux";

export default function BackgroundService() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const mailData = useSelector((state) => state.mailData);
  const inbox = mailData.currentInbox;

  const notInitialized =
    !mailData.fetchStates[inbox] ||
    mailData.fetchStates[inbox] === FETCH_STATES.STARTING;

  useEffect(() => {
    if (notInitialized && userData.loggedIn) {
      dispatch(initializeInboxes(userData.user.login, userData.user.password));
    }
  }, [userData]);

  useEffect(() => {
    Object.values(INBOXES).forEach((i) => {
      if ([FETCH_STATES.INITIALIZED].includes(mailData.fetchStates[i])) {
        dispatch(
          reloadMailsIfNew(i, false)
        );
      }
    });
  }, [mailData.fetchStates]);

  const checkTimeout = 1000 * 60 * 5; //every 5 minutes
  const checkForNewMails = () => {
    if(!userData.loggedIn) return;
    Object.values(INBOXES).forEach((i) => {
      if ([FETCH_STATES.INITIALIZED, FETCH_STATES.COMPLETED].includes(mailData.fetchStates[i])) {
        dispatch(
          reloadMailsIfNew(i, false)
        );
      }
    });
  }
  const checkForNewMailsRepeatedly = () => {
    checkForNewMails();
    setTimeout(checkForNewMailsRepeatedly, checkTimeout);
  }

  useEffect(() => {
    checkForNewMailsRepeatedly();
  }, []);
  return null;
}
