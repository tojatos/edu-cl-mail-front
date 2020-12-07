import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import App from './components/App';
import './reset.sass';
import './index.sass';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from "react-notifications";

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App/>
    <NotificationContainer/>
  </Provider>
  ,
  document.getElementById('root')
);
