import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './index.sass';

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
    };

    const downloadAll = () => {
        setShouldDownloadAll(true);
    };

    const setDummyData = async () => {
        setIsLoading(true);
        const result = await axios.get('dummy_data.json');
        setMails(result.data);
        setIsLoading(false);
    }

    return (
        <div className="get-mails-container">
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
                    <div className="form-group">
                        <label htmlFor="amount">Ilość maili</label>
                        <div className="input-button-group">
                            <input size="1" name="amount" type="number" value={amount} onChange={e => setAmount(Math.max(e.target.value, 0))}/>
                            <button onClick={downloadAmount}>Pobierz maili: {amount}</button>
                        </div>
                    </div>
                <button onClick={downloadAll}>Pobierz wszystkie maile</button>
            </form>
            <div className="small-or">lub</div>
            <button type="button" onClick={setDummyData}>Pobierz testowe maile</button>
        </div>
    );
}

export default GetMailsForm;