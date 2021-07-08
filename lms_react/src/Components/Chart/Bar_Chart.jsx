import React, { useState, useEffect } from 'react';
import API from '../../api';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Title, Legend } from '@devexpress/dx-react-chart-bootstrap4';

export default function Bar_Chart(props) {

    const Root = props => (
        <Legend.Root
            {...props}
            className="m-auto flex-row"
        />
    );

    // const [data, setData] = useState({ status: 'attendance', });
    const [loading, setLoading] = useState(false);

    // const getData = async reqBody => {
    //     await API.post(`chart`, reqBody)
    //         .then(async res => {
    //             const result = res.data.data;
    //             let newData = data;
    //             result.map(val => {
    //                 newData[val.description] = val.value;
    //             })
    //             setData([newData]);
    //             setLoading(false);
    //         });
    // }

    // useEffect(() => {
    //     getData(props.reqBody);
    // }, [JSON.stringify(props.reqBody)]);

    const data = [{
        status: 'attendance',
        Present: 1,
        Absent: 1,
        Late: 3,
    }];

    return (loading) ? <div /> : (
        <div className="card">
            <Chart
                data={data}
            >
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                    name="Present"
                    valueField="Present"
                    argumentField="status"
                    color="#47b5ff"
                />
                <BarSeries
                    name="Late"
                    valueField="Late"
                    argumentField="status"
                    color="#c4c4c4"
                />
                <BarSeries
                    name="Absent"
                    valueField="Absent"
                    argumentField="status"
                    color="#7a7a7a"
                />
                <Animation />
                <Legend position="bottom" rootComponent={Root} />
                <Title text="Statistics Attendance" />
                <Stack />
            </Chart>
        </div>
    )
}