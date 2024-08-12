import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { customStyle, primary } from '../Styles/customStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ValideIcon from 'react-native-vector-icons/Entypo';
import NameIcon from 'react-native-vector-icons/Ionicons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import logo from '../../assets/evalvue-logo.jpg';
import { ValidateEmail, ValidatePassword } from '../../Validation/Validation.js';
import { NATIVE_API_URL } from '@env';
import CustomModal from '../CustomModal/CustomModal.jsx';
import { useNavigation } from '@react-navigation/native';
import { ApiAxiosRequest } from '../../API-Management/ApiBackendRequest.js';

export default function UserRegistration() {
  const [checked, setChecked] = useState(false);
  const [RegisterData, setRegisterData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [validEmailIcon, setValidEmailIcon] = useState(false);
  const [validPassowordIcon, setValidPasswordIcon] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const navigation = useNavigation();
  function validate() {
    const errors = {};
    if (!RegisterData.name) errors.name = 'Name is required*';
    if (!RegisterData.email) errors.email = 'Email is required*';
    if (!RegisterData.mobile_number)
      errors.mobile_number = 'Mobile number is required*';
    if (!RegisterData.password) errors.password = 'Password is required*';
    if (RegisterData.password !== RegisterData.confirmPassword)
      errors.confirmPassword = 'Passwords do not match';
    if (!termsAccepted)
      errors.termsAccepted = 'You must accept the terms and conditions';
    return errors;
  }

  const openURL = (url) => {
    Linking.openURL(url).catch((err) => setError("Couldn't load page", err));
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleChange = (name, value) => {
    if (name === 'email') {
      setValidEmailIcon(ValidateEmail(value).isValid);
    }
    if (name === 'password') {
      setValidPasswordIcon(ValidatePassword(value).isValid);
    }

    setRegisterData(prevData => ({ ...prevData, [name]: value }));
    if (value.trim() !== '') {
      setFormErrors(errors => ({ ...errors, [name]: null }));
    }
  };

  const handleSubmit = async () => {
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const res = await ApiAxiosRequest(`${NATIVE_API_URL}/create/user/`, RegisterData);
        if (res.data.is_user_register_successfull) {
            setUserRegistered(res.data.is_user_register_successfull);
            setModalVisible(true);
        } else if (res.isexception) {
          setError(res.exceptionmessage.error);
          setModalVisible(true);
        }
      } catch (error) {
        setError('Registration failed. Please try again.');
        setModalVisible(true);
      }
      setLoading(false);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleOksubmit = () => {
    if (userRegistered) {
      navigation.navigate('Verify', {
        state: { isForget: false, stateEmail: RegisterData.email },
      })
    }
    else {
      setModalVisible(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView style={customStyle.scrollStyle}>
        <View style={customStyle.loginContainer}>
          <View>
            <Image source={logo} style={styles.loginLogo} />
          </View>
          <Text style={customStyle.heading}>Create Account</Text>
          <View style={styles.inputContainer}>
            <View style={[customStyle.inputBox, styles.inputMargin]}>
              <NameIcon name="person-sharp" size={20} color="#592DA1" />
              <TextInput
                placeholder="Name"
                placeholderTextColor="#535C68"
                style={customStyle.inputStyle}
                onChangeText={text => handleChange('name', text)}></TextInput>
            </View>
            {formErrors.name && (
              <Text style={styles.errors}>{formErrors.name}</Text>
            )}
            <View style={[customStyle.inputBox, styles.inputMargin]}>
              <Icon name="email" size={20} color="#592DA1" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#535C68"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                style={customStyle.inputStyle}
                keyboardType="email-address"
                onChangeText={text => handleChange('email', text)}
              />
            </View>
            {formErrors.email && (
              <Text style={styles.errors}>{formErrors.email}</Text>
            )}
            {isEmailFocused && RegisterData.email.length > 0 && (
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
            <View style={[customStyle.inputBox, styles.inputMargin]}>
              <PhoneIcon name="phone" size={20} color="#592DA1" />
              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor="#535C68"
                style={customStyle.inputStyle}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={number =>
                  handleChange('mobile_number', number)
                }
              />
            </View>
            {formErrors.mobile_number && (
              <Text style={styles.errors}>{formErrors.mobile_number}</Text>
            )}
            <View style={[customStyle.inputBox, styles.inputMargin]} width='83%'>
              <Icon name="key" size={20} color="#592DA1" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#535C68"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                secureTextEntry={!showPassword}
                style={customStyle.inputStyle}
                onChangeText={text =>
                  handleChange('password', text)
                }></TextInput>
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#592DA1" />
              </TouchableOpacity>
            </View>
            {isPasswordFocused && RegisterData.password.length > 0 && (
              <View style={customStyle.regexContainer}>
                <ValideIcon
                  name={validPassowordIcon ? 'check' : 'cross'}
                  color={validPassowordIcon ? 'green' : 'red'}
                  size={18}
                />
                {!validPassowordIcon && (
                  <Text style={customStyle.regexText}>
                    Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.
                  </Text>
                )}
                {validPassowordIcon && <Text style={customStyle.regexText}>Strong password.</Text>}
              </View>
            )}
            {formErrors.password && (
              <Text style={styles.errors}>{formErrors.password}</Text>
            )}
            <View style={[customStyle.inputBox, styles.inputMargin]} width='83%'>
              <Icon name="key" size={20} color="#592DA1" />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#535C68"
                onFocus={() => setIsConfirmPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
                secureTextEntry={!showConfirmPassword}
                style={customStyle.inputStyle}
                onChangeText={text =>
                  handleChange('confirmPassword', text)
                }></TextInput>
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#592DA1" />
              </TouchableOpacity>
            </View>
            {formErrors.confirmPassword && (
              <Text style={styles.errors}>{formErrors.confirmPassword}</Text>
            )}
          </View>
          <View>
            <CheckBox
              title={
                <Text style={styles.customTitle}>
                  I agree with{" "}
                  <Text
                    style={styles.link}
                    onPress={() => openURL('https://api.evalvue.com/media/Terms/Terms%20and%20Conditions.pdf')}
                  >terms and conditions
                  </Text>.
                </Text>
              }
              containerStyle={styles.checkBoxContainer}
              checked={checked}
              size={16}
              checkedColor={primary}
              onPress={() => {
                setChecked(true);
                setTermsAccepted(true);
              }}
            />
          </View>
          {formErrors.termsAccepted && (
            <Text style={styles.errors}>{formErrors.termsAccepted}</Text>
          )}
          <TouchableOpacity
            style={customStyle.loginBtn}
            onPress={() => handleSubmit()}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={customStyle.loginText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.text}>Already have a account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.regText}>Login Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomModal
        visible={modalVisible}
        onClose={closeModal}
        obj={{
          title: error ? 'Failed' : 'Verify your email',
          error: error ? true : false,
          description: error || 'Please Verify your email',
          buttonTitle: 'OK',
          onPress: handleOksubmit,
        }}
      />

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginLogo: {
    height: 110,
    width: 110,
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 30,
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 14,
    paddingBottom: 8,
  },
  regText: {
    marginTop: 5,
    fontSize: 12,
    color: '#592DA1',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
  checkbox: {
    fontSize: 12,
  },
  errors: {
    color: 'red',
    paddingLeft: 5,
    fontSize: 12
  },
  inputMargin: {
    marginVertical: 6
  },
  customTitle: {
    width: '90%',
    fontSize: 12,
    color: 'black',
    marginLeft: 4
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  checkBoxContainer: {
    borderWidth: 0,
    backgroundColor: '#FFF'
  },
});
