import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

function GetMailsForm({setMails}) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async ({login, password}) => {
        try {
            const result = await axios.post('https://krzysztofruczkowski.pl:2020/api/get_mails', {username: login, password: password});
            if(Array.isArray(result.data)) {
                let mails = result.data;
                mails.forEach((e, i) => e.id = i);
                setMails(mails)
            } else {
                console.warn(result.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="get-mails-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="login">Login</label>
                <input name="login" ref={register({ required: true })} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Hasło</label>
                <input name="password" type="password" ref={register({ required: true })} />
            </div>
            {errors.login && <span>Login wymagany</span>}
            {errors.password && <span>Hasło wymagane</span>}
            <input type="submit" value="Pobierz maile" />
        </form>
    );
}

export default GetMailsForm;