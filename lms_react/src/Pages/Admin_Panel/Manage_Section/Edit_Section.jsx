import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../api';

import IN from '../../../Components/Input';

export default function Edit_Section(props) {

    const [name, setName] = useState("");
    const [classroom_name, setClassroomName] = useState("");

    const getSection = async id => {
        await API.get(`sec-class/${id}`)
            .then(res => {
                const result = res.data.data;
                setName(result.name);
                setClassroomName(result.classroom_name);
            });
    }

    const handleSave = async e => {
        e.preventDefault();
        const id = props.match.params.id;
        let reqBody = { name: name };
        await API.put(`section/${id}`, (reqBody));
        await props.history.push(`/section/list`);
    }

    useEffect(() => {
        getSection(props.match.params.id);
    }, []);

    return (
        <div className="divaddadmin">
            <form onSubmit={handleSave}>
                <label>Name</label>
                <IN
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="textaddadmin"
                    placeholder="Section Name"
                />
                <label>Classroom</label>
                <IN
                    readOnly
                    type="text"
                    name="classroom_name"
                    className="textaddadmin"
                    value={classroom_name}
                />
                <div className="buttonsadmin">
                    <IN
                        type="button"
                        value="Cancel"
                        onClick={() => props.history.push('/section/list')}
                        className="canceladdadmin"
                    />
                    <IN
                        type="submit"
                        value="Update"
                        className="submitaddadmin"
                    />
                </div>
            </form>
        </div>
    );
}