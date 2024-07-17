import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { customStyle, windowHeight } from '../Styles/customStyle';
import NameIcon from 'react-native-vector-icons/Ionicons';
import FileIcon from 'react-native-vector-icons/AntDesign';
import AadharIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';

export default function EmpForm() {

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Text style={[customStyle.heading, { paddingBottom: 8 }]}>Employee Details</Text>
                    <ScrollView
                        style={styles.orgScroll}
                        horizontal={false}
                        scrollEventThrottle={16}
                    >
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>First Name</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <NameIcon name="person-sharp" size={20} color="#592DA1" />
                                <TextInput
                                    placeholder='First Name'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Last Name</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <NameIcon name="person-sharp" size={20} color="#592DA1" />
                                <TextInput
                                    placeholder='Last Name'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Email</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <Icon name="email" size={20} color="#592DA1" />
                                <TextInput
                                    placeholder='Email'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Mobile Number</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <PhoneIcon name="phone" size={20} color="#592DA1" />
                                <TextInput
                                    placeholder='9826755464'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Aadhar Number</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <AadharIcon name="idcard" size={20} color="#592DA1" />
                                <TextInput
                                    placeholder='982675546424'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Confirm Aadhar Number</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <AadharIcon name="idcard" size={20} color="#592DA1" />
                                <TextInput
                                    placeholder='982675546424'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Designation</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <NameIcon name="person-sharp" size={20} color="#592DA1" />
                                <TextInput
                                    placeholder='Backend Developer'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Image</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <TouchableHighlight>
                                <View style={customStyle.fileBtn}>
                                    <FileIcon name="clouduploado" size={20} color="#592DA1" />
                                    <Text style={customStyle.fileBtnText}>UPLOAD FILE</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={customStyle.loginBtn}
                    >
                        <Text
                            style={customStyle.loginText}
                        >Register Employee</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#592DA1',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginTop: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    orgScroll: {
        height: windowHeight - ((22 * windowHeight) / 100),
        backgroundColor: '#FFF',
    }
});