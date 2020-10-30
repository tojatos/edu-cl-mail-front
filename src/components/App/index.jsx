import React, {useState} from 'react';
import GetMailsForm from '../GetMailsForm';
import Mailbox from '../Mailbox';
import axios from 'axios';

function App() {
    const [mails, setMails] = useState([]);
    const setDummyData = async () => {
        const result = await axios.get('dummy_data.json');
        setMails(result.data);
    }


    return (
        <div>
            <GetMailsForm setMails={setMails}/>
            <button onClick={setDummyData}>Pobierz dummy</button>
            {mails.length !== 0 ? <Mailbox mails={mails}/> : null}
        </div>
    );
}

export default App;