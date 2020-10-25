import React from 'react';
import EmailListItem from '../EmailListItem';

function EmailList({mails}) {
    const mail_list = mails.map(mail =>
    <EmailListItem {...mail} />)
    return <table>
            <thead>
                <tr>
                    <th>Temat</th>
                    <th>Tytuł</th>
                    <th>Priorytet</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {mail_list}
            </tbody>
        </table>;
}

export default EmailList;