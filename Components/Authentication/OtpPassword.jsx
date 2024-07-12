import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { customStyle } from '../Styles/customStyle';

const OtpPassword = () => {
    const [otpValue, setOtpValue] = useState(new Array(6).fill(""));

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

    return (
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
                    <Text style={customStyle.loginText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
        width: 45,
        height: 45,
        backgroundColor: 'lightgray',
        marginHorizontal: 5,
        textAlign: 'center',
        fontSize: 18,
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
    submitBtn: {
        // marginTop: 100
    }
});

export default OtpPassword;
