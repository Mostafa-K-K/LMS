import React, { useState } from 'react';
import API from '../../../api';

import Unknown from '../../../Images/Unknown_person.jpg';

import TR from '../../../Components/TR';
import IN from '../../../Components/Input';
import Blood_List from '../../../Components/Blood_List';
import Gender_Radio from '../../../Components/Gender_Radio';
import Classroom_List from '../../../Components/Classrooms_List';
import Classroom_Section from '../../../Components/Classroom_Section';

export default function Create_Student(props) {

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
        section_name: "",
        classroom_id: "",
        classroom_name: "",
        profile: Unknown
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
    }

    const handleSave = async e => {
        e.preventDefault();
        let reqBody = state;
        await API.post(`student`, reqBody);
        await props.history.push(`/student/list`);
    }

    const changeImage = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        createImage(files[0]);
    }

    const createImage = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setState({ image: e.target.result });
            setState({ profile: e.target.result });
        };
    }

    return (
        <div className="divaddadmin">
            <form onSubmit={handleSave}>

                <div className="file-field">
                    <label for="file-input">
                        <img
                            src={state.profile}
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
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </table>

                <div className="buttonsadmin">
                    <IN
                        type="button"
                        value="Cancel"
                        onClick={() => props.history.push('/student/list')}
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
    );
}