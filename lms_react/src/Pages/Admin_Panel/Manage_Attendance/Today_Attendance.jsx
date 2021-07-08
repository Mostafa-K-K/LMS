import React, { useState, useEffect } from 'react';
import API from '../../../api';

import Attendance_List from '../../../Components/Attendance_List';
import Classroom_List from '../../../Components/Classrooms_List';
import Classroom_Section from '../../../Components/Classroom_Section';

export default function Today_Attendance() {

    const [state, updateState] = useState({
        students: [],
        classroom_id: "",
        section_id: "",
        attendance: {},
        showSubmit: false,
        nameSubmit: "Take Attendance"
    });

    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1);
    var day = today.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var date = year + '-' + month + '-' + day;

    const filter = {
        section_id: state.section_id,
        classroom_id: state.classroom_id,
    };

    const fetchdata = async () => {

        setState({ attendance: {} });

        await API.post(`stu-sec-class`)
            .then(res => {
                const result = res.data.data;
                const data = result.filter(s => s.section_id == state.section_id);
                if (data) {
                    data.map(s => {
                        const attendance = state.attendance;
                        attendance[s.id] = "Present";
                        setState({ attendance: attendance });
                    });
                }
                setState({ students: data });
            });

        await API.get(`attendance`)
            .then(res => {
                const result = res.data.data;
                const update = result.filter(a =>
                    (a.created_at.slice(0, 10) == date && a.section_id == state.section_id)
                );
                if (update && update.length) {
                    update.map(s => {
                        const attendance = state.attendance;
                        attendance[s.student_id] = s.description;
                        setState({ attendance: attendance });
                    });

                    setState({ nameSubmit: "Update Attendance" });
                } else { setState({ nameSubmit: "Take Attendance" }); }
            });

        if (state.classroom_id == "") setState({ section_id: "" });
        checkSubmit();
    }

    const checkSubmit = () => {
        (state.section_id != "") ? setState({ showSubmit: true }) : setState({ showSubmit: false });
    }

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

    const changeDescription = (key, val) => {
        const attendance = state.attendance;
        attendance[key] = val;
        setState({ attendance: attendance });
    }

    const submitAttendance = async () => {

        const updateFunction = async (update) => {
            for (let i = 0; i < state.students.length; i++) {
                let student = state.students[i];
                let key = student.id;
                let reqBody = {
                    description: state.attendance[key],
                    section_id: state.section_id,
                    student_id: key
                }
                let att = update.find(a => a.student_id == key);
                let id = att.id;

                await API.put(`attendance/${id}`, reqBody);
            }
        }

        const createFunction = async () => {
            state.students.map(async (student) => {
                let key = student.id;
                let reqBody = {
                    description: state.attendance[key],
                    section_id: state.section_id,
                    student_id: key
                }
                await API.post(`attendance`, reqBody);
            });
        }

        await API.get(`attendance`)
            .then(res => {
                const result = res.data.data;
                const update = result.filter(a =>
                    (a.created_at.slice(0, 10) == date && a.section_id == state.section_id)
                );
                if (update && update.length) {
                    updateFunction(update);
                } else {
                    createFunction();
                    setState({ nameSubmit: "Update Attendance" });
                }
            });
    }

    useEffect(() => {
        fetchdata();
    }, [JSON.stringify(filter)]);

    return (
        <div>
            <div className="divrowselect searchAttend">
                <div className="helloclass">
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
                <input
                    type="button"
                    value={state.nameSubmit}
                    onClick={submitAttendance}
                    style={{ display: state.showSubmit ? 'block' : 'none' }}
                    className="filterClass absolutsubmitbutton"
                />
            </div>
            <div className="table-responsive">
                <div className="table-wrapper222">
                    <table className="table table-bordered tableatten">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Attendance</th>
                            </tr>
                        </thead>

                        <tbody>
                            {state.students.map(student =>
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.fname} {student.lname}</td>
                                    <td>{student.classroom_name} {student.section_name}</td>
                                    <td>
                                        <Attendance_List
                                            name="attendance"
                                            // value={state.attendance.key}
                                            id={state.attendance[student.id]}
                                            className="filterClass"
                                            onChange={e => { return changeDescription(student.id, e.target.value) }}
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}