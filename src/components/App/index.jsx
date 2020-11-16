import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GetMailsForm from '../GetMailsForm';
import Mailbox from '../Mailbox';
import About from '../About';
import Navbar from '../Navbar';
import './index.sass';

function App() {
    const [mails, setMails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Router basename={process.env.PUBLIC_URL}>
        <div>
            <Switch>
            <Route path="/mailbox">
                <MainView>
                    <Mailbox mails={mails}/>
                </MainView>
            </Route>
            <Route path="/about">
                <MainView>
                    <About/>
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
            <div></div> {/* dummy div for flexbox center */}
        </div>
    );
}

export default App;
