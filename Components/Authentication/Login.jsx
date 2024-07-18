import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customStyle } from '../Styles/customStyle';
import logo from '../../assets/evalvue-logo.jpg';

export default function Login() {
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
                    >
                    </TextInput>
                </View>
                <View style={customStyle.inputBox}>
                    <Icon name="key" size={20} color="#592DA1" />
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
        marginLeft: 150,
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
});