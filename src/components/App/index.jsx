import React, {useState} from 'react';
import GetMailsForm from '../GetMailsForm';
import Mailbox from '../Mailbox';
import axios from 'axios';
import Footer from '../Footer';
import LoadingSpinner from '../LoadingSpinner';

function App() {
    const [mails, setMails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const setDummyData = async () => {
        setIsLoading(true);
        const result = await axios.get('dummy_data.json');
        setMails(result.data);
        setIsLoading(false);
    }

    return (
        <div>
            {isLoading ? <LoadingSpinner/> : (
            <div>
                <GetMailsForm setMails={setMails} setIsLoading={setIsLoading}/>
                <button onClick={setDummyData}>Pobierz dummy</button>
                {mails.length !== 0 ? <Mailbox mails={mails}/> : null}
            </div>
            )}
            <Footer/>
        </div>
    );
}

export default App;