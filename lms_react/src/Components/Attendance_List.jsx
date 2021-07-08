import React from 'react';

export default function Attendance_List(props) {

    const attendances = ["Present", "Absent", "Late"];

    return (
        <select
            name={props.name}
            onChange={props.onChange}
            className={props.className}
        >

            {attendances.map(attendance => (
                <option
                    key={attendance}
                    selected={props.id === attendance}
                    value={attendance}
                >
                    {attendance}
                </option>
            ))}

        </select>
    );
}