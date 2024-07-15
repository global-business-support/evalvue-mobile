import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { customStyle } from '../Styles/customStyle';

export default function Login() {
    return (
        <View style={customStyle.loginContainer}>
            <View>
                <Image
                    source={{
                        uri: 'http://test.evalvue.com/assets/evalvuelogo-Cc-YEGpi.jpg'
                    }}
                    style={styles.loginLogo}
                />
            </View>
            <View>
                <Text style={customStyle.heading}>Hello Again 👋</Text>
                <Text style={styles.text}>welcome back, you've been missed</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={customStyle.inputBox}>
                    <Icon name="email" size={26} color="#592DA1" />
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor="#535C68"
                        style={customStyle.inputStyle}
                    >
                    </TextInput>
                </View>
                <View style={customStyle.inputBox}>
                    <Icon name="key" size={26} color="#592DA1" />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry
                        placeholderTextColor="#535C68"
                        style={customStyle.inputStyle}
                    >
                    </TextInput>
                </View>
            </View>
            <View style={styles.passContainer}>
                <Text style={styles.passText}>Forget Password?</Text>
            </View>
            <TouchableOpacity
                style={customStyle.loginBtn}
            >
                <Text style={customStyle.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
                <Text style={styles.text}>Don't have registration yet?</Text>
                <Text style={styles.regText}>Register Now</Text>
            </View>
        </View>
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
        fontSize: 16
    },
    inputContainer: {
        marginTop: 70
    },
    passContainer: {
        marginLeft: 150,
        marginTop: 6
    },
    passText: {
        color: '#592DA1',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerContainer: {
        flexDirection: 'row',
        marginTop: 14,
    },
    regText: {
        marginTop: 5,
        fontSize: 16,
        color: '#592DA1',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    emailIcon: {
        width: 10,
        height: 10
    },
    icon: {
        height: 20,
        width: 20
    }
});