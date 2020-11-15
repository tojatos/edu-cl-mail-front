import React, {useState} from 'react';
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import './index.sass';

function GetMailsForm({setMails, isLoading, setIsLoading}) {
    const [amount, setAmount] = useState(30);
    const [shouldDownloadAll, setShouldDownloadAll] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    let history = useHistory();

    const loadMails = async (getMails) => {
        setIsLoading(true);
        const mails = await getMails();
        if(mails) {
            setMails(mails);
            history.push('/mailbox')
        }
        setIsLoading(false);
    };

    const getApiMails = async (login, password) => {
        const url = shouldDownloadAll ? 'https://krzysztofruczkowski.pl:2020/api/get_mails' : `https://krzysztofruczkowski.pl:2020/api/get_mails/${amount}`;
        let mails = null;
        try {
            const result = await axios.post(url, {username: login, password: password});
            if(Array.isArray(result.data)) {
                mails = result.data;
                mails.forEach((e, i) => e.id = i);
            } else {
                console.warn(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            return mails;
        }
    };

    const onSubmit = async ({login, password}) => {
        loadMails(async () => await getApiMails(login, password));
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
        history.push('/mailbox')
        setIsLoading(false);
    }
    // if (isLoading) return <div className="get-mails-container"><LoadingSpinner /></div>;
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
                        <div className="form-group">
                            <label htmlFor="amount">Liczba maili</label>
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
        </div>
    );
}

export default GetMailsForm;
