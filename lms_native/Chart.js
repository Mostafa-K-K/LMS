import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'

import React, { Component } from 'react'

import { View, Dimensions, Text } from 'react-native'

export default class chart extends React.PureComponent {
    state = {
        data: {
            labels: ['0', 'present', 'late', 'absent'],
            datasets: [{ data: [0, 4, 5, 6] }]
        }
    }
    render() {
        let { data } = this.state;
        return (
            < View >
                <LineChart
                    data={data}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    chartConfig={{
                        backgroundGradientFrom: 'rgb(15, 159, 255)',
                        backgroundGradientTo: 'rgb(71, 181, 255)',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 2) => `rgba(50, 50, 50, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />

                {/* <ProgressChart
                    data={data}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#696969',
                        backgroundGradientFrom: '#696969',
                        backgroundGradientTo: '#ADD8E6',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 2) => `rgba(50, 50, 50, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                /> */}
            </View >
        );
    }
}