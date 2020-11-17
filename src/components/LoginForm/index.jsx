import React, {useState} from 'react';
import { useForm } from "react-hook-form";
// import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import {useDispatch} from 'react-redux'
import {checkLogin} from '../../actions/userActions'
import './index.sass';


function LoginForm() {
    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    // const apiUrl = 'https://krzysztofruczkowski.pl:2020/api';
    // const loginCheckUrl = `${apiUrl}/login_check`;


    // const checkLogin = async ({login, password}) => {
    //     try {
    //         setIsLoading(true);
    //         const result = await axios.post(loginCheckUrl, {username: login, password: password});
    //         return result.data;
    //     } catch (error) {
    //         console.error(error);
    //         return false;
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const onSubmit = async ({login, password}) => {
    //     const status = await checkLogin({login, password});
    //     console.log(status);
    //     if(status) console.log("Logged in " + login);
    //     else console.warn("Not logged in");
    // }
    const onSubmit = ({login, password}) => {
        dispatch(checkLogin(login, password));
    }

    return (
        <div className="relative-container">
            {isLoading ? <div className="loading-overlay"><LoadingSpinner size="70px"/></div> : null}
            <div className={"get-mails-container" + (isLoading ? " loading" : "")}>
                <form className="get-mails-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <input name="login" ref={register({ required: true })} />
                    </div>
                    {errors.login && <span className="error">Login wymagany</span>}
                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <input name="password" type="password" ref={register({ required: true })} />
                    </div>
                    {errors.password && <span className="error">Hasło wymagane</span>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkLogin: (login, password) => dispatch(checkLogin(login, password))
    }
}


export default LoginForm;
