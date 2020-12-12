import React from "react";
import Mailbox from "../Mailbox";
import { useSelector } from "react-redux";

function LoggedInView() {
  const inbox = useSelector((state) => state.mailData.currentInbox);
  return <Mailbox inbox={inbox} />;
}

export default LoggedInView;
