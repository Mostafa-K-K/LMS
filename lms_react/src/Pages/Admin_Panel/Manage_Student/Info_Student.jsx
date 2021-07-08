import React, { useState, useEffect } from 'react';
import API from '../../../api';

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import TR from '../../../Components/TR';
import IN from '../../../Components/Input';

export default function Info_Classroom(props) {

    const id = props.match.params.id;

    const [state, updateState] = useState({
        fname: "",
        lname: "",
        fathername: "",
        mothername: "",
        gender: "",
        dateofbirth: "",
        email: "",
        pnumber: "",
        address: "",
        image: "",
        HealthProblems: "",
        bloodType: "",
        section_name: "",
        classroom_name: ""
    });

    const setState = (nextState) => {
        updateState(prevState => ({
            ...prevState,
            ...nextState
        }));
    }

    const fetchdata = async id => {

        await API.get(`stu-sec-class/${id}`)
            .then(res => {
                const result = res.data.data;
                setState(result);
            });
    }

    const deleteStudent = async id => {
        await API.delete(`student/${id}`);
        await props.history.push(`/student/list`);
    }

    const confirmDelete = id => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='divDelete'>
                        <span className="deleteSpan1">DELETE STUDENT</span>
                        <span className="deleteSpan2">Are you sure you want to delete this Student?</span>
                        <div className="deleteDivButtons">
                            <button
                                className="submitaddadmin"
                                onClick={onClose}
                            >Cancel</button>
                            <button
                                onClick={() => {
                                    deleteStudent(id);
                                    onClose();
                                }}
                                className="canceladdadmin"
                            > Delete </button>
                        </div>
                    </div>
                );
            }
        })
    }

    useEffect(() => {
        fetchdata(props.match.params.id);
    }, []);

    return (
        <div className="divaddadmin">
            <form>

                <div className="file-field">
                    <label for="file-input">
                        <img
                            src={`http://127.0.0.1:8000/api/image/${state.image}`}
                            alt=""
                            className="rounded-circle z-depth-1-half avatar-pic specpic"
                        />
                    </label>
                </div>

                <table className="tableCenterForm">
                    <TR
                        readOnly
                        description="ID"
                        type="text"
                        value={id}
                        placeholder="ID"

                    />

                    <TR
                        required
                        description="First Name"
                        type="text"
                        name="fname"
                        value={state.fname}
                        placeholder="First Name"

                    />
                    <TR
                        required
                        description="Father's Name"
                        type="text"
                        name="fathername"
                        value={state.fathername}
                        placeholder="Father's Name"

                    />
                    <TR
                        required
                        description="Last Name"
                        type="text"
                        name="lname"
                        value={state.lname}
                        placeholder="Last Name"

                    />
                    <TR
                        required
                        description="Mother's Name"
                        type="text"
                        name="mothername"
                        value={state.mothername}
                        placeholder="Mother's Name"
                    />
                    <TR
                        required
                        description="Gender"
                        type="text"
                        name="gender"
                        value={state.gender}
                        placeholder="Gender"
                    />
                    <TR
                        description="Date of Birth"
                        type="text"
                        placeholder="Date of Birth"
                        name="dateofbirth"
                        value={state.dateofbirth}
                    />
                    <TR
                        description="Email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={state.email}
                    />
                    <TR
                        description="Contact Number"
                        type="text"
                        placeholder="Contact Number"
                        name="pnumber"
                        value={state.pnumber}
                    />
                    <TR
                        description="Address"
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={state.address}
                    />
                    <TR
                        description="Health Problems"
                        type="text"
                        placeholder="Health Problems"
                        name="HealthProblems"
                        value={state.HealthProblems}
                    />
                    <TR
                        description="Blood Type"
                        type="text"
                        placeholder="Blood Type"
                        name="bloodType"
                        value={state.bloodType}
                    />
                    <TR
                        description="Classroom"
                        type="text"
                        placeholder="Classroom"
                        name="classroom"
                        value={state.classroom_name}
                    />
                    <TR
                        description="Section"
                        type="text"
                        placeholder="Section"
                        name="section"
                        value={state.section_name}
                    />
                </table>
                <div className="buttonsadmin">

                    <IN
                        type="button"
                        value="Delete"
                        onClick={() => confirmDelete(state.id)}
                        className="canceladdadmin topright2"
                    />

                    <IN
                        type="button"
                        value="Edit Profile"
                        onClick={() => props.history.push(`/student/edit/${state.id}`)}
                        className="submitaddadmin topright"
                    />

                </div>
            </form>
        </div>
    );
}