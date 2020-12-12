import React, { useEffect } from "react";
import Mailbox from "../Mailbox";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_STATES, getApiMails } from "../../redux/mails/mailsSlice";

function LoggedInView() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const mailData = useSelector((state) => state.mailData);
  // const [mails, setMails] = useState([]);
  const inbox = "odbiorcza";
  useEffect(() => {
    if (mailData.fetchState === FETCH_STATES.STARTING) {
      dispatch(getApiMails(userData.user.login, userData.user.password, inbox));
    }
    // TODO: other states
  }, [dispatch, userData.user.login, userData.user.password]);

  return (
    <div>
      <Mailbox mails={mailData.mails[inbox]} />
    </div>
  );
}

export default LoggedInView;
