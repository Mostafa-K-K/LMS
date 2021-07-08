import React, { useState } from 'react';
import API from '../../../api';

import IN from '../../../Components/Input';
import Classroom_List from '../../../Components/Classrooms_List';

export default function Create_Section(props) {

    const [name, setName] = useState("");
    const [classroom_id, setClassroom] = useState("");

    const handleSave = async e => {
        e.preventDefault();

        let reqBody = {
            name: name,
            classroom_id: classroom_id
        };

        await API.get('section')
            .then(res => {
                const result = res.data.data;
            })

        await API.post(`section`, reqBody);
        await props.history.push(`/section/list`);
    }

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
                <Classroom_List
                    className="textaddadmin"
                    onChange={e => setClassroom(e.target.value)}
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
                        value="Save"
                        className="submitaddadmin"
                    />
                </div>
            </form>
        </div>
    );
}