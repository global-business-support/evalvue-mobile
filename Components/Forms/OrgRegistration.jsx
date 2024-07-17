import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { customStyle, windowHeight } from '../Styles/customStyle';
import NameIcon from 'react-native-vector-icons/Ionicons';
import FileIcon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';

export default function OrgRegistration() {
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Text style={[customStyle.heading, { paddingBottom: 8 }]}>Register your organization</Text>
                    <ScrollView
                        style={styles.orgScroll}
                        horizontal={false}
                        scrollEventThrottle={16}
                    >
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Organization Name</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <NameIcon name="person-sharp" size={20} color="#592DA1" />
                                <TextInput
                                    placeholder='Name'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Organization Logo</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <TouchableHighlight>
                                <View style={customStyle.fileBtn}>
                                    <FileIcon name="clouduploado" size={20} color="#592DA1" />
                                    <Text style={customStyle.fileBtnText}>UPLOAD FILE</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Document Type</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={styles.option}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                                >
                                    <Picker.Item label="Select Option" value="placeholder" style={styles.pickerItem} />
                                    <Picker.Item label="Aadhar Card" value="Aadhar Card" style={styles.pickerItem} />
                                    <Picker.Item label="Pan Card" value="Pan Card" style={styles.pickerItem} />
                                    <Picker.Item label="Driving Licence" value="Driving Licence" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Document File</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <TouchableHighlight>
                                <View style={customStyle.fileBtn}>
                                    <FileIcon name="clouduploado" size={20} color="#592DA1" />
                                    <Text style={customStyle.fileBtnText}>UPLOAD FILE</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View></View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Organization Sector</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={styles.option}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                                >
                                    <Picker.Item label="Select Option" value="placeholder" style={styles.pickerItem} />
                                    <Picker.Item label="Technology Sector" value="Technology Sector" style={styles.pickerItem} />
                                    <Picker.Item label="Technology Sector" value="Technology Sector" style={styles.pickerItem} />
                                    <Picker.Item label="Technology Sector" value="Technology Sector" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Organization Listed</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={styles.option}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                                >
                                    <Picker.Item label="Select Option" value="placeholder" style={styles.pickerItem} />
                                    <Picker.Item label="Public Sector" value="Public Sector" style={styles.pickerItem} />
                                    <Picker.Item label="Private Sector" value="Private Sector" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>

                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Document Number</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <TextInput
                                    placeholder='CA947318A'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>GST Number (Optional)</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <TextInput
                                    placeholder='CA9473186A789A'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Number of Employees</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={styles.option}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                                >
                                    <Picker.Item label="Select any one" value="placeholder" style={styles.pickerItem} />
                                    <Picker.Item label="1 - 100" value="1-100" style={styles.pickerItem} />
                                    <Picker.Item label="Above 100" value="Above 100" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Referral Number (Optional)</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <TextInput
                                    placeholder='Referral Number'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                />
                            </View>
                        </View>
                        <Text style={styles.addHeading}>Address</Text>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Address</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <TextInput
                                    placeholder='Area Ex-148, Nehru Nagar'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Country</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={styles.option}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                                >
                                    <Picker.Item label="Select Country" value="placeholder" style={styles.pickerItem} />
                                    <Picker.Item label="1 - 100" value="1-100" style={styles.pickerItem} />
                                    <Picker.Item label="Above 100" value="Above 100" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>State</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={styles.option}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                                >
                                    <Picker.Item label="Select City" value="placeholder" style={styles.pickerItem} />
                                    <Picker.Item label="1 - 100" value="1-100" style={styles.pickerItem} />
                                    <Picker.Item label="Above 100" value="Above 100" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>City</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={styles.option}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                                >
                                    <Picker.Item label="Select any one" value="placeholder" style={styles.pickerItem} />
                                    <Picker.Item label="1 - 100" value="1-100" style={styles.pickerItem} />
                                    <Picker.Item label="Above 100" value="Above 100" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Pin Code</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={customStyle.inputBox}>
                                <TextInput
                                    placeholder='Pin Number'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={customStyle.loginBtn}
                    >
                        <Text
                            style={customStyle.loginText}
                        >Register Your Organization</Text>
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
    },
    option: {
        width: '90%',
        backgroundColor: '#DAE0E2',
        borderRadius: 6,
        paddingHorizontal: 8,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: '#592DA1'
    },
    pickerItem: {
        color: '#535C68',
        fontSize: 14,
    },
    addHeading: {
        fontSize: 18,
        color: '#000',
        fontWeight: '500',
        marginTop: 18
    }
});