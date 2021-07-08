import React, { useState, useEffect } from 'react';
import API from '../../../api';

import IN from '../../../Components/Input';

export default function Edit_Classroom(props) {

    const [name, setName] = useState("");

    const getClassroom = async id => {
        await API.get(`classroom/${id}`)
            .then(res => {
                const result = res.data.data; 
                setName(result.name);
            });
    }

    const handleSave = async e => {
        e.preventDefault();
        const id = props.match.params.id;
        let reqBody = { name: name };
        await API.put(`classroom/${id}`, reqBody);
        await props.history.push(`/classroom/list`);
    }

    useEffect(() => {
        getClassroom(props.match.params.id);
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
                    placeholder="Classroom Name"
                />
                <div className="buttonsadmin">
                    <IN
                        type="button"
                        value="Cancel"
                        onClick={() => props.history.push('/classroom/list')}
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