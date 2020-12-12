import React from "react";
import EmailListItem from "../EmailListItem";
import { List, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    margin: "20px 0",
  },
  inline: {
    display: "inline",
  },
}));
function EmailList({ mails, onClick, selectedMailId }) {
  const classes = useStyles();
  const mail_list = mails.map((mail) => (
    <EmailListItem
      key={mail.id}
      active={mail.id === selectedMailId}
      {...mail}
      onClick={() => onClick(mail.id)}
    />
  ));
  return (
    <List className={classes.root} dense>
      {mail_list}
    </List>
  );
}
export default EmailList;
