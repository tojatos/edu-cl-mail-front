import axios from 'axios';

const apiUrl = 'https://krzysztofruczkowski.pl:2020/api';
const loginCheckUrl = `${apiUrl}/login_check`;

// Action Creators

const setUser = (payload) => ({ type: "SET_USER", payload})

export const logUserOut = () => ({type: "LOG_OUT"})

// Methods

export const checkLogin = (login, password) => async dispatch => {
    let credentialsCorrect = false;
    try {
        const result = await axios.post(loginCheckUrl, {username: login, password: password});
        credentialsCorrect = result.data;
    } catch (error) {
        console.error(error);
    }
    if(credentialsCorrect) {
        dispatch(setUser({login, password}));
    }
};
