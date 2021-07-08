import React from 'react';

export default function BT(props) {

    return (
        <button
            type={props.type}
            onClick={props.onClick}
        >
            {props.description}
        </button>
    );
}