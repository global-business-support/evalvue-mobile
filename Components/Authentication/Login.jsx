import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customStyle, windowHeight } from '../Styles/customStyle';
import logo from '../../assets/evalvue-logo.jpg';
import { ApiAxiosRequest } from '../../API-Management/ApiBackendRequest';
import { NATIVE_API_URL } from '@env';
import { getBooleanData, getStringData, storeData } from '../../API-Management/mmkv-Storage';
import CustomModal from '../CustomModal/CustomModal';
import ValideIcon from 'react-native-vector-icons/Entypo';
import { ValidateEmail, ValidatePassword } from '../../Validation/Validation';

export default function Login({ navigation, route }) {
    const { sessionExpired } = route.params || {}; // Get the sessionExpired param from the route
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [validEmailIcon, setValidEmailIcon] = useState(false);
    const [validPasswordIcon, setValidPasswordIcon] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [accessToken,setaccessToken]=useState(false)

    useEffect(() => {
        setLoginData({email : '', password : ''})
        if (getStringData('accessToken')) {
            navigation.navigate('Dashboard');
            setaccessToken(true)
        }
        else{
            setaccessToken(true)
        }
    }, [accessToken]);

    const handleChange = (name, value) => {
        if (name === "email") {
            setValidEmailIcon(ValidateEmail(value).isValid);
        } else if (name === "password") {
            setValidPasswordIcon(ValidatePassword(value).isValid);
        }
        setLoginData((prevValues) => ({ ...prevValues, [name]: value }));
        if (value.trim() !== '') {
            setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
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
          setIsLoading(true);
          const res = await ApiAxiosRequest(`${NATIVE_API_URL}/login/user/`, loginData);
          setIsLoading(false);
          if (res.data) {
            if (res.data.is_login_successfull && res.data.is_user_verified) {
              storeData("accessToken", res.data.access);
              storeData("email", loginData.email);
              storeData("userName", res.data.user_name);
            //   storeData("accessTokenExpiry", res.data.accessTokenExpiry.toString()); // Ensure it's stored as a string
              storeData("isLogin", res.data.is_login_successfull);
              navigation.navigate("Dashboard");
            } else if (res.data.is_user_verified === false) {
              navigation.navigate('Verify', { isForget: false, stateEmail: loginData.email });
            }
          } else if (res.isexception) {
            setError(res.exceptionmessage.error);
            setModalVisible(true);
          }
        } else {
          setError(null);
        }
      };
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <KeyboardAvoidingView>
            <ScrollView style={customStyle.scrollStyle}>
                <View style={customStyle.loginContainer}>
                    <View>
                        <Image
                            source={logo}
                            style={styles.loginLogo}
                        />
                    </View>
                    <View>
                        <Text style={customStyle.heading}>Hello Again 👋</Text>
                        <Text style={styles.text}>Welcome back, you've been missed</Text>
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
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                            />
                        </View>
                        {isEmailFocused && loginData.email.length > 0 && (
                            <View style={customStyle.regexContainer}>
                                <ValideIcon
                                    name={validEmailIcon ? 'check' : 'cross'}
                                    color={validEmailIcon ? 'green' : 'red'}
                                    size={18}
                                />
                                {!validEmailIcon && (
                                    <Text style={customStyle.regexText}>
                                        Please include '@' or part following '@' is incomplete.
                                    </Text>
                                )}
                                {validEmailIcon && <Text style={customStyle.regexText}>Correct.</Text>}
                            </View>
                        )}
                        <Text style={customStyle.errorText}>{formErrors.email}</Text>
                        <View style={customStyle.inputBox} width='84%'>
                            <Icon name="key" size={20} color="#592DA1" />
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor="#535C68"
                                style={customStyle.inputStyle}
                                value={loginData.password}
                                onChangeText={(text) => handleChange('password', text)}
                                secureTextEntry={!showPassword}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#592DA1" />
                            </TouchableOpacity>
                        </View>
                        {isPasswordFocused && loginData.password.length > 0 && (
                            <View style={customStyle.regexContainer}>
                                <ValideIcon
                                    name={validPasswordIcon ? 'check' : 'cross'}
                                    color={validPasswordIcon ? 'green' : 'red'}
                                    size={18}
                                />
                                {!validPasswordIcon && (
                                    <Text style={customStyle.regexText}>
                                        Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.
                                    </Text>
                                )}
                                {validPasswordIcon && <Text style={customStyle.regexText}>Strong password.</Text>}
                            </View>
                        )}
                        <Text style={customStyle.errorText}>{formErrors.password}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.passContainer}
                        onPress={() => { navigation.navigate("Verify", { isForget: true }) }}
                    >
                        <Text style={styles.passText}>Forget Password ?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={customStyle.loginBtn}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={customStyle.loginText}>LOGIN</Text>
                        )}
                    </TouchableOpacity>
                    <View style={styles.footerContainer}>
                        <Text style={styles.text}>Don't have registration yet? </Text>
                        <Text onPress={() => { navigation.navigate("Register") }} style={styles.regText}>Register Now</Text>
                    </View>
                </View>

                <CustomModal
                    visible={modalVisible}
                    onClose={closeModal}
                    obj={{
                        title: 'Error',
                        error: error ? true : false,
                        description: error || 'Something went wrong.',
                        buttonTitle: "OK",
                        onPress: closeModal
                    }}
                />
            </ScrollView>
        </KeyboardAvoidingView>
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
        marginTop: 45
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
    icon: {
        position: 'absolute',
        right: 10,
        top: -8,
    }
});