import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import React, { useState } from 'react';
import { customStyle } from '../Styles/customStyle';
import NameIcon from 'react-native-vector-icons/Ionicons';
import FileIcon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';

export default function OrgRegistration() {
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={customStyle.heading}>Register your organization</Text>
                <ScrollView style={styles.orgScroll}>
                    <View>
                        <View style={styles.lableContainer}>
                            <Text style={styles.Lableheading}>Organization Name</Text>
                            <Text style={styles.mandatory}>*</Text>
                        </View>
                        <View style={customStyle.inputBox}>
                            <NameIcon name="person-sharp" size={26} color="#592DA1" />
                            <TextInput
                                placeholder='Name'
                                placeholderTextColor="#535C68"
                                style={customStyle.inputStyle}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.lableContainer}>
                            <Text style={styles.Lableheading}>Organization Logo</Text>
                            <Text style={styles.mandatory}>*</Text>
                        </View>
                        <TouchableHighlight>
                            <View style={styles.fileBtn}>
                                <FileIcon name="clouduploado" size={26} color="#592DA1" />
                                <Text style={styles.fileBtnText}>UPLOAD FILE</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <View style={styles.lableContainer}>
                            <Text style={styles.Lableheading}>Document Type</Text>
                            <Text style={styles.mandatory}>*</Text>
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
                        <View style={styles.lableContainer}>
                            <Text style={styles.Lableheading}>Document File</Text>
                            <Text style={styles.mandatory}>*</Text>
                        </View>
                        <TouchableHighlight>
                            <View style={styles.fileBtn}>
                                <FileIcon name="clouduploado" size={26} color="#592DA1" />
                                <Text style={styles.fileBtnText}>UPLOAD FILE</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View></View>
                    <View>
                        <View style={styles.lableContainer}>
                            <Text style={styles.Lableheading}>Organization Sector</Text>
                            <Text style={styles.mandatory}>*</Text>
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
                        <View style={styles.lableContainer}>
                            <Text style={styles.Lableheading}>Organization Listed</Text>
                            <Text style={styles.mandatory}>*</Text>
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
                        <View style={styles.lableContainer}>
                            <Text style={styles.Lableheading}>Document Number</Text>
                            <Text style={styles.mandatory}>*</Text>
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
                        <View style={styles.lableContainer}>
                            <Text style={styles.Lableheading}>GST Number (Optional)</Text>
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
                        <View style={styles.lableContainer}>
                            <Text style={styles.Lableheading}>Number of Employees</Text>
                            <Text style={styles.mandatory}>*</Text>
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
                        <View style={styles.lableContainer}>
                            <Text style={styles.Lableheading}>Referral Number (Optional)</Text>
                        </View>
                        <View style={customStyle.inputBox}>
                            <TextInput
                                placeholder='Referral Number'
                                placeholderTextColor="#535C68"
                                style={customStyle.inputStyle}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
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

    },
    lableContainer: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 30
    },
    Lableheading: {
        fontSize: 18,
        color: '#000',
        fontWeight: '500',
    },
    mandatory: {
        color: 'red',
        fontSize: 18,
        marginLeft: 4
    },
    fileBtn: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DAE0E2',
        borderRadius: 6,
        marginVertical: 10,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#592DA1'
    },
    fileBtnText: {
        color: '#592DA1',
        fontSize: 18,
        fontWeight: '400',
        marginLeft: 8
    },
    option: {
        width: '90%',
        backgroundColor: '#DAE0E2',
        borderRadius: 6,
        paddingHorizontal: 8,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#592DA1'
    },
    pickerItem: {
        color: '#535C68',
        fontSize: 18,
    }
});