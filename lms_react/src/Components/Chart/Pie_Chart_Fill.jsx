import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

export default function Pie_Chart_Fill(props) {

    const data = [
        { country: 'Russia', area: 12, color: "#47b5ff" },
        { country: 'Canada', area: 7, color: "#c4c4c4" },
        { country: 'USA', area: 7, color: "#7a7a7a" },
    ];

    return (
        <Paper>
            <Chart
                data={data}
            >
                <PieSeries
                    valueField="area"
                    argumentField="country"
                    color="color"
                />
                <Title
                    text="Area of Countries"
                />
                <Animation />
            </Chart>
        </Paper>
    );
}