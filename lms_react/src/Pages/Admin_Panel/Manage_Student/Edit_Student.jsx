import React, { useState, useEffect } from 'react';
import API from '../../../api';

import Unknown from '../../../Images/Unknown_person.jpg';

import TR from '../../../Components/TR';
import IN from '../../../Components/Input';
import Blood_List from '../../../Components/Blood_List';
import Gender_Radio from '../../../Components/Gender_Radio';
import Classroom_List from '../../../Components/Classrooms_List';
import Classroom_Section from '../../../Components/Classroom_Section';

export default function Info_Classroom(props) {

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
        section_id: "",
        classroom_id: ""
    });

    const setState = (nextState) => {
        updateState(prevState => ({
            ...prevState,
            ...nextState
        }));
    }

    const handleChange = e => {
        let { name, value } = e.target;
        setState({ [name]: value });
        console.log(state);
    }

    const fetchdata = async (id) => {
        await API.get(`stu-sec-class/${id}`)
            .then(res => {
                const result = res.data.data;
                setState(result);
            });
    }

    const updateStudent = async e => {
        e.preventDefault();
        const id = props.match.params.id;
        let reqBody = state;
        console.log(reqBody);
        await API.put(`student/${id}`, reqBody);
        await props.history.push(`/student/list`);
    }

    useEffect(() => {
        fetchdata(props.match.params.id);
    }, []);

    const changeImage = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        createImage(files[0]);
    }

    const createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            setState({ image: e.target.result });
        };
        reader.readAsDataURL(file);
    }

    return (
        <div>
            <div className="divaddadmin">
                <form onSubmit={updateStudent}>

                    <div className="file-field">
                        <label for="file-input">
                            <img
                                src={`http://127.0.0.1:8000/api/image/${state.image}`}
                                alt=""
                                className="rounded-circle z-depth-1-half avatar-pic specpic"
                            />
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            onChange={changeImage}
                        />
                    </div>

                    <table className="tableCenterForm">
                        <TR
                            required
                            description="First Name"
                            type="text"
                            name="fname"
                            value={state.fname}
                            placeholder="First Name"
                            onChange={handleChange}
                        />
                        <TR
                            required
                            description="Father's Name"
                            type="text"
                            name="fathername"
                            value={state.fathername}
                            placeholder="Father's Name"
                            onChange={handleChange}
                        />
                        <TR
                            required
                            description="Last Name"
                            type="text"
                            name="lname"
                            value={state.lname}
                            placeholder="Last Name"
                            onChange={handleChange}
                        />
                        <TR
                            required
                            description="Mother's Name"
                            type="text"
                            name="mothername"
                            value={state.mothername}
                            placeholder="Mother's Name"
                            onChange={handleChange}
                        />
                        <tr>
                            <td><label>Gender</label></td>
                            <td>
                                <Gender_Radio
                                    name="gender"
                                    check={state.gender}
                                    onChange={handleChange}
                                    className="malefemalename"
                                    classFlexRadio="classFlexRadio"
                                />
                            </td>
                        </tr>
                        <TR
                            description="Date of Birth"
                            type="date"
                            placeholder="Date of Birth"
                            name="dateofbirth"
                            value={state.dateofbirth}
                            onChange={handleChange}
                        />
                        <TR
                            description="Email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                        />
                        <TR
                            description="Contact Number"
                            type="text"
                            placeholder="Contact Number"
                            name="pnumber"
                            value={state.pnumber}
                            onChange={handleChange}
                        />
                        <TR
                            description="Address"
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={state.address}
                            onChange={handleChange}
                        />
                        <TR
                            description="Health Problems"
                            type="text"
                            placeholder="Health Problems"
                            name="HealthProblems"
                            value={state.HealthProblems}
                            onChange={handleChange}
                        />
                        <tr>
                            <td><label>Blood Type</label></td>
                            <td>
                                <Blood_List
                                    name="bloodType"
                                    className="textaddadmin"
                                    id={state.bloodType}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Classroom</label></td>
                            <td>
                                <Classroom_List
                                    name="classroom_id"
                                    className="textaddadmin"
                                    id={state.classroom_id}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Section</label></td>
                            <td>
                                <Classroom_Section
                                    name="section_id"
                                    className="textaddadmin"
                                    id={state.classroom_id}
                                    idsec={state.section_id}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </table>

                    <div className="buttonsadmin">
                        <IN
                            type="button"
                            value="Cancel"
                            onClick={() => props.history.push(`/student/info/${props.match.params.id}`)}
                            className="canceladdadmin"
                        />
                        <IN
                            type="submit"
                            value="Save"
                            className="submitaddadmin"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}