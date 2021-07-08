import React from "react"

export default function LoginComponent(props) {

    return (
        <div className={props.classNamediv}>
            <form onSubmit={props.onSubmit} className={props.classNameform}>
                <input
                    placeholder={props.placeholderUser}
                    type={props.typeUser}
                    name={props.nameUser}
                    value={props.valueUser}
                    onChange={props.onChange}
                    className={props.className}
                />
                <input
                    placeholder={props.placeholderPass}
                    type={props.typePass}
                    name={props.namePass}
                    value={props.valuePass}
                    onChange={props.onChange}
                    className={props.className}
                />
                <button
                    type={props.typeButton}
                    className={props.classNameButton}
                >
                    {props.nameButton}
                </button>
            </form>
        </div>
    );
}