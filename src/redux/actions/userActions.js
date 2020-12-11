import axios from 'axios';
import {enqueueSnackbarError, enqueueSnackbarSuccess} from "./notificationActions";

const apiUrl = process.env.REACT_APP_API_URL || 'https://krzysztofruczkowski.pl:2020/api';
const loginCheckUrl = `${apiUrl}/login_check`;

// Action Creators

const setUser = (payload) => ({ type: "SET_USER", payload})

export const logUserOut = () => ({type: "LOG_OUT"})

// Methods

export const checkLogin = (login, password) => async dispatch => {
    try {
        const result = await axios.post(loginCheckUrl, {username: login, password: password});

        if(result.data === true) {
            dispatch(setUser({login, password}));
            dispatch(enqueueSnackbarSuccess('Pomyślnie zalogowano'));
        }
        else {
            console.log(enqueueSnackbarSuccess('Pomyślnie zalogowano'));
            dispatch(enqueueSnackbarError('Nieprawidłowy login lub hasło'));
        }
    } catch (error) {
        dispatch(enqueueSnackbarError('Nie udało się połączyć z serwerem.'));
        console.error(error);
    }
};
