import React from 'react';
import EmailListItem from '../EmailListItem';
import './index.sass';
import {List, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
function EmailList({ mails, onClick, selectedMailId, loader }) {
    const classes = useStyles();
    const mail_list = mails.map(mail =>
        <EmailListItem
            key={mail.id}
            active={mail.id === selectedMailId}
            {...mail}
            onClick={() => onClick(mail.id)} />)
    return (
        <List className={classes.root} dense>
            {mail_list}
            <div className="loading" ref={loader}>
                <h2>Load More</h2>
            </div>
        </List>
    );
}
export default EmailList;
