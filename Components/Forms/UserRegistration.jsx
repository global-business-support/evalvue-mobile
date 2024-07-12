import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customStyle } from '../Styles/customStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NameIcon from 'react-native-vector-icons/Ionicons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';

export default function UserRegistration() {
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
      <Text style={customStyle.heading}>Create Account</Text>
      <View style={styles.inputContainer}>
        <View style={customStyle.inputBox}>
          <NameIcon name="person-sharp" size={26} color="#592DA1" />
          <TextInput
            placeholder='Name'
            placeholderTextColor="#535C68"
            style={customStyle.inputStyle}
          >
          </TextInput>
        </View>
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
          <PhoneIcon name="phone" size={26} color="#592DA1" />
          <TextInput
            placeholder='Mobile Number'
            placeholderTextColor="#535C68"
            style={customStyle.inputStyle}
          >
          </TextInput>
        </View>
        <View style={customStyle.inputBox}>
          <Icon name="key" size={26} color="#592DA1" />
          <TextInput
            placeholder='Password'
            placeholderTextColor="#535C68"
            style={customStyle.inputStyle}
          >
          </TextInput>
        </View>
        <View style={customStyle.inputBox}>
          <Icon name="key" size={26} color="#592DA1" />
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
        title={'I agree with the terms and conditions.'}
        checked={true}
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

  )
};

const styles = StyleSheet.create({
  loginLogo: {
    height: 110,
    width: 110,
    marginTop: 50
  },
  inputContainer: {
    marginTop: 70
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 14,
  },
  regText: {
    marginTop: 5,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  text: {
    marginTop: 5,
    fontSize: 16
  },

});