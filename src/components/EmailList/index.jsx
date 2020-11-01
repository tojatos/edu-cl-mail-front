import React from 'react';
import EmailListItem from '../EmailListItem';
import './index.sass';

function EmailList({ mails, onClick }) {
    const mail_list = mails.map(mail =>
        <EmailListItem
            key={mail.id}
            {...mail}
            onClick={() => onClick(mail.id)} />)
    return (
        <div className="email-list">
            <header>
                <div>Temat</div>
                <div>Nadawca</div>
                <div>Data</div>
                <div>Priorytet</div>
            </header>
            <div className="body">
                {mail_list}
            </div>
        </div>
    );
}
export default EmailList;
