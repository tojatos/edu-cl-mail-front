import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginForm from "../LoginForm";
import LoggedInView from "../LoggedInView";
import About from "../About";
import Navbar from "../Navbar";
import { Container } from "@material-ui/core";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Switch>
          <Route path="/login">
            <MainView>
              {user.loggedIn ? <Redirect to="/" /> : <LoginForm />}
            </MainView>
          </Route>
          <Route path="/">
            <MainView>{user.loggedIn ? <LoggedInView /> : <About />}</MainView>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function MainView({ children }) {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
}

export default App;
