import React from 'react';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';

export default function Pie_Chart_Draw(props) {

    const data = [
        { region: 'Asia', val: 4119626293, color: "#47b5ff" },
        { region: 'Africa', val: 1012956064, color: "#c4c4c4" },
        { region: 'Northern America', val: 344124520, color: "#7a7a7a" },
    ];

    return (
        <div className="card">
            <Chart
                data={data}
            >
                <PieSeries
                    valueField="val"
                    argumentField="region"
                    innerRadius={0.6}
                    background-Color="color"
                />
                <Title
                    text="The Population of Continents and Regions"
                />
                <Animation />
            </Chart>
        </div>
    )
}