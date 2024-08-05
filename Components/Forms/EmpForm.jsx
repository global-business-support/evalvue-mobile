import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { customStyle, primary, windowHeight } from '../Styles/customStyle';
import NameIcon from 'react-native-vector-icons/Ionicons';
import FileIcon from 'react-native-vector-icons/AntDesign';
import AadharIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomModal from '../CustomModal/CustomModal';
import ValideIcon from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import TruncatedText from '../Othercomponent/TruncatedText';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';

import {NATIVE_API_URL} from '@env';
import { ValidateEmail } from '../../Validation/Validation';

export default function EmpForm() {
    const route = useRoute();
    const {orgDetails} = route.params;

    const [empData, setEmpData] = useState({
        organization_id : orgDetails.orgId,
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        aadhar_number: '',
        confirm_aadhar_number: '',
        designation: '',
        employee_image : {}
      });
      const [formsErrors, setFormErrors] = useState({});
      const [error, setError] = useState(null);
      const [validEmailIcon, setValidEmailIcon] = useState(false);
      const [isEmailFocused, setIsEmailFocused] = useState(false);
      const [modalVisible, setModalVisible] = useState(false);
    
      const navigation = useNavigation();
    
      function validate() {
        const errors = {};
        if (!empData.first_name) errors.first_name = 'First Name is required*';
        if (!empData.last_name) errors.last_name = 'Last Name is required*';
        if (!empData.email)
          errors.email = 'Employee Email is required*';
        if (!empData.mobile_number)
          errors.mobile_number = 'Employee Mobile Number is required*';
        if (!empData.aadhar_number)
          errors.aadhar_number = 'Aadhar Number is required*';
        if (!empData.confirm_aadhar_number == empData.aadhar_number)
          errors.confirm_aadhar_number = 'Aadhar Number does not is required*';
        if (!empData.designation)
          errors.designation = 'Designation is required*';
        if (!empData.employee_image) errors.employee_image = 'Employee Image is required*';
        return errors
      }
    
    
      const handleChange = (name, value) => {
        if (name === 'email') {
            setValidEmailIcon(ValidateEmail(value).isValid);
          }
        setEmpData(prevData => ({...prevData, [name]: value}));
        
        setFormErrors(prevErrors => ({...prevErrors, [name]: ''}));
      };
    
      const selectImage = async name => {
        try {
          const doc = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.images],
          });
          console.log(name, doc);
          setEmpData(prev => ({...prev, [name]: doc}));
        } catch (error) {
          console.log("error selectimage",error);
        }
      };
    
      
      
      const handleEmpSubmit = async () => {
          console.log(orgDetails.ordId)
          const errors = validate();
          setFormErrors(errors);


          const formData = new FormData();
          Object.keys(empData).forEach(key => {
            formData.append(key, empData[key]);
          });
    
        try{
          console.log('before api')
          const res = await ApiBackendRequest(
            `${NATIVE_API_URL}${'/create/employees/'}`,formData,
          );
          if (res.data) {
            console.log('after api')
            if (
                res.data.is_employee_register_successfull ||
                res.data.employee_edit_sucessfull
            ) {
                console.log('Employee Added successfully');
                navigation.navigate('EmployeeList', {
                    orgDetails: {
                        orgId : orgDetails.orgId
                    }
                });
            }
        } else if (res.isexception) {
              console.log('api Error')
            console.log(res.exceptionmessage.error)
            setError(res.exceptionmessage.error);
            setModalVisible(true);
          }
        } catch (error) {
          setError(error);
          setModalVisible(true);
        }
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };
    

    return (
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
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
                                    onChangeText={(text)=>{handleChange('first_name', text)}}
                                />
                            </View>
                            {formsErrors.first_name && (
                                <Text style={styles.errors}>{formsErrors.first_name}</Text>
                            )}
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
                                    placeholderTextColor="#999"
                                    style={customStyle.inputStyle}
                                    onChangeText={(text)=>{handleChange('last_name', text)}}
                                />
                            </View>
                            {formsErrors.last_name && (
                                <Text style={styles.errors}>{formsErrors.last_name}</Text>
                            )}
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Email</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            {/* <View style={customStyle.inputBox}>
                                <Icon name="email" size={20} color="#592DA1" />
                                <TextInput
                                    placeholder='Email'
                                    placeholderTextColor="#535C68"
                                    style={customStyle.inputStyle}
                                    onChangeText={(text)=>{handleChange('email', text)}}
                                />
                            </View> */}
                            <View
                                style={customStyle.inputBox}
                                width={
                                    isEmailFocused && empData.email.length > 0 ? '90%' : '90%'
                                }
                                >
                                <Icon name="email" size={20} color="#592DA1" />
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#999"
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)}
                                    style={customStyle.inputStyle}
                                    width={
                                        isEmailFocused && empData.email.length > 0 ? '84%' : '90%'
                                    }
                                    onChangeText={text => handleChange('email', text)}></TextInput>
                                    {isEmailFocused && empData.email.length > 0 && (
                                        <ValideIcon
                                            name={validEmailIcon ? 'check' : 'cross'}
                                            color={validEmailIcon ? 'green' : 'red'}
                                            size={18}
                                        />
                                )}
                            </View>
                            {formsErrors.email && (
                                <Text style={styles.errors}>{formsErrors.email}</Text>
                            )}
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
                                    placeholderTextColor="#999"
                                    style={customStyle.inputStyle}
                                    keyboardType="numeric"
                                    maxLength={10}
                                    onChangeText={(number)=>{handleChange('mobile_number', number)}}
                                />
                            </View>
                            {formsErrors.mobile_number && (
                                <Text style={styles.errors}>{formsErrors.mobile_number}</Text>
                            )}
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
                                    placeholderTextColor="#999"
                                    style={customStyle.inputStyle}
                                    keyboardType="numeric"
                                    maxLength={12}
                                    onChangeText={(number)=>{handleChange('aadhar_number', number)}}
                                />
                            </View>
                            {formsErrors.aadhar_number && (
                                <Text style={styles.errors}>{formsErrors.aadhar_number}</Text>
                            )}
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
                                    placeholderTextColor="#999"
                                    style={customStyle.inputStyle}
                                    keyboardType="numeric"
                                    maxLength={12}
                                    onChangeText={(number)=>{handleChange('confirm_aadhar_number', number)}}
                                />
                            </View>
                            {formsErrors.confirmAadharNumber && (
                                <Text style={styles.errors}>{formsErrors.confirmAadharNumber}</Text>
                            )}
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
                                    placeholderTextColor="#999"
                                    style={customStyle.inputStyle}
                                    onChangeText={(text)=>{handleChange('designation', text)}}
                                />
                            </View>
                            {formsErrors.designation && (
                                <Text style={styles.errors}>{formsErrors.designation}</Text>
                            )}
                        </View>
                        <View>
                            <View style={customStyle.lableContainer}>
                                <Text style={customStyle.lableHeading}>Image</Text>
                                <Text style={customStyle.mandatory}>*</Text>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'coloum'}}>
                                <TouchableHighlight onPress={() => selectImage('employee_image')}>
                                    <View style={customStyle.fileBtn}>
                                        <FileIcon name="clouduploado" size={20} color="#592DA1" />
                                        <Text style={customStyle.fileBtnText}>
                                            {Object.keys(empData.employee_image).length == 0 ? (
                                            'UPLOAD FILE'
                                            ) : (
                                            <TruncatedText
                                                text={empData.employee_image.name}
                                                maxLength={25}
                                                dot={true}
                                            />
                                            )}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                                {Object.keys(empData.employee_image).length !== 0 && (
                                    <View style={styles.viewContainer}>
                                    <TouchableOpacity>
                                        <Text style={styles.viewText}>View</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                        setEmpData(previous => ({
                                            ...previous,
                                            empImage: {},
                                        }))
                                        }>
                                        <Text style={styles.cancelText}>Cancel</Text>
                                    </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                            {formsErrors.employee_image && (
                                <Text style={styles.errors}>{formsErrors.employee_image}</Text>
                            )}
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={customStyle.loginBtn}
                        onPress={handleEmpSubmit}
                    >
                        <Text
                            style={customStyle.loginText}
                        >Register Employee</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CustomModal
                visible={modalVisible}
                onClose={closeModal}
                obj={{
                    title: 'Error',
                    error: error ? true : false,
                    description: error &&  error || 'Something went wrong.',
                    buttonTitle: 'OK',
                    onPress: closeModal,
                }}
            />
        </ScrollView>
        </KeyboardAvoidingView>
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
        flex: 1,
        // height: windowHeight - ((22 * windowHeight) / 100),
        backgroundColor: '#FFF',
    },
    errors: {
        color: 'red',
        paddingLeft: 5,
    },
    viewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
      },
      viewText: {
        fontSize: 15,
        color: primary,
        textAlignVertical: 'start',
        fontWeight: '500',
      },
      cancelText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#592DA1',
      },

});