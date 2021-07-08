import React, { useState, useEffect } from 'react';

import Line_Chart from '../../Components/Chart/Line_Chart';
import Area_Chart from '../../Components/Chart/Area_Chart';

import API from '../../api';

export default function Admin_Panel() {

    const [classrooms, setClassrooms] = useState([]);
    const [sections, setSections] = useState([]);

    const fetchClassroom = async () => {
        await API.get(`classroom`)
            .then(res => {
                const result = res.data.data;
                setClassrooms(result);
            });
    }

    const fetchSection = async () => {
        await API.get(`sec-class`)
            .then(res => {
                const result = res.data.data;
                setSections(result);
            });
    }

    useEffect(() => {
        fetchClassroom();
        fetchSection();
    }, []);
    return (
        <div>
            <table className="tableDataView">
                <tr>
                    <td><b>Classroom</b></td>
                    <td><b>Section</b></td>
                </tr>
                {classrooms.map(c =>
                    <tr>
                        <td>{c.name}</td>
                        <td>
                            {sections
                                .filter(section => section.classroom_id == c.id)
                                .map(s => <span>{s.name} &nbsp; &nbsp;</span>)
                            }
                        </td>
                    </tr>
                )}
            </table>
            <div className="RowFlex">
                <Line_Chart />
                <Area_Chart />
            </div>
        </div>
    );
}