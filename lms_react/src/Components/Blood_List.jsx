import React from 'react';

export default function Blood_List(props) {

    const bloodTypes = [
        "A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-",
    ];

    return (
        <select
            name={props.name}
            onChange={props.onChange}
            className={props.className}
        >

            <option
                value={null}
            >
                Blood Type
            </option>

            {bloodTypes.map(blood => (
                <option
                    key={blood}
                    selected={props.id === blood}
                    name={blood}
                    value={blood}
                >
                    {blood}
                </option>
            ))}

        </select>
    );
}