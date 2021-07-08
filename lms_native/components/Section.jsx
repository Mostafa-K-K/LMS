import React, { useState, useEffect } from 'react';
import API from '../api';
import { View } from "react-native";
import { Picker } from '@react-native-community/picker';

export default function Section(props) {

    const [sections, setSections] = useState([]);
    const id = props.id;

    const fetchdata = async id => {

        if (id && id !== "") {
            await API.get(`classroomsection/${id}`)
                .then(res => {
                    const result = res.data.data;
                    setSections(result);
                });
        }else{setSections([]);}
    }

    useEffect(() => {
        fetchdata(id);
    }, [id]);

    return (
        <View>

            <Picker
                selectedValue={props.value}
                onValueChange={props.onValueChange}
                style={props.style}
            >

                <Picker.Item
                    value=""
                    label="Section"
                />

                {sections.map(section => (
                    <Picker.Item
                        key={section.id}
                        value={section.id}
                        label={section.name}
                    />
                ))}

            </Picker>
        </View>
    );
}