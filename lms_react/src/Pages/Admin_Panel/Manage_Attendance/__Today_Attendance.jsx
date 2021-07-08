import React, { useEffect, useState } from 'react';
import API from '../../../api';

import Attendance_List from '../../../Components/Attendance_List';
import Classroom_Section from '../../../Components/Classroom_Section';
import Classroom_List from '../../../Components/Classrooms_List';

export default function Old_Attendance() {

    const [state, updateState] = useState({
        students: [],
        classroom_id: "",
        section_id: "",
        showButton: false,
        descriptionAttendance: {}
        // descriptionAttendance = { 1: "present", 2: "absent", 3: "late" }
    });

    let reqBody = {
        classroom_id: state.classroom_id,
        section_id: state.section_id
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

    const submitfunction = async () => {

        // var today = new Date();
        // var year = today.getFullYear();

        // var month = (today.getMonth() + 1);
        // if (month < 10) month = "0" + month;//if 1 => 01   and 10 =>10

        // var day = today.getDate();
        // if (day < 10) day = "0" + day;//if 6 => 06

        // var date = year + '-' + month + '-' + day;

        var date = "2021-06-30";

        const createFunction = async () => {
            for (let i = 0; i < state.students.length; i++) {
                let student = state.students[i];

                let datainsert = {
                    student_id: student.id,
                    section_id: student.section_id,
                    description: state.descriptionAttendance[student.id]
                }
                await API.post('attendance', datainsert);
            }
        }

        const updateFunction = async (update) => {
            for (let i = 0; i < update.length; i++) {
                let attend = update[i];

                let datainsert = {
                    description: state.descriptionAttendance[attend.student_id]
                }
                await API.put(`attendance/${attend.id}`, datainsert);
            }
        }

        await API.get('attendance')
            .then(res => {
                const result = res.data.data;
                const update = result.filter(att => (
                    (att.section_id == state.section_id)
                    &&
                    ((att.created_at).slice(0, 10) == date))
                );
                if (update.length) {
                    updateFunction(update);
                }
                else {
                    createFunction();
                }
            });
    }

    const changeDescription = async (id, val) => {
        let object = state.descriptionAttendance;
        object[id] = val;
        setState({ descriptionAttendance: object })
        console.log(object);
    }


    const getData = async () => {

        var date = "2021-06-30";

        await API.post(`stu-sec-class`)
            .then(res => {
                let result = res.data.data;
                let data = result.filter(a => a.section_id == state.section_id);
                setState({ students: data });
                data.map(student => {
                    let dataAttendance = state.descriptionAttendance;//{}
                    dataAttendance[student.id] = "Present"; //{student1:"Present",student2:"Present"}
                    setState({ descriptionAttendance: dataAttendance });
                });
                console.log(state.descriptionAttendance);

                if (data.length) setState({ showButton: true });
                if (state.section_id == "") setState({ showButton: false });
            })

        await API.get('attendance')
            .then(res => {
                let result = res.data.data;
                let data = result.filter(att =>
                    (att.section_id == state.section_id)
                    &&
                    ((att.created_at).slice(0, 10) == date));
                if (data.length) {
                    data.map(attend => {
                        let dataAttendance = state.descriptionAttendance;
                        dataAttendance[attend.student_id] = attend.description;
                        setState({ descriptionAttendance: dataAttendance });
                    });
                }
            })

        if (state.classroom_id == "") setState({ section_id: "" });//tsfir l section bas safer l classroom ta y5tfo l student
    }

    useEffect(() => {
        getData();
    }, [JSON.stringify(reqBody)]);

    return (
        <div className="container-lg">
            <div className="table-title">
                <div><h2 className="listadmintitle">LIST OF Attendance</h2></div>
            </div>
            <div className="divFilterS">

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
                    <input
                        type="button"
                        value="submit"
                        onClick={submitfunction}
                        style={{ display: state.showButton ? "block" : "none" }}
                    />
                </div>

            </div>
            <div className="table-responsive">
                <div className="table-wrapper333">
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
                                <tr>
                                    <td>{student.id}</td>
                                    <td>{student.fname} {student.lname}</td>
                                    <td>{student.classroom_name} {student.section_name}</td>
                                    <td>
                                        <Attendance_List
                                            name="attendance"
                                            id={state.descriptionAttendance[student.id]}
                                            onChange={(e) => { return changeDescription(student.id, e.target.value) }}
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