import React, { useState, useEffect, useContext } from 'react';
import SessionContext from './SessionContext';
import { getCookie } from '../../cookie';
import API from '../../api';

export default function SessionProvider({ children }) {

    const [state, setValue] = useState({
        user: {
            username: getCookie('username'),
            token: getCookie('token')
        }
    });

    function updateSession(nextState) {
        setValue(prevState => ({
            ...prevState, ...nextState
        }));
    }

    async function initializeUser() {
        let token = getCookie('token');
        let username = getCookie('username');

        if (token && username) {
            await API.post(`getadmin`, state.user)
                .then(res => {
                    const data = res.data.data;
                    updateSession({ user: { ...data, token: data.remember_token } });
                });
        }
    }

    useEffect(() => {
        initializeUser()
    }, [])

    let context = { state, actions: { updateSession } }

    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )
}