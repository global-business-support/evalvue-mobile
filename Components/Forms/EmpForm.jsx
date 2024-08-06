import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { customStyle, primary } from '../Styles/customStyle';
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
import { NATIVE_API_URL } from '@env';
import { ValidateEmail } from '../../Validation/Validation';

export default function EmpForm() {
    const route = useRoute();
    const { employee_id, organization_id, orgDetails } = route.params;
    const [editEnable, setEditEnable] = useState(!orgDetails.addEmp);
    const [empData, setEmpData] = useState({
        organization_id: orgDetails?.orgId || organization_id,
        employee_id: employee_id || '',
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        aadhar_number: '',
        confirm_aadhar_number: '',
        designation: '',
        employee_image: {}
    });
    const [fileName, setFileName] = useState("");
    const [formsErrors, setFormErrors] = useState({});
    const [error, setError] = useState('');
    const [validEmailIcon, setValidEmailIcon] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
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
    };

    const handleChange = (name, value) => {
        if (name === 'email') {
            setValidEmailIcon(ValidateEmail(value).isValid);
        }
        setEmpData(prevData => ({ ...prevData, [name]: value }));

        setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const selectImage = async name => {
        try {
            const doc = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            });
            setEmpData(prev => ({ ...prev, [name]: doc }));
        } catch (error) {
            setError(error)
        }
    };
    const getFileNameFromUrl = (url) => {
        return url.substring(url.lastIndexOf('/') + 1);
    };

    const editData = {
        employee_id: employee_id
    };

    useEffect(() => {
        const fetchData = async () => {
            if (editEnable) {
                try {
                    const res = await ApiBackendRequest(`${NATIVE_API_URL}/employee/editable/data/`, editData);
                    if (res.data.employee_editable_data_send_successfull) {
                        const newEmployeeData = res.data.employee_list[0];
                        setEmpData((prevEmpData) => ({
                            ...prevEmpData,
                            aadhar_number: newEmployeeData.aadhar_number || prevEmpData.aadhar_number,
                            confirm_aadhar_number: newEmployeeData.aadhar_number || prevEmpData.confirm_aadhar_number,
                            designation: newEmployeeData.designation || prevEmpData.designation,
                            email: newEmployeeData.email || prevEmpData.email,
                            employee_image: newEmployeeData.employee_image || prevEmpData.employee_image,
                            first_name: newEmployeeData.first_name || prevEmpData.first_name,
                            last_name: newEmployeeData.last_name || prevEmpData.last_name,
                            mobile_number: newEmployeeData.mobile_number || prevEmpData.mobile_number,
                        }));
                        setFileName(getFileNameFromUrl(res.data.employee_list[0].employee_image))
                        setEditEnable(res.data.employee_editable_data_send_successfull);
                    }
                    if (res.isexception) {
                        setError(res.exceptionmessage.error);
                    }
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [editData.employee_id]);
    const handleEmpSubmit = async () => {
        const errors = validate();
        setFormErrors(errors);
        const formData = new FormData();
        Object.keys(empData).forEach(key => {
            formData.append(key, empData[key]);
        });
        try {
            setLoading(true);
            const res = await ApiBackendRequest(
                `${NATIVE_API_URL}${editEnable ? `/employee/edit/` : `/create/employees/`}`, formData,
            );
            if (res.data) {
                if (
                    res.data.is_employee_register_successfull ||
                    res.data.employee_edit_sucessfull
                ) {
                    navigation.navigate('EmployeeList', {
                        orgDetails: orgDetails
                    });
                }
            } else if (res.isexception) {
                setError(res.exceptionmessage.error);
                setModalVisible(true);
            }
        } catch (error) {
            setError(error);
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
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
                                        placeholderTextColor="#999"
                                        style={customStyle.inputStyle}
                                        value={empData.first_name || ''}
                                        onChangeText={(text) => { handleChange('first_name', text) }}
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
                                        value={empData.last_name || ''}
                                        onChangeText={(text) => { handleChange('last_name', text) }}
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
                                        keyboardType="email-address"
                                        style={customStyle.inputStyle}
                                        width={
                                            isEmailFocused && empData.email.length > 0 ? '84%' : '90%'
                                        }
                                        value={empData.email || ''}
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
                                        value={empData.mobile_number?.toString() || ''}
                                        onChangeText={(number) => { handleChange('mobile_number', number) }}
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
                                        editable={!editEnable}
                                        value={empData.aadhar_number?.toString() || ''}
                                        onChangeText={(number) => { handleChange('aadhar_number', number) }}
                                    />
                                </View>
                                {formsErrors.aadhar_number && (
                                    <Text style={styles.errors}>{formsErrors.aadhar_number}</Text>
                                )}
                            </View>
                            {
                                !editEnable &&
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
                                            onChangeText={(number) => { handleChange('confirm_aadhar_number', number) }}
                                        />
                                    </View>
                                    {formsErrors.confirmAadharNumber && (
                                        <Text style={styles.errors}>{formsErrors.confirmAadharNumber}</Text>
                                    )}
                                </View>
                            }
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
                                        value={empData.designation || ''}
                                        onChangeText={(text) => { handleChange('designation', text) }}
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
                                <View style={{ display: 'flex', flexDirection: 'coloum' }}>
                                    <TouchableOpacity onPress={() => selectImage('employee_image')}>
                                        <View style={customStyle.fileBtn}>
                                            <FileIcon name="clouduploado" size={20} color="#592DA1" />
                                            <Text style={customStyle.fileBtnText}>
                                                {Object.keys(empData.employee_image).length == 0 ? (
                                                    'UPLOAD FILE'
                                                ) : (
                                                    <TruncatedText
                                                        text={fileName == '' ? empData.employee_image.name : fileName}
                                                        maxLength={25}
                                                        dot={true}
                                                    />
                                                )}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
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
                            {
                                loading ? (<ActivityIndicator size="small" color="white" />) :
                                    (
                                        !editEnable ? (<Text style={customStyle.loginText}>Register Employee</Text>) :
                                            <Text style={customStyle.loginText}>Update Details</Text>
                                    )
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <CustomModal
                    visible={modalVisible}
                    onClose={closeModal}
                    obj={{
                        title: 'Error',
                        error: error ? true : false,
                        description: error && error || 'Something went wrong.',
                        buttonTitle: 'OK',
                        onPress: closeModal,
                    }}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
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