import React from 'react';
import './index.sass';
import moment from 'moment';
import 'moment/locale/pl'

moment.locale('pl')

const EmailListItem = ({ sender, title, priority, date, onClick, active }) =>
    <div className={"email-list-item" + (active ? " active" : "")} onClick={onClick}>
        <div className="top">
            <div>{title}</div>
            <div>{moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow()}</div>
        </div>
        <div className="bottom">
            <strong>{sender}</strong>
        </div>
    </div>;

export default EmailListItem;
