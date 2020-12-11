import React, {useCallback, useEffect, useState} from 'react';
import Mailbox from '../Mailbox';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {enqueueSnackbarError} from "../../redux/actions/notificationActions";

function LoggedInView() {
    const dispatch = useDispatch();
    // @ts-ignore
    const userReducer = useSelector(state => state.userReducer);
    const [mails, setMails] = useState([]);
    const [page, setPage] = useState(1);
    const loader = useCallback(node => {
        if (node !== null) {
            const options = {
                root: null,
                rootMargin: "20px",
                threshold: 1.0
            };
            const observer = new IntersectionObserver(handleObserver, options);
            if (node) {
                observer.observe(node);
            }
        }
    }, []);
    // const getDummyData = async () => {
    //     const result = await axios.get(process.env.PUBLIC_URL + '/dummy_data.json');
    //     return result.data;
    // }

    const apiUrl = process.env.REACT_APP_API_URL || 'https://krzysztofruczkowski.pl:2020/api';
    // const getAllUrl = `${apiUrl}/get_mails`;
    const inbox = "odbiorcza";
    // const amount = "5";
    const getAmountUrl = () => `${apiUrl}/inbox_page/${inbox}/${page}`;
    const getApiMails = async (login, password) => {
        let mails = null;
        try {
            const result = await axios.post(getAmountUrl(), {username: login, password: password});
            if(Array.isArray(result.data)) {
                mails = result.data;
                // mails.forEach((e, i) => e.id = i);
                return mails;
            } else {
                console.warn(result.data);
            }
        } catch (error) {
            console.error(error);
            dispatch(enqueueSnackbarError('Nie udało się pobrać maili.'))

        }
    };

    useEffect(() => {
        const setApiMails = async () => {
            let m = await getApiMails(userReducer.user.login, userReducer.user.password); //TODO: get mails for correct page
            if(!m || m.length === 0) {
                return;
            }
            m = mails.concat(m);
            m.forEach((e, i) => e.id = i);
            //TODO: get this^ from API
            setMails(m);
        };
        // noinspection JSIgnoredPromiseFromCall
        setApiMails();
    }, [page, userReducer.user.login, userReducer.user.password]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1)
        }
    }

    return (
        <div>
        <Mailbox mails={mails} loader={loader}/>
        </div>
    );

}

export default LoggedInView;
