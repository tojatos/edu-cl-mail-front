import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/index";
import App from "./components/App";
import { SnackbarProvider } from "notistack";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import "./index.sass";
import { blue, pink } from "@material-ui/core/colors";
import Notifier from "./components/Notifier";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import notificationReducer from "./redux/reducers/notificationReducer";
import BackgroundService from "./components/BackgroundService"

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: [notificationReducer],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

let persistor = persistStore(store);

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: blue,
    secondary: pink,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <App />
            <Notifier />
            <BackgroundService />
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
