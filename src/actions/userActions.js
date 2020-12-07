import axios from 'axios';
import {NotificationManager} from 'react-notifications';

const apiUrl = process.env.REACT_APP_API_URL || 'https://krzysztofruczkowski.pl:2020/api';
const loginCheckUrl = `${apiUrl}/login_check`;

// Action Creators

const setUser = (payload) => ({ type: "SET_USER", payload})

export const logUserOut = () => ({type: "LOG_OUT"})

// Methods

export const checkLogin = (login, password) => async dispatch => {
    try {
        const result = await axios.post(loginCheckUrl, {username: login, password: password});

        if(result.data) {
            NotificationManager.success('Pomyślnie zalogowano');
            dispatch(setUser({login, password}));
        }
        else {
            NotificationManager.error('Nieprawidłowy login lub hasło', 'Nie udało się zalogować');
        }
    } catch (error) {
        NotificationManager.error('Nie udało się połączyć z serwerem.');
        console.error(error);
    }
};
