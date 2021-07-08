import React from 'react';

export default function Attendance(props) {
    return (
        <div>
            <div><h2 className="listadmintitle">LIST OF STUDENTS</h2></div>
            <div className="flexflowdiv">
                <button
                    onClick={() => props.history.push('/attendance/old')}
                    className="old-list-attendance"
                >
                    Old Attendance
                </button>

                <button
                    onClick={() => props.history.push('/attendance/today')}
                    className="add-new-attendance"
                >
                    Today Attendance
                </button>

                <button
                    onClick={() => props.history.push('/statistics/total')}
                    className="add-new-attendance"
                >
                    Statistics Attendance
                </button>

            </div>
        </div>
    )
}