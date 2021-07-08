import React from 'react';
import { scalePoint } from 'd3-scale';
import { curveCatmullRom, line } from 'd3-shape';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, Title, Legend } from '@devexpress/dx-react-chart-bootstrap4';

export default function Line_Chart(props) {

    const Line = props => (
        <LineSeries.Path
            {...props}
            path={line()
                .x(({ arg }) => arg)
                .y(({ val }) => val)
                .curve(curveCatmullRom)}
        />
    );

    const Text = (props) => {
        const { text } = props;
        const [mainText, subText] = text.split('\\n');
        return (
            <div className="w-100 text-center mb-2">
                <h3>
                    {mainText}
                </h3>
                <p>{subText}</p>
            </div>
        );
    };

    const Root = props => (
        <Legend.Root
            {...props}
            className="m-auto flex-row"
        />
    );

    const Item = props => (
        <Legend.Item
            {...props}
            className="flex-column-reverse"
        />
    );

    const Label = props => (
        <Legend.Label
            {...props}
            className="pb-2"
        />
    );


    const data = [
        { month: 'Jan', Absent: 101, Present: 103, Late: 70 },
        { month: 'Feb', Absent: 89, Present: 150, Late: 110 },
        { month: 'Mar', Absent: 107, Present: 200, Late: 80 },
        { month: 'Apr', Absent: 113, Present: 307, Late: 134 },
        { month: 'May', Absent: 105, Present: 201, Late: 93 },
        { month: 'Jun', Absent: 91, Present: 220, Late: 80 },
        { month: 'Jul', Absent: 110, Present: 203, Late: 70 },
        { month: 'Aug', Absent: 111, Present: 205, Late: 160 },
        { month: 'Sep', Absent: 112, Present: 207, Late: 150 },
        { month: 'Oct', Absent: 111, Present: 300, Late: 140 },
        { month: 'Nov', Absent: 120, Present: 305, Late: 120 },
        { month: 'Dec', Absent: 160, Present: 305, Late: 30 },
    ];

    return (
        <div className="card">
            <Chart
                data={data}
                className="pr-4"
            >
                <ArgumentScale factory={scalePoint} />
                <ArgumentAxis />
                <ValueAxis />

                <LineSeries
                    name="Present"
                    valueField="Present"
                    argumentField="month"
                    color="#47b5ff"
                    seriesComponent={Line}
                />
                <LineSeries
                    name="Late"
                    valueField="Late"
                    argumentField="month"
                    color="#c4c4c4"
                    seriesComponent={Line}
                />
                <LineSeries
                    name="Absent"
                    valueField="Absent"
                    argumentField="month"
                    color="#7a7a7a"
                    seriesComponent={Line}
                />

                <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                <Title
                    text="Statistics of Attendance in 2021"
                    textComponent={Text}
                />
                <Animation />
            </Chart>
        </div>
    )
}