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
import NameIcon from 'react-native-vector-icons/Ionicons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from 'react-native-elements';
import logo from '../../assets/evalvue-logo.jpg';

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
  const [termsAccepted, setTermsAccepted] = useState(false);

  function Validate() {
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

  const HandleChange = (name, value) => {
    setRegisterData(prevData => ({...prevData, [name]: value}));
    setFormErrors(prev => ({...prev, [name]: null}));
  };
  const HandleSubmit = () => {
    const errors = Validate();
    setFormErrors(errors);

    console.log(RegisterData);

    if (Object.keys(errors).length === 0) {
      /*=======================ApiCall=======================*/
    }
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
                onChange={text => HandleChange('name', text)}></TextInput>
            </View>
            {formErrors.name && (
              <Text style={styles.errors}>{formErrors.name}</Text>
            )}
            <View style={customStyle.inputBox}>
              <Icon name="email" size={20} color="#592DA1" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#535C68"
                style={customStyle.inputStyle}
                onChange={text => HandleChange('email', text)}></TextInput>
            </View>
            {formErrors.email && (
              <Text style={styles.errors}>{formErrors.email}</Text>
            )}
            <View style={customStyle.inputBox}>
              <PhoneIcon name="phone" size={20} color="#592DA1" />
              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor="#535C68"
                style={customStyle.inputStyle}
                keyboardType="numeric"
                maxLength={10}
                onChange={number =>
                  HandleChange('mobile_number', number)
                }></TextInput>
            </View>
            {formErrors.mobile_number && (
              <Text style={styles.errors}>{formErrors.mobile_number}</Text>
            )}
            <View style={customStyle.inputBox}>
              <Icon name="key" size={20} color="#592DA1" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#535C68"
                style={customStyle.inputStyle}
                onChange={text => HandleChange('password', text)}></TextInput>
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
                onChange={text =>
                  HandleChange('confirmPassword', text)
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
                HandleChange('termsAccepted', true);
              }}
            />
          </View>
          {formErrors.termsAccepted && (
            <Text style={styles.errors}>{formErrors.termsAccepted}</Text>
          )}
          <TouchableOpacity
            style={customStyle.loginBtn}
            onPress={() => HandleSubmit()}>
            <Text style={customStyle.loginText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.text}>Already have a account?</Text>
            <Text style={styles.regText}>Login Now</Text>
          </View>
        </View>
      </ScrollView>
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
