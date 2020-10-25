import React from 'react';

const EmailListItem = ({ sender, title, priority, date, onClick }) =>
    <tr onClick={onClick}>
        <td>{sender}</td>
        <td>{title}</td>
        <td>{priority}</td>
        <td>{date}</td>
    </tr>;

export default EmailListItem;