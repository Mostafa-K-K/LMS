import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../api';

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import Classroom_List from '../../../Components/Classrooms_List';

export default function List_Section(props) {

    const [sections, setSections] = useState([]);
    const [classroom_id, setClassroom] = useState("");

    const fetchdata = async () => {
        if (classroom_id && classroom_id !== "") {
            await API.get(`sec-by-class/${classroom_id}`)
                .then(res => {
                    const result = res.data.data;
                    setSections(result);
                });
        }
        else {
            await API.get(`sec-class`)
                .then(res => {
                    const result = res.data.data;
                    setSections(result);
                });
        }
    }

    const deleteSection = async id => {
        await API.delete(`section/${id}`);
        window.location.reload();
    }

    const confirmDelete = id => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='divDelete'>
                        <span className="deleteSpan1">DELETE SECTION</span>
                        <span className="deleteSpan2">Are you sure you want to delete this Section?</span>
                        <div className="deleteDivButtons">
                            <button
                                className="submitaddadmin"
                                onClick={onClose}
                            >Cancel</button>
                            <button
                                onClick={() => {
                                    deleteSection(id);
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
    }, [classroom_id]);
 
    return (
        <div className="container-lg">
            <div className="table-title">
                <div><h2 className="listadmintitle">LIST OF SECTIONS</h2></div>
                <button onClick={() => props.history.push('/section/create')} className="add-new"><i className="fa fa-plus"></i></button>
                <Classroom_List
                    className="filterClass"
                    onChange={e => setClassroom(e.target.value)}
                />
            </div>
            <div className="table-responsive">
                <div className="table-wrapper222">
                    <table className="table table-bordered">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Classroom</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sections.map(section =>
                                <tr key={section.id}>
                                    <td>{section.name}</td>
                                    <td>{section.classroom_name}</td>
                                    <td>
                                        <Link to={`/section/edit/${section.id}`} className="editAdmin">
                                            <i className="material-icons">&#xE254;</i>
                                        </Link>

                                        <Link to="/section/list" onClick={() => confirmDelete(section.id)} className="deleteAdmin">
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