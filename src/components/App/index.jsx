import React, {useState} from 'react';
import GetMailsForm from '../GetMailsForm';
import Mailbox from '../Mailbox';
import Footer from '../Footer';

function App() {
    const [mails, setMails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <GetMailsForm setMails={setMails} setIsLoading={setIsLoading}/>
            <Mailbox mails={mails} isLoading={isLoading}/>
            <Footer/>
        </div>
    );
}

export default App;