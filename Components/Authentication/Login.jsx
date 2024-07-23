import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customStyle } from '../Styles/customStyle';
import logo from '../../assets/evalvue-logo.jpg';
import { ApiLoginRequest } from '../../API-Management/ApiBackendRequest';
import { NATIVE_API_URL } from '@env';
import { storeData } from '../../API-Management/mmkv-Storage';
import CustomModal from '../CustomModal/CustomModal'; // Import CustomModal component
import { useNavigation } from '@react-navigation/native';
export default function Login({navigation}) {
    // const navigation = useNavigation();
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // State to track password visibility
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    const [isLoading, setIsLoading] = useState(false); // State to track loading state

    const handleChange = (name, value) => {
        setLoginData((prevValues) => ({ ...prevValues, [name]: value }));
        if (value.trim() !== '') {
            setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        };
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const validate = () => {
        const errors = {};
        if (!loginData.email) errors.email = "Email is required";
        if (!loginData.password) errors.password = "Password is required";
        return errors;
    };

    const handleSubmit = async () => {
        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setIsLoading(true); // Show loader when starting the API request
            const res = await ApiLoginRequest(`${NATIVE_API_URL}/login/user/`, loginData);
            setIsLoading(false); // Hide loader after API request completes
            if (res.data) {
                storeData("accessToken", res.data.access);
                storeData("isLogin", res.data.is_login_successfull);
                if (res.data.is_login_successfull && res.data.is_user_verified) {
                    // Navigate to next screen upon successful login
                    navigation.navigate("Dashboard"); // Replace "NextScreen" with your actual screen name
                }
            } else if (res.isexception) {
                setError(res.exceptionmessage.error);
                console.log(res.exceptionmessage)
                setModalVisible(true); // Show modal on error
            }
        } else {
            setError(null);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <ScrollView>
            <View style={customStyle.loginContainer}>
                <View>
                    <Image
                        source={logo}
                        style={styles.loginLogo}
                    />
                </View>
                <View>
                    <Text style={customStyle.heading}>Hello Again 👋</Text>
                    <Text style={styles.text}>welcome back, you've been missed</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={customStyle.inputBox}>
                        <Icon name="email" size={20} color="#592DA1" />
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor="#535C68"
                            style={customStyle.inputStyle}
                            value={loginData.email}
                            onChangeText={(text) => handleChange('email', text)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
                    <View style={customStyle.inputBox}>
                        <Icon name="key" size={20} color="#592DA1" />
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor="#535C68"
                            style={customStyle.inputStyle}
                            value={loginData.password}
                            onChangeText={(text) => handleChange('password', text)}
                            secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#592DA1" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}
                    {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
                </View>
                <View style={styles.passContainer}>
                    <Text style={styles.passText}>Forget Password?</Text>
                </View>
                <TouchableOpacity
                    style={customStyle.loginBtn}
                    onPress={handleSubmit}
                    disabled={isLoading} // Disable button when loading
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={customStyle.loginText}>LOGIN</Text>
                    )}
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.text}>Don't have registration yet?</Text>
                    <Text onPress={() => { navigation.navigate("Register") }} style={styles.regText}>Register Now</Text>
                </View>
            </View>

            {/* Modal to show error message */}
            <CustomModal
                visible={modalVisible}
                onClose={closeModal}
                obj={{
                    title: 'Error',
                    error:error?true:false,
                    description: error || 'Something went wrong.',
                    buttonTitle: "OK",
                    onPress: closeModal
                }}
            />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    loginLogo: {
        height: 110,
        width: 110,
        marginTop: 50
    },
    text: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray'
    },
    inputContainer: {
        marginTop: 70
    },
    passContainer: {
        width: '85%',
        alignItems: 'flex-end',
        marginTop: 6
    },
    passText: {
        color: '#592DA1',
        fontSize: 14,
        fontWeight: 'bold',
    },
    footerContainer: {
        flexDirection: 'row',
        marginTop: 14,
        paddingBottom: 8
    },
    regText: {
        marginTop: 5,
        fontSize: 12,
        color: '#592DA1',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    errorText: {
        width: '100%',
        color: 'red',
        fontSize: 13,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: -8,
    },
});
