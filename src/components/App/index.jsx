import React, {useState} from 'react';
import GetMailsForm from '../GetMailsForm';
import Mailbox from '../Mailbox';
import Footer from '../Footer';
import './index.sass';

function App() {
    const [mails, setMails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="app">
            <div>
                <GetMailsForm setMails={setMails} setIsLoading={setIsLoading}/>
                <Mailbox mails={mails} isLoading={isLoading}/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
