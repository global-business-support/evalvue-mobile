import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { customStyle } from '../Styles/customStyle';
import { Image } from 'react-native-elements';

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (newPassword === '' || confirmPassword === '') {
      setErrorMessage('Both fields are required.');
    } else if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      // Handle password update logic here
      Alert.alert('Success', 'Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage('');
    }
  };

  return (
    <ScrollView style={customStyle.scrollStyle}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'http://test.evalvue.com/assets/newpassword-removebg-preview-DMfh6wlr.png'
            }}
            style={styles.passwordLogo}
          />
          <Text style={[customStyle.heading, styles.heading]}>Reset Your Password</Text>
          <View style={customStyle.inputBox}>
            <TextInput
              style={customStyle.inputStyle}
              placeholder="Enter new password"
              placeholderTextColor="#535C68"
              secureTextEntry
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
          </View>
          <View style={customStyle.inputBox}>
            <TextInput
              style={customStyle.inputStyle}
              placeholder="Confirm new password"
              placeholderTextColor="#535C68"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <TouchableOpacity style={customStyle.loginBtn} onPress={handleSubmit}>
            <Text style={customStyle.loginText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 'auto',
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  passwordLogo: {
    height: 110,
    width: 110,
    marginVertical: 5
  },
  heading: {
    marginBottom: 10
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ForgotPassword;
