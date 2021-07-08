import React, { useState } from 'react';
import API from '../../../api';

import IN from '../../../Components/Input';

export default function Create_Classroom(props) {

    const [name, setName] = useState("");

    const handleSave = async e => {
        e.preventDefault();
        let reqBody = { name: name };
        await API.post(`classroom`, reqBody);
        await props.history.push(`/classroom/list`);
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
                        value="Save"
                        className="submitaddadmin"
                    />
                </div>
            </form>
        </div>
    );
}