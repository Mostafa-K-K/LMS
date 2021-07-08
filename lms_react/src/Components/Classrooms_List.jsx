import React, { useState, useEffect } from 'react';
import API from '../api';

export default function Classroom_List(props) {

    const [classrooms, setClassrooms] = useState([]);

    const fetchdata = async () => {
        await API.get(`classroom`)
            .then(res => {
                const result = res.data.data;
                setClassrooms(result);
            });
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div>
            <select
                name={props.name}
                onChange={props.onChange}
                className={props.className}
            >

                <option
                    value=""
                    selected={props.id === ""}
                >
                    Classroom
                </option>

                {classrooms.map(classroom => (
                    <option
                        key={classroom.id}
                        selected={props.id === classroom.id}
                        value={classroom.id}
                    >
                        {classroom.name}
                    </option>
                ))}

            </select >
        </div>
    );
}