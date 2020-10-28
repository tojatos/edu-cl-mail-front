import React from 'react';

function Email({title, sender, date, message}) {
    return (
        <div className="email">
            <dl>
                <dt>Sender</dt>
                <dd>{sender}</dd>

                <dt>Date</dt>
                <dd>{date}</dd>

                <dt>Title</dt>
                <dd>{title}</dd>
            </dl>
            <div className="body">
                {message}
            </div>
        </div>
    );
}

export default Email;