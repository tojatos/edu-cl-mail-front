import React from 'react';

function Email({title, sender, date, message}) {
    return (
        <div className="email">
            <dl>
                <dt>Nadawca</dt>
                <dd>{sender}</dd>

                <dt>Data</dt>
                <dd>{date}</dd>

                <dt>Tytuł</dt>
                <dd>{title}</dd>
            </dl>
            <div className="body" dangerouslySetInnerHTML={{__html: message.replace(/(?:\r\n|\r|\n)/g, '<br>')}}></div>
        </div>
    );
}

export default Email;