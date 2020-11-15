import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import GetMailsForm from '../GetMailsForm';
import Mailbox from '../Mailbox';
import Footer from '../Footer';
import Navbar from '../Navbar';
import './index.sass';

function App() {
    const [mails, setMails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Router>
        <div>
            <Switch>
            <Route path="/mailbox">
                <MainView>
                    <Mailbox mails={mails}/>
                </MainView>
            </Route>
            <Route path="/">
                <MainView>
                    <GetMailsForm setMails={setMails} isLoading={isLoading} setIsLoading={setIsLoading} />
                </MainView>
            </Route>
            </Switch>
        </div>
        </Router>
    );

}

function MainView({children}) {
    return (
        <div className="app">
            <Navbar />
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default App;
