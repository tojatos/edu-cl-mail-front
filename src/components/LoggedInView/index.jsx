import React, {useEffect, useState} from 'react';
import Mailbox from '../Mailbox';
import axios from 'axios';
import './index.sass';
import { useSelector } from 'react-redux';

function LoggedInView() {
    // @ts-ignore
    const userReducer = useSelector(state => state.userReducer);
    const [mails, setMails] = useState([]);
    const getDummyData = async () => {
        const result = await axios.get(process.env.PUBLIC_URL + '/dummy_data.json');
        return result.data;
    }

    const apiUrl = 'https://krzysztofruczkowski.pl:2020/api';
    const getAllUrl = `${apiUrl}/get_mails`;
    const inbox = "odbiorcza";
    const amount = "5";
    const getAmountUrl = () => `${apiUrl}/inbox/${inbox}/${amount}`;
    const getApiMails = async (login, password) => {
        let mails = null;
        try {
            const result = await axios.post(getAmountUrl(), {username: login, password: password});
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
    useEffect(() => {
        // const setDummyMails = async () => {
        //     const m = await getDummyData();
        //     setMails(m);
        // };
        // setDummyMails();
        const setApiMails = async () => {
            const m = await getApiMails(userReducer.user.login, userReducer.user.password);
            setMails(m);
        };
        setApiMails();
    }, [])

    return (
        <div>
        <Mailbox mails={mails}/>
        </div>
    );

}

export default LoggedInView;
