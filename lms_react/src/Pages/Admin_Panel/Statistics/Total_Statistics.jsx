import React, { useState } from 'react';

import Bar_Chart from '../../../Components/Chart/Bar_Chart';
import Area_Chart from '../../../Components/Chart/Area_Chart';
import Line_Chart from '../../../Components/Chart/Line_Chart';

import Classroom_Section from '../../../Components/Classroom_Section';
import Classroom_List from '../../../Components/Classrooms_List';
import IN from '../../../Components/Input';

export default function Total_Statistics() {

    const [state, updateState] = useState({
        classroom_id: "",
        section_id: "",
        date: "",
        chart: "Bar"
    });

    const reqBody = {
        section_id: state.section_id,
        created_at: state.date
    };

    const setState = (nextState) => {
        updateState(prevState => ({
            ...prevState,
            ...nextState
        }));
    }

    const handleChange = e => {
        let { name, value } = e.target;
        setState({ [name]: value });
    }

    return (
        <div>
            <div className="divFilterS">

                <div className="divrowselect">
                    <Classroom_List
                        name="classroom_id"
                        id={state.classroom_id}
                        onChange={handleChange}
                        className="filterClass"
                    />
                    <Classroom_Section
                        name="section_id"
                        id={state.classroom_id}
                        idsec={state.section_id}
                        onChange={handleChange}
                        className="filterClass"
                    />
                </div>

                <IN
                    type="date"
                    value={state.date}
                    name="date"
                    onChange={handleChange}
                    className="dateSearch"
                />

                <select
                    name="chart"
                    className="filterClass"
                    onChange={handleChange}
                >
                    <option value="Bar">Bar</option>
                    <option value="Line">Line</option>
                    <option value="Area">Area</option>
                </select>

            </div>

            {
                (state.chart == "Bar") ? (
                    <Bar_Chart
                        reqBody={reqBody}
                    />
                ) : ((state.chart == "Area") ? (
                    <Area_Chart
                        reqBody={reqBody}
                    />
                ) : (
                    <Line_Chart
                        reqBody={reqBody}
                    />
                ))
            }
        </div >
    )
}
