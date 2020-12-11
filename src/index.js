import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/index';
import App from './components/App';
import { SnackbarProvider } from 'notistack';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import './index.sass';
import {blue, pink} from "@material-ui/core/colors";
import Notifier from "./components/Notifier";

const store = createStore(rootReducer, applyMiddleware(thunk))
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blue,
        secondary: pink,
    },
});

ReactDOM.render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
              <CssBaseline/>
              <App/>
              <Notifier/>
          </SnackbarProvider>
      </ThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);
