import React, {useState} from 'react';
import GetMailsForm from '../GetMailsForm';
import Mailbox from '../Mailbox';

function App() {
    const [mails, setMails] = useState([]);

    return (
        <div>
            <GetMailsForm setMails={setMails}/>
            {mails.length !== 0 ? <Mailbox mails={mails}/> : null}
        </div>
    );
}

export default App;