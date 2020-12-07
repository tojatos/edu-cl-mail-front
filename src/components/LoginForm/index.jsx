import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import LoadingSpinner from '../LoadingSpinner';
import {useDispatch} from 'react-redux'
import {checkLogin} from '../../actions/userActions'
import './index.sass';


function LoginForm() {
    const { register, handleSubmit, errors } = useForm();
    const [isLoading] = useState(false);

    const dispatch = useDispatch()

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

export default LoginForm;
