import React, { useEffect } from "react";
import Mailbox from "../Mailbox";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_STATES,
  getMailsAll,
  initializeInboxes,
} from "../../redux/mails/mailsSlice";
import { Backdrop, CircularProgress } from "@material-ui/core";

function LoggedInView() {
  const inbox = "odbiorcza";
  return (
    <>
      <Mailbox inbox={inbox} />
    </>
  );
}

export default LoggedInView;
