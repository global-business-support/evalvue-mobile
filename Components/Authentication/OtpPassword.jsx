import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { customStyle } from '../Styles/customStyle';

const OtpPassword = () => {
    const [otpValue, setOtpValue] = useState(new Array(6).fill(""));
    const [enteredEmail, setEnteredEmail] = useState(null);
    const [email, setEmail] = useState(null);

    const handleEmail = () => {
        setEmail(enteredEmail);
    };

    const renderItem = ({ item, index }) => (
        <TextInput
            style={styles.inputBox}
            value={item}
            onChangeText={(text) => {
                const newOtpValue = [...otpValue];
                newOtpValue[index] = text;
                setOtpValue(newOtpValue);
            }}
            keyboardType="numeric"
            maxLength={1}
        />
    );

    if (email == null) {
        return (
            <ScrollView
            style={{backgroundColor: '#FFF'}}
            >
                <View style={styles.centeredView}>
                    <View style={styles.otpBox}>
                        <Text style={customStyle.heading}>Send Verification Email</Text>
                        <View style={[customStyle.inputBox, styles.otpInputBox]}>
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor="#535C68"
                                style={customStyle.inputStyle}
                                value={enteredEmail}
                                onChangeText={(value) => setEnteredEmail(value)}
                            />
                        </View>
                        <TouchableOpacity
                            style={customStyle.loginBtn}
                        >
                            <Text
                                style={customStyle.loginText}
                                onPress={() => handleEmail()}
                            >Send OTP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    } else {
        return (
            <ScrollView
            style={{backgroundColor: '#FFF'}}
            >
                <View style={styles.centeredView}>
                    <View style={styles.otpBox}>
                        <Text style={customStyle.heading}>Verification Code</Text>
                        <Text style={styles.otpText}>Please enter the verification code sent to registered email</Text>
                        <FlatList
                            data={otpValue}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            contentContainerStyle={styles.inputContainer}
                        />
                        <Text>Didn't receive an OTP?</Text>
                        <Text style={[styles.resendBtn, styles.submitBtn]}>Resend OTP?</Text>
                        <TouchableOpacity
                            style={customStyle.loginBtn}
                        >
                            <Text
                                style={customStyle.loginText}
                            >Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    centeredView: {
    },
    otpBox: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    inputBox: {
        width: 40,
        height: 40,
        backgroundColor: 'lightgray',
        marginHorizontal: 5,
        textAlign: 'center',
        fontSize: 14,
        borderRadius: 8,
        marginVertical: 50
    },
    otpText: {
        width: 320,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 25
    },
    resendBtn: {
        marginTop: 5,
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginTop: 20
    },
    otpInputBox: {
        marginTop: 30
    }
});

export default OtpPassword;
