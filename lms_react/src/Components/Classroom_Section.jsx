import React, { useState, useEffect } from 'react';
import API from '../api';

export default function Classroom_Section(props) {

    const [sections, setSections] = useState([]);
    const id = props.id;

    const fetchdata = async id => {
        await API.get(`classroomsection/${id}`)
            .then(res => {
                const result = res.data.data;
                setSections(result);
            });
    }

    useEffect(() => {
        fetchdata(id);
    }, [id]);

    return (
        <div>
            <select
                id={props.id}
                name={props.name}
                onChange={props.onChange}
                className={props.className}
            >

                <option
                    value=""
                    selected={props.id === ""}
                >
                    Section
                </option>

                {sections.map(section => (
                    <option
                        selected={props.idsec === section.id}
                        key={section.id}
                        value={section.id}
                    >
                        {section.name}
                    </option>
                ))}

            </select>
        </div>
    );
}