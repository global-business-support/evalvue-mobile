import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customStyle, primary } from '../Styles/customStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NameIcon from 'react-native-vector-icons/Ionicons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import logo from '../../assets/evalvue-logo.jpg';

export default function UserRegistration() {
  return (
    <ScrollView>
      <View style={customStyle.loginContainer}>
        <View>
          <Image
            source={logo}
            style={styles.loginLogo}
          />
        </View>
        <Text style={customStyle.heading}>Create Account</Text>
        <View style={styles.inputContainer}>
          <View style={customStyle.inputBox}>
            <NameIcon name="person-sharp" size={20} color="#592DA1" />
            <TextInput
              placeholder='Name'
              placeholderTextColor="#535C68"
              style={customStyle.inputStyle}
            >
            </TextInput>
          </View>
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
            <PhoneIcon name="phone" size={20} color="#592DA1" />
            <TextInput
              placeholder='Mobile Number'
              placeholderTextColor="#535C68"
              style={customStyle.inputStyle}
            >
            </TextInput>
          </View>
          <View style={customStyle.inputBox}>
            <Icon name="key" size={20} color="#592DA1" />
            <TextInput
              placeholder='Password'
              placeholderTextColor="#535C68"
              style={customStyle.inputStyle}
            >
            </TextInput>
          </View>
          <View style={customStyle.inputBox}>
            <Icon name="key" size={20} color="#592DA1" />
            <TextInput
              placeholder='Confirm Password'
              placeholderTextColor="#535C68"
              style={customStyle.inputStyle}
            >
            </TextInput>
          </View>
        </View>
        <View>
          <CheckBox
            title={'I agree with terms and conditions.'}
            checked={true}
            size={16}
            checkedColor={primary}
          />
        </View>
        <TouchableOpacity
          style={customStyle.loginBtn}
        >
          <Text style={customStyle.loginText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.text}>Already have a account?</Text>
          <Text style={styles.regText}>Login Now</Text>
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
  inputContainer: {
    marginTop: 30
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
  text: {
    marginTop: 5,
    fontSize: 12,
    color: '#000'
  },
  checkbox: {
    fontSize: 12
  }
});