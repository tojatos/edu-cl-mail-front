import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import App from './components/App';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from "react-notifications";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import './index.sass';

const store = createStore(rootReducer, applyMiddleware(thunk))
const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

ReactDOM.render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App/>
          <NotificationContainer/>
      </ThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);
