import React, { useState, useEffect } from 'react';
import API from '../../../api';

import Classroom_Section from '../../../Components/Classroom_Section';
import Classroom_List from '../../../Components/Classrooms_List';
import IN from '../../../Components/Input';

export default function Today_Attendance() {

    const [state, updateState] = useState({
        attendances: [],
        name: "",
        classroom_id: "",
        section_id: "",
        date: ""
    });

    const reqBody = {
        fname: state.name,
        classroom_id: state.classroom_id,
        section_id: state.section_id,
        created_at: state.date
    };

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

    const fetchdata = async () => {
        await API.get(`att-stu-sec-class`)
            .then(res => {
                let result = res.data.data;

                if (state.name != "") {
                    result = result.filter(r =>
                        (((r.fname + " " + r.lname).slice(0, state.name.length)).toLowerCase() == (state.name).toLowerCase())
                        ||
                        ((r.lname.slice(0, state.name.length)).toLowerCase() == (state.name).toLowerCase())
                    );
                }
                if (state.classroom_id != "") {
                    result = result.filter(r => r.classroom_id == state.classroom_id);
                }
                if (state.section_id != "") {
                    result = result.filter(r => r.section_id == state.section_id);
                }
                if (state.date != "") {
                    result = result.filter(r => r.created_at.slice(0, 10) == state.date);
                }

                setState({ attendances: result });
            });
    }

    useEffect(() => {
        fetchdata();
    }, [JSON.stringify(reqBody)]);

    return (
        <div className="container-lg">
            <div className="table-title">
                <div><h2 className="listadmintitle">LIST OF Attendance</h2></div>
            </div>
            <div className="divFilterS">
                <div>
                    <IN
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        placeholder="Search"
                        className="inputSearchSpan"
                    />
                    <span className="searchspan">
                        <i className="fa fa-search"></i>
                    </span>
                </div>

                <div className="divrowselect">
                    <Classroom_List
                        name="classroom_id"
                        id={state.classroom_id}
                        onChange={handleChange}
                        className="filterClass"
                    />

                    <Classroom_Section
                        name="section_id"
                        id={state.classroom_id}
                        idsec={state.section_id}
                        onChange={handleChange}
                        className="filterClass"
                    />
                </div>
                <IN
                    type="date"
                    value={state.date}
                    name="date"
                    onChange={handleChange}
                    className="dateSearch"
                />

            </div>
            <div className="table-responsive">
                <div className="table-wrapper333">
                    <table className="table table-bordered tableatten">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Date</th>
                                <th>Attendance</th>
                            </tr>
                        </thead>

                        <tbody>
                            {state.attendances.map(attendance =>
                                <tr key={attendance.id}>
                                    <td>{attendance.student_id}</td>
                                    <td>{attendance.fname} {attendance.lname}</td>
                                    <td>{attendance.classroom_name} {attendance.section_name}</td>
                                    <td>{attendance.created_at.slice(0, 10)}</td>
                                    <td>{attendance.description}</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}