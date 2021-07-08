import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../api';

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function List_Classroom(props) {

    const [classrooms, setClassrooms] = useState([]);

    const fetchdata = async () => {
        await API.get(`classroom`)
            .then(res => {
                const result = res.data.data;
                setClassrooms(result);
            });
    }

    const deleteClassroom = async id => {
        await API.delete(`classroom/${id}`);
        window.location.reload();
    }

    const confirmDelete = id => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='divDelete'>
                        <span className="deleteSpan1">DELETE CLASSROOM</span>
                        <span className="deleteSpan2">Are you sure you want to delete this Classroom?</span>
                        <div className="deleteDivButtons">
                            <button
                                className="submitaddadmin"
                                onClick={onClose}
                            >Cancel</button>
                            <button
                                onClick={() => {
                                    deleteClassroom(id);
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
        fetchdata();
    }, []);

    return (
        <div className="container-lg">
            <div className="table-title">
                <div><h2 className="listadmintitle">LIST OF CLASSROOMS</h2></div>
                <button onClick={() => props.history.push('/classroom/create')} className="add-new"><i className="fa fa-plus"></i></button>
            </div>
            <div className="table-responsive">
                <div className="table-wrapper222">
                    <table className="table table-bordered">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {classrooms.map(classroom =>
                                <tr key={classroom.id}>
                                    <td>{classroom.name}</td>
                                    <td>
                                        <Link to={`/classroom/edit/${classroom.id}`} className="editAdmin">
                                            <i className="material-icons">&#xE254;</i>
                                        </Link>

                                        <Link to="/classroom/list" onClick={() => confirmDelete(classroom.id)} className="deleteAdmin">
                                            <i className="material-icons">&#xE872;</i>
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}