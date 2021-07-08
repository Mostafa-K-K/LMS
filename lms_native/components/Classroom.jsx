import React, { useState, useEffect } from 'react';
import API from '../api';
import { View } from "react-native";
import { Picker } from '@react-native-community/picker';

export default function Classroom(props) {

    const [classrooms, setClassrooms] = useState([]);

    const fetchdata = async () => {
        await API.get(`classroom`)
            .then(res => {
                const result = res.data.data;
                setClassrooms(result);
            });
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <View>

            <Picker
                selectedValue={props.value}
                onValueChange={props.onValueChange}
                style={props.style}
            >

                <Picker.Item
                    value=""
                    label="Classroom"
                />

                {classrooms.map(classroom => (
                    <Picker.Item
                        key={classroom.id}
                        value={classroom.id}
                        label={classroom.name}
                    />
                ))}

            </Picker>
        </View>
    );
}