import React from 'react';
import { View } from "react-native";
import { Picker } from '@react-native-community/picker';

export default function Attendance(props) {

    const attendances = ["Present", "Absent", "Late"];

    return (
        <View>

            <Picker
                selectedValue={props.value}
                onValueChange={props.onValueChange}
                style={props.style}
            >

                {attendances.map(attendance => (
                    <Picker.Item
                        key={attendance}
                        value={attendance}
                        label={attendance}
                    />
                ))}

            </Picker>
        </View>
    );
}