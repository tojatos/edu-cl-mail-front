import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import GetMailsForm from '../GetMailsForm';
import LoginForm from '../LoginForm';
import Mailbox from '../Mailbox';
import About from '../About';
import Navbar from '../Navbar';
import './index.sass';
import { logUserOut } from '../../actions/userActions';

function App() {
    const [mails, setMails] = useState([]);
    const userReducer = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
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
                    { userReducer.loggedIn ?<button onClick={() => dispatch(logUserOut())}>Logout {userReducer.user.login}</button> : <LoginForm/> }
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
