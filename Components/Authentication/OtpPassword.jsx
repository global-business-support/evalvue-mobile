import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { customStyle, primary } from '../Styles/customStyle';
import { ApiAxiosRequest } from '../../API-Management/ApiBackendRequest';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NATIVE_API_URL } from '@env';

const OtpPassword = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [otpSent, setOtpSent] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [showResendButton, setShowResendButton] = useState(false);
    const [email, setEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [userverification, setuserverification] = useState(false);
    const [employeeverification, setemployeeverification] = useState(false);
    const [error, setError] = useState(null);
    const timerRef = useRef(null);
    const textInputRefs = useRef([]);
    const route = useRoute();
    const { isForget } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        if (!isForget) {
            setEmail(state.email);
        }

        if (!isEmailSent && email && !isForget) {
            handleEmailSubmit();
        }

        if (isOtpVerified && isForget) {
            navigation.navigate("ForgotPassword");
        }
    }, [isOtpVerified, isForget, email, isEmailSent]);

    const startTimer = () => {
        setTimeLeft(120);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 0) return prev - 1;
                clearInterval(timerRef.current);
                setShowResendButton(true);
                return 0;
            });
        }, 1000);
    };

    const handleEmailSubmit = async () => {
        setError("");
        const body = {
            email,
            user_verification: !userverification,
            employee_verification: employeeverification,
        }
        try {
            const res = await ApiAxiosRequest(`${NATIVE_API_URL}/shoot/otp/`, body);
            if (res.data.otp_send_successfull) {
                setIsEmailSent(true);
                setOtpSent(true);
                startTimer();
                setShowResendButton(false);
            } else {
                setError(res.isexception.error || "Something went wrong. Please try again.");
            }
        }
        catch (error) {
            setError("Failed to send email. Please try again.");
        }
    };
    // console.log('error',error)
    const handleChange = (text, index) => {
        if (isNaN(text)) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        const nextIndex = index + 1;
        if (nextIndex < otp.length) {
            textInputRefs.current[nextIndex].focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.nativeEvent.key === "Backspace") {
            if (otp[index] === "") {
                if (index > 0) {
                    textInputRefs.current[index - 1].focus();
                    const newOtp = [...otp];
                    newOtp[index - 1] = "";
                    setOtp(newOtp);
                }
            } else {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };
    const handleOtpSubmit = async (element, index, event) => {

        const otpCode = otp.join("");
        const body = {
            otp_number: otpCode,
            email,
            user_verification: !userverification,
            employee_verification: employeeverification,
        }
        console.log('clicked')
        if (otpCode.length < 1) {
            setError("Please enter the OTP");
        } else {
            try {
                const res = await ApiAxiosRequest(`${NATIVE_API_URL}/verify/otp/`, body);
                console.log('res', res)
                if (res.data.otp_verified_successfull && res.data.is_email_verified_successfull) {
                    setIsOtpVerified(res.data.otp_verified_successfull);
                    setIsEmailVerified(res.data.is_email_verified_successfull);
                    if (isForget) {
                        navigation.navigate("ForgotPassword");
                    }
                } else if (res.data.otp_is_expired) {
                    setError("OTP is expired. Please request a new one.");
                } else if (res.data.incorrect_otp) {
                    setError("Please enter correct OTP");
                } else {
                    setError(res.isexception.error || "OTP verification failed. Please try again.");
                }
            } catch (err) {
                setError(err.message || "OTP verification failed. Please try again.");
            }
        }
    };

    const renderItem = ({ item, index }) => (
        <TextInput
            ref={ref => textInputRefs.current[index] = ref}
            style={styles.inputBox}
            value={item}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyDown(e, index)}
            keyboardType="numeric"
            maxLength={1}
        />
    );

    return (
        !isOtpVerified ? (
            !isEmailSent ? (
                isForget ? (
                    <ScrollView style={{ backgroundColor: '#FFF' }}>
                        <View style={styles.centeredView}>
                            <View style={styles.otpBox}>
                                <Text style={customStyle.heading}>Send Verification Email</Text>
                                <View style={[customStyle.inputBox, styles.otpInputBox]}>
                                    <TextInput
                                        placeholder='Email'
                                        placeholderTextColor="#535C68"
                                        style={customStyle.inputStyle}
                                        value={email}
                                        onChangeText={(value) => setEmail(value)}
                                        keyboardType="email-address"
                                    />
                                </View>
                                <TouchableOpacity
                                    style={customStyle.loginBtn}
                                    onPress={handleEmailSubmit}
                                >
                                    <Text
                                        style={customStyle.loginText}

                                    >Send OTP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                )
                    : (
                        <ScrollView style={{ backgroundColor: '#FFF' }}>
                            <View style={styles.centeredView}>
                                <View style={styles.otpBox}>
                                    <Text style={customStyle.heading}>Verification Code</Text>
                                    <Text style={styles.otpText}>Please enter the verification code sent to registered email</Text>
                                    <FlatList
                                        data={otp}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal
                                        contentContainerStyle={styles.inputContainer}
                                    />
                                    {otpSent && timeLeft > 0 && (
                                        <Text style={styles.timeText}>OTP is valid for {timeLeft} seconds</Text>
                                    )}
                                    {
                                        showResendButton &&
                                        <View style={styles.resendContainer}>
                                            <Text style={styles.text}>Didn't receive an OTP ?</Text>
                                            <TouchableOpacity
                                                onPress={handleEmailSubmit}
                                            >
                                                <Text style={[styles.resendBtn, styles.submitBtn]}>Resend OTP?</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <TouchableOpacity
                                        style={customStyle.loginBtn}
                                        onPress={handleOtpSubmit}
                                    >
                                        <Text style={customStyle.loginText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    )
            )
                : (
                    <ScrollView style={{ backgroundColor: '#FFF' }}>
                        <View style={styles.centeredView}>
                            <View style={styles.otpBox}>
                                <Text style={customStyle.heading}>Verification Code</Text>
                                <Text style={styles.otpText}>Please enter the verification code sent to registered email</Text>
                                <FlatList
                                    data={otp}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal
                                    contentContainerStyle={styles.inputContainer}
                                />
                                {otpSent && timeLeft > 0 && (
                                    <Text style={styles.timeText}>OTP is valid for {timeLeft} seconds</Text>
                                )}
                                {
                                    showResendButton &&
                                    <View style={styles.resendContainer}>
                                        <Text style={styles.text}>Didn't receive an OTP ?</Text>
                                        <TouchableOpacity
                                            onPress={handleEmailSubmit}
                                        >
                                            <Text style={[styles.resendBtn, styles.submitBtn]}>Resend OTP?</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <TouchableOpacity
                                    style={customStyle.loginBtn}
                                    onPress={handleOtpSubmit}
                                >
                                    <Text style={customStyle.loginText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                )
        )
            : (
                <Text style={{ color: 'red' }}>OTP Verification Successful</Text>
            )
    )
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
    },
    inputBox: {
        width: 40,
        height: 40,
        backgroundColor: 'lightgray',
        marginHorizontal: 5,
        textAlign: 'center',
        fontSize: 14,
        borderRadius: 8,
        marginVertical: 50,
        color: 'black'
    },
    otpText: {
        width: '90%',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray'
    },
    text: {
        color: 'gray',
        fontSize: 12
    },
    resendBtn: {
        fontSize: 13,
        color: primary,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginLeft: 6
    },
    otpInputBox: {
        marginTop: 30
    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: "center",
    },
    timeText: {
        color: 'black',
        fontSize: 12
    }
});

export default OtpPassword;
