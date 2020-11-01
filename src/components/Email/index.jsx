import React from 'react';
import './index.sass';

function Email({title, sender, date, message}) {
    return (
        <div className="email">
            <div className="info">
                <div className="info-group">
                    <div>Nadawca:</div>
                    <div>{sender}</div>
                </div>
                <div className="info-group">
                    <div>Data:</div>
                    <div>{date}</div>
                </div>
                <div className="info-group">
                    <div>Tytuł:</div>
                    <div>{title}</div>
                </div>
            </div>
            <div className="body" dangerouslySetInnerHTML={{__html: message.replace(/(?:\r\n|\r|\n)/g, '<br>')}}></div>
        </div>
    );
}

export default Email;
