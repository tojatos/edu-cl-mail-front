import React from "react";
import Mailbox from "../Mailbox";
import { useSelector } from "react-redux";

function LoggedInView() {
  const inbox = useSelector((state) => state.mailData.currentInbox);
  return <Mailbox inbox={inbox} key={inbox} />; // use the key to reset state of component on change in navigation
}

export default LoggedInView;
