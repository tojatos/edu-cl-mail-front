import React, { useEffect } from "react";
import Mailbox from "../Mailbox";
import { useDispatch, useSelector } from "react-redux";
import { getApiMails } from "../../redux/mails/mailsSlice";

function LoggedInView() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const mails = useSelector((state) => state.mailData.mails);
  // const [mails, setMails] = useState([]);
  const inbox = "odbiorcza";
  useEffect(() => {
    dispatch(getApiMails(userData.user.login, userData.user.password, inbox));
  }, [dispatch, userData.user.login, userData.user.password]);

  return (
    <div>
      <Mailbox mails={mails[inbox]} />
    </div>
  );
}

export default LoggedInView;
