import React from 'react';
import EmailListItem from '../EmailListItem';
import './index.sass';

function EmailList({ mails, onClick, selectedMailId, loader }) {
    const mail_list = mails.map(mail =>
        <EmailListItem
            key={mail.id}
            active={mail.id === selectedMailId}
            {...mail}
            onClick={() => onClick(mail.id)} />)
    return (
        <div className="email-list">
            {mail_list}
            <div className="loading" ref={loader}>
                <h2>Load More</h2>
            </div>
        </div>
    );
}
export default EmailList;
