import React, { useState, useContext } from 'react';
import API from '../../api';
import { setCookie } from '../../cookie';

import Slider from '../../Components/Slider';
import LoginComponent from '../../Components/LoginComponent';

import SessionContext from '../../Components/session/SessionContext';

import logo from '../../Images/Logo.png';

export default function Header() {

    const [state, updateState] = useState({
        username: "",
        password: "",
    });

    let { actions: { updateSession } } = useContext(SessionContext);

    const setState = (nextState) => {
        updateState(prevState => ({
            ...prevState,
            ...nextState
        }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await API.post('login', state)
                .then(res => {
                    const answer = res.data;
                    if (answer) {
                        setCookie('token', answer.access_token, 30);
                        setCookie('username', state.username, 30);
                        updateSession({ user: { ...answer, token: answer.access_token } });
                    } else {
                        updateState({ username: "", password: "" });
                    }
                });
        } catch (err) {
            console.log("ERROR", err);
        }
    }

    const handleChange = e => {
        let { name, value } = e.target;
        setState({ [name]: value });
    }

    return (
        // <div className="RowFlex">
        //     <LoginComponent
        //         typeButton="submit"
        //         nameButton="Login"
        //         onSubmit={handleLogin}
        //         classNameform="divloginflex"

        //         placeholderUser="Username"
        //         typeUser="text"
        //         nameUser="username"
        //         valueUser={state.username}

        //         placeholderPass="Password"
        //         typePass="password"
        //         namePass="password"
        //         valuePass={state.password}

        //         className="inputlogin"

        //         classNameButton="btnLoginL"
        //         onChange={handleChange}
        //     />
        // </div>

        <div class="container px-4 py-5 mx-auto">
            <div class="card card0">
                <div class="d-flex flex-lg-row flex-column-reverse">
                    <div class="card card1">
                        <div class="row justify-content-center my-auto">
                            <form onSubmit={handleLogin}>
                                <div class="col-md-8 col-10 my-5">
                                    <div class="row justify-content-center px-3 mb-3">  </div>
                                    <h3 class="mb-5 text-center heading">We are <b>B A AM</b></h3>
                                    <h6 class="msg-info">Please login to your account</h6>
                                    <div class="form-group">
                                        <label class="form-control-label text-muted">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={state.username}
                                            placeholder="Username"
                                            class="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-control-label text-muted">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={state.password}
                                            placeholder="Password"
                                            class="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div class="row justify-content-center my-3 px-3">
                                        <button
                                            type="submit"
                                            class="btn-block btn-color"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="card card2">
                        <div class="my-auto mx-md-5 px-md-5 right">
                            <img src={logo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}