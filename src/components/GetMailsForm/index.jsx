import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

function GetMailsForm({setMails, setIsLoading}) {
    const [amount, setAmount] = useState(30);
    const [shouldDownloadAll, setShouldDownloadAll] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async ({login, password}) => {
        setIsLoading(true);
        const url = shouldDownloadAll ? 'https://krzysztofruczkowski.pl:2020/api/get_mails' : `https://krzysztofruczkowski.pl:2020/api/get_mails/${amount}`;
        try {
            const result = await axios.post(url, {username: login, password: password});
            if(Array.isArray(result.data)) {
                let mails = result.data;
                mails.forEach((e, i) => e.id = i);
                setMails(mails)
            } else {
                console.warn(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const downloadAmount = () => {
        setShouldDownloadAll(false);
        handleSubmit();
    };

    const downloadAll = () => {
        setShouldDownloadAll(true);
        handleSubmit();
    };

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
            <div className="form-group">
                <label htmlFor="amount">Ilość maili (opcjonalnie)</label>
                <input name="amount" type="number" value={amount} onChange={e => setAmount(Math.max(e.target.value, 0))}/>
            </div>
            {errors.login && <span>Login wymagany</span>}
            {errors.password && <span>Hasło wymagane</span>}
            <button onClick={downloadAmount}>Pobierz maili: {amount}</button>
            <button onClick={downloadAll}>Pobierz wszystkie maile</button>
        </form>
    );
}

export default GetMailsForm;