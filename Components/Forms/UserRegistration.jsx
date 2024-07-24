import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {customStyle, primary} from '../Styles/customStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ValideIcon from 'react-native-vector-icons/Entypo';
import NameIcon from 'react-native-vector-icons/Ionicons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from 'react-native-elements';
import logo from '../../assets/evalvue-logo.jpg';
import {ValidateEmail, ValidatePassword} from '../../Validation/Validation.js';
import axios from 'axios';
import {NATIVE_API_URL} from '@env';
import CustomModal from '../CustomModal/CustomModal.jsx';

export default function UserRegistration({navigation}) {
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
  const [validEmailIcon, setValidEmailIcon] = useState(false);
  const [validPassowordIcon, setValidPasswordIcon] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

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

  const handleChange = (name, value) => {
    if (name === 'email') {
      setValidEmailIcon(ValidateEmail(value).isValid);
    }
    if (name === 'password') {
      setValidPasswordIcon(ValidatePassword(value).isValid);
    }

    setRegisterData(prevData => ({...prevData, [name]: value}));
    // if (value.trim() !== '') {
    setFormErrors(errors => ({...errors, [name]: null}));
    // }
  };

  const handleSubmit = async () => {
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const options = {
        headers: {'Content-Type': 'application/json'},
      };
      // const headers = {'Content-Type': 'application/json'};
      console.log(NATIVE_API_URL);
      const res = await axios.post(
        `${NATIVE_API_URL}/create/user/`,
        RegisterData,
        options,
      );
      if (res.data) {
        console.log(res.data);
        if (res.data.is_user_register_successfull) {
          navigation.navigate('OtpPassword', {
            state: {isForget: false, email: RegisterData.email},
          });
        }
      } else if (res.isexception) {
        setError(res.exceptionmessage.error);
        setModalVisible(true);
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView>
        <View style={customStyle.loginContainer}>
          <View>
            <Image source={logo} style={styles.loginLogo} />
          </View>
          <Text style={customStyle.heading}>Create Account</Text>
          <View style={styles.inputContainer}>
            <View style={customStyle.inputBox}>
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
            <View
              style={customStyle.inputBox}
              width={
                isEmailFocused && RegisterData.email.length > 0 ? '85%' : '90%'
              }>
              <Icon name="email" size={20} color="#592DA1" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#535C68"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                style={customStyle.inputStyle}
                onChangeText={text => handleChange('email', text)}></TextInput>
              {isEmailFocused && RegisterData.email.length > 0 && (
                <ValideIcon
                  name={validEmailIcon ? 'check' : 'cross'}
                  color={validEmailIcon ? 'green' : 'red'}
                  size={18}
                />
              )}
            </View>
            {formErrors.email && (
              <Text style={styles.errors}>{formErrors.email}</Text>
            )}
            <View style={customStyle.inputBox} width="91%">
              <PhoneIcon name="phone" size={20} color="#592DA1" />
              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor="#535C68"
                style={customStyle.inputStyle}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={number =>
                  handleChange('mobile_number', number)
                }></TextInput>
            </View>
            {formErrors.mobile_number && (
              <Text style={styles.errors}>{formErrors.mobile_number}</Text>
            )}
            <View
              style={customStyle.inputBox}
              width={
                isPasswordFocused && RegisterData.password.length > 0
                  ? '85%'
                  : '90%'
              }>
              <Icon name="key" size={20} color="#592DA1" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#535C68"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                style={customStyle.inputStyle}
                onChangeText={text =>
                  handleChange('password', text)
                }></TextInput>
              {isPasswordFocused && RegisterData.password.length > 0 && (
                <ValideIcon
                  name={validPassowordIcon ? 'check' : 'cross'}
                  color={validPassowordIcon ? 'green' : 'red'}
                  size={18}
                />
              )}
            </View>
            {formErrors.password && (
              <Text style={styles.errors}>{formErrors.password}</Text>
            )}
            <View style={customStyle.inputBox}>
              <Icon name="key" size={20} color="#592DA1" />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#535C68"
                style={customStyle.inputStyle}
                onChangeText={text =>
                  handleChange('confirmPassword', text)
                }></TextInput>
            </View>
            {formErrors.confirmPassword && (
              <Text style={styles.errors}>{formErrors.confirmPassword}</Text>
            )}
          </View>
          <View>
            <CheckBox
              title={'I agree with terms and conditions.'}
              checked={checked}
              size={16}
              checkedColor={primary}
              onPress={() => {
                setChecked(true);
                setTermsAccepted(true);
                // handleChange('termsAccepted', true);
              }}
            />
          </View>
          {formErrors.termsAccepted && (
            <Text style={styles.errors}>{formErrors.termsAccepted}</Text>
          )}
          <TouchableOpacity
            style={customStyle.loginBtn}
            onPress={() => handleSubmit()}>
            <Text style={customStyle.loginText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.text}>Already have a account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.regText}>Login Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal to show error message */}
      <CustomModal
        visible={modalVisible}
        onClose={closeModal}
        obj={{
          title: error ? 'Failed' : 'Success',
          error: error ? true : false,
          description: error || 'Your Account Created Successfully',
          buttonTitle: 'OK',
          onPress: closeModal,
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loginLogo: {
    height: 110,
    width: 110,
    marginTop: 50,
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
  },
});
