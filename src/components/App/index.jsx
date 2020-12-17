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
  const userData = useSelector((state) => state.userData);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Switch>
          <Route path="/login">
            <MainView>
              {userData?.loggedIn ? <Redirect to="/" /> : <LoginForm />}
            </MainView>
          </Route>
          <Route path="/">
            <MainView>
              {userData?.loggedIn ? <LoggedInView /> : <About />}
            </MainView>
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
      <Container disableGutters>{children}</Container>
    </>
  );
}

export default App;
