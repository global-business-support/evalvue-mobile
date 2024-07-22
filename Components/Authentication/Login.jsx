import { Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customStyle } from '../Styles/customStyle';
import logo from '../../assets/evalvue-logo.jpg';
import { ApiLoginRequest } from '../../API-Management/ApiBackendRequest';
import { NATIVE_API_URL } from '@env';
import { storeData } from '../../API-Management/mmkv-Storage';
import { UserContext } from '../Context/ContextFile';

export default function Login({ navigation }) {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    // const {setUserId}  = useContext(UserContext);
    const UserId  = useContext(UserContext);
    const [error, setError] = useState(null);

    const handleChange = (name, value) => {
        setLoginData((prevValues) => ({ ...prevValues, [name]: value }));
        if (value.trim() !== '') {
            setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        };
    };
    const validate = () => {
        const errors = {};
        if (!loginData.email) errors.email = "Email is required";
        if (!loginData.password) errors.password = "Password is required";
        return errors;
    };
console.log('userId',UserId)
    const handleSubmit = async () => {
        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            const res = await ApiLoginRequest(`${NATIVE_API_URL}/login/user/`, loginData);
            if (res.data) {console.log(res.data)
                storeData("accessToken", res.data.access);
                storeData("isLogin", res.data.is_login_successfull);
                if (res.data.is_login_successfull && res.data.is_user_verified) {
                    // setUserId('420');

                    //   setTimeout(() => {
                    //     navigate("/organization", {
                    //       state: {
                    //         is_login_successfull: res.data.is_login_successfull,
                    //         is_user_verified: res.data.is_user_verified,
                    //       },
                    //     });
                    //   }, 0);
                    // } else if (res.data.is_user_verified == false) {
                    //   navigate("/verified", {
                    //     state: { isForget: false, email: Formdata.email },
                    //   });
                }
            }
            else if (res.isexception) {
                setError(res.exceptionmessage.error);
            }
        } else {
            setError(null)
        }
        // console.log('null',formErrors)
    };
    // console.log('error',error)

    // const handleSubmit = async () =>{
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         // 'Authorization': 'Bearer YOUR_TOKEN', // Include if your API requires authentication
    //       };

    //     try {
    //         console.log(loginData)
    //         const response = await axios.post(`http://test.api.evalvue.com/login/user/`, loginData, headers); 
    //         console.log('res',response.data);
    //       } catch (error) {
    //         console.log('error',error);
    //       } 
    // }

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
                        >
                        </TextInput>
                    </View>
                    <View>
                        {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
                    </View>
                    <View style={customStyle.inputBox}>
                        <Icon name="key" size={20} color="#592DA1" />
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor="#535C68"
                            style={customStyle.inputStyle}
                            value={loginData.password}
                            onChangeText={(text) => handleChange('password', text)}
                            secureTextEntry
                        >
                        </TextInput>
                    </View>
                    <View>
                        {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}
                    </View>
                    <View>
                        {error && <Text style={styles.errorText}>{error}</Text>}
                    </View>
                </View>
                <View style={styles.passContainer}>
                    <Text style={styles.passText}>Forget Password?</Text>
                </View>
                <TouchableOpacity
                    style={customStyle.loginBtn}
                    onPress={handleSubmit}
                >
                    <Text style={customStyle.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.text}>Don't have registration yet?</Text>
                    <Text onPress={() => { navigation.navigate("Register") }} style={styles.regText}>Register Now</Text>
                </View>
            </View>
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
    }
});