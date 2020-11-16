import React, {useState} from 'react';
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import Select from 'react-select';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import './index.sass';

const inboxOptions = ['odbiorcza', 'nadawcza', 'robocza', 'usuniete'];
const inboxSelectOptions = inboxOptions.map(s => { return { value: s, label: s } });

function GetMailsForm({setMails, isLoading, setIsLoading}) {
    const [amount, setAmount] = useState(30);
    const [inbox, setInbox] = useState(inboxOptions[0]);
    const [shouldDownloadAll, setShouldDownloadAll] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    let history = useHistory();

    const apiUrl = 'https://krzysztofruczkowski.pl:2020/api';
    const getAllUrl = `${apiUrl}/get_mails`;
    const getAmountUrl = () => `${apiUrl}/inbox/${inbox}/${amount}`;

    const loadMails = async (getMails) => {
        setIsLoading(true);
        const mails = await getMails();
        if(mails) {
            setMails(mails);
            history.push('/mailbox')
        }
        setIsLoading(false);
    };

    const getDummyData = async () => {
        const result = await axios.get('dummy_data.json');
        return result.data;
    }


    const getApiMails = async (login, password) => {
        const url = shouldDownloadAll ? getAllUrl : getAmountUrl();
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

    const onDummySubmit = async () => loadMails(async () => await getDummyData());

    const downloadAmount = () => {
        setShouldDownloadAll(false);
    };

    const downloadAll = () => {
        setShouldDownloadAll(true);
    };

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
                            <Select
                                defaultValue={inboxSelectOptions[0]}
                                onChange={v => setInbox(v?.value)}
                                options={inboxSelectOptions}
                            />
                            <button onClick={downloadAmount}>Pobierz maili: {amount}</button>
                        </div>
                    </div>
                    <button onClick={downloadAll}>Pobierz wszystkie maile</button>
                </form>
                <div className="small-or">lub</div>
                <button type="button" onClick={onDummySubmit}>Pobierz testowe maile</button>
            </div>
        </div>
    );
}

export default GetMailsForm;
