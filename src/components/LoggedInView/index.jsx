import React from "react";
import Mailbox from "../Mailbox";
import {useSelector} from "react-redux";

function LoggedInView() {
  const mailData = useSelector((state) => state.mailData);
  const inbox = mailData.currentInbox;

  return <Mailbox inbox={inbox} key={inbox} />; // use the key to reset state of component on change in navigation
}

export default LoggedInView;
