import React from 'react';
import './index.sass';

const EmailListItem = ({ sender, title, priority, date, onClick }) =>
    <div className="email-list-item" onClick={onClick}>
        <div>{title}</div>
        <div>{sender}</div>
        <div>{date}</div>
        <div>{priority}</div>
    </div>;

export default EmailListItem;