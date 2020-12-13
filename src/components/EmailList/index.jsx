import React from "react";
import EmailListItem from "../EmailListItem";
import { makeStyles } from "@material-ui/core";
import { FixedSizeList } from "react-window";

const itemHeight = 60;

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
  const renderRow = (props) => {
    const { index, style } = props;
    const mail = mails[index];
    return (
      <EmailListItem
        style={style}
        key={mail.id}
        active={mail.id === selectedMailId}
        {...mail}
        onClick={() => onClick(mail.id)}
      />
    );
  };
  return (
    <div className={classes.root}>
      <FixedSizeList
        height={Math.min(800, itemHeight * mails.length)}
        width="100%"
        itemSize={itemHeight}
        itemCount={mails.length}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
}

export default EmailList;
