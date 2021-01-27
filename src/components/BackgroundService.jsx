import {FETCH_STATES, getMailsAll, initializeInboxes} from "../redux/slices/mailsSlice";
import {useEffect} from "react";
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
  return null;
}
