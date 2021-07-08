import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, navigate } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { DataTable } from 'react-native-paper';

// import { NavigationContainer } from '@react-navigation/native'
import API from './api';



import Attendance from './components/Attendance';
import Classroom from './components/Classroom';
import Section from './components/Section';
// import { accessibilityProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

export default function Take_Attendance(props) {

    const { navigation } = props;

    const [students, setStudents] = useState([]);
    const [showSubmit, setShowSubmit] = useState(false);
    const [attendance, setAttendance] = useState({});
    const [section, setSection] = useState("");
    const [classroom, setClassroom] = useState("");
    const [nameSubmit, setNameSubmit] = useState("Take Attendance")

    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1);
    var day = today.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var date = year + '-' + month + '-' + day;

    const filter = {
        section: section,
        classroom: classroom,
    };

    const fetchdata = async () => {

        setAttendance({});

        await API.post(`stu-sec-class`)
            .then(res => {
                const result = res.data.data;
                const data = result.filter(s => s.section_id == section);
                if (data) {
                    data.map(s => {
                        const attend = attendance;
                        attend[s.id] = "Present";
                        setAttendance(attend);
                    });
                }
                setStudents(data);
            });

        await API.get(`attendance`)
            .then(res => {
                const result = res.data.data;
                const update = result.filter(a =>
                    (a.created_at.slice(0, 10) == date && a.section_id == section)
                );
                if (update && update.length) {

                    let attend = attendance;
                    update.map(s => {
                        attend[s.student_id] = s.description;
                    });
                    setAttendance(attend);

                    setNameSubmit("Update Attendance");
                } else {
                    setNameSubmit("Take Attendance");
                }
            });

        if (classroom == "") setSection("");
        checkSubmit();
    }

    const checkSubmit = () => {
        (section !== "") ? setShowSubmit(true) : setShowSubmit(false);
    }

    // const setState = (nextState) => {
    //     updateState(prevState => ({
    //         ...prevState,
    //         ...nextState
    //     }));
    // }

    // const handleChange = e => {
    //     let { name, value } = e.target;
    //     setState({ [name]: value });
    // }

    const changeDescription = (key, val) => {
        let attend = attendance;
        attend[key] = val;
        setAttendance({ ...attend });
    }

    const submitAttendance = async () => {

        const updateFunction = async (update) => {
            for (let i = 0; i < students.length; i++) {
                let student = students[i];
                let key = student.id;
                let reqBody = {
                    description: attendance[key],
                    section_id: section,
                    student_id: key
                }
                let att = update.find(a => a.student_id == key);
                let id = att.id;

                await API.put(`attendance/${id}`, reqBody);
            }
        }

        const createFunction = async () => {
            students.map(async (student) => {
                let key = student.id;
                let reqBody = {
                    description: attendance[key],
                    section_id: section,
                    student_id: key
                }
                await API.post(`attendance`, reqBody);
            });
        }

        await API.get(`attendance`)
            .then(res => {
                const result = res.data.data;
                const update = result.filter(a =>
                    (a.created_at.slice(0, 10) == date && a.section_id == section)
                );
                if (update && update.length) {
                    updateFunction(update);
                } else {
                    createFunction();
                    setNameSubmit("Update Attendance");
                }
            });
    }

    useEffect(() => {
        fetchdata();
    }, [JSON.stringify(filter)]);


    return (
        <>
            <View>
                <LinearGradient colors={['#6D6F73', '#47484b']} >
                    <Text style={styles.text}>Student Attendance </Text>
                    <View
                        style={styles.container}
                    >

                        <View style={styles.viewSelect}>
                            <Classroom
                                value={classroom}
                                onValueChange={setClassroom}
                                style={styles.class}
                            />
                            <Section
                                id={classroom}
                                value={section}
                                onValueChange={setSection}
                                style={styles.class}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={submitAttendance}
                            style={{
                                display: showSubmit ? 'block' : 'none',
                                height: 25,
                                borderRadius: 5,
                                textAlign: 'center',
                                backgroundColor: 'rgb(15, 159, 255)',
                                padding: 4
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 14 }}>{nameSubmit}</Text>
                        </TouchableOpacity>

                    </View>
                </LinearGradient>

                <View>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>ID</DataTable.Title>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title>Class</DataTable.Title>
                            <DataTable.Title>Attendance</DataTable.Title>
                        </DataTable.Header>

                        {students.map(student => (
                            <DataTable.Row key={student.id}>
                                <DataTable.Cell>{student.id}</DataTable.Cell>
                                <DataTable.Cell>{student.fname} {student.lname}</DataTable.Cell>
                                <DataTable.Cell>{student.classroom_name} {student.section_name}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Attendance
                                        value={attendance[student.id]}
                                        onValueChange={selectedValue => changeDescription(student.id, selectedValue)}
                                        style={styles.description}
                                    />
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            </View >

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Chart')}>
                <Text style={styles.buttonText}>Report</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 5,
        paddingLeft: '5%',
        paddingRight: '6%',
        paddingBottom: 20,
        paddingTop: 20,
        borderRadius: 5,
        margin: 5
    },
    viewSelect: {
        flexDirection: "row",
        flex: 5,
    },
    class: {
        height: 25,
        borderRadius: 5,
        border: 'none',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgb(15, 159, 255)',
        marginRight: 20,
        fontSize: 14
    },
    description: {
        height: 25,
        borderRadius: 5,
        border: 'none',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgb(15, 159, 255)',
    },
    text: {
        color: 'white',
        paddingTop: 10,
        paddingBottom: 0,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    statistic: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        height: 25,
        width: 150,
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: 'rgb(15, 159, 255)',
        padding: 4
    },
    buttonContainer: {
        backgroundColor: 'rgb(15, 159, 255)',
        borderRadius: 10,
        padding: 10,
        width: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
        textAlign: 'center',
        marginTop:5
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
});