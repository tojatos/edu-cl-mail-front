import React, {useState} from 'react';
import GetMailsForm from '../GetMailsForm';
import Mailbox from '../Mailbox';
import Footer from '../Footer';
import LoadingSpinner from '../LoadingSpinner';

function App() {
    const [mails, setMails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <GetMailsForm setMails={setMails} setIsLoading={setIsLoading}/>
            {isLoading ? <LoadingSpinner/> : (
            <div>
                {mails.length !== 0 ? <Mailbox mails={mails}/> : null}
            </div>
            )}
            <Footer/>
        </div>
    );
}

export default App;