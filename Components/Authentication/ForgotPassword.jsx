import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { customStyle, primary } from '../Styles/customStyle';
import { Image } from 'react-native-elements';
import { ApiAxiosRequest } from '../../API-Management/ApiBackendRequest';
import { NATIVE_API_URL } from '@env';
import CustomModal from '../CustomModal/CustomModal';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ValideIcon from 'react-native-vector-icons/Entypo';
import { ValidatePassword } from '../../Validation/Validation';
import forgotImg from '../../assets/forgot.png'

const ForgotPassword = () => {
  const [forgotData, setForgotData] = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [validPasswordIcon, setValidPasswordIcon] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    if (name === "newPassword") {
      setValidPasswordIcon(ValidatePassword(value).isValid);
    } else if (name === "confirmPassword") {
      setValidPasswordIcon(ValidatePassword(value).isValid);
    }
    setForgotData((prevValues) => ({ ...prevValues, [name]: value }));
    if (value.trim() !== '') {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };
  };
  const validate = () => {
    const errors = {};
    if (!forgotData.newPassword) errors.newPassword = "Password is required";
    if (!forgotData.confirmPassword) errors.confirmPassword = "Confirm password is required";
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      if (forgotData.newPassword !== forgotData.confirmPassword) {
        setError('Passwords do not match. Please check your password.');
        return;
      }
      setError('')
      const pass = { password: forgotData.newPassword };
      try {
        setLoading(true);
        const res = await ApiAxiosRequest(`${NATIVE_API_URL}/update/password/`, pass);
        setLoading(false);
        if (res.data.password_updated_successFull) {
          setSuccess(true);
          setModalVisible(true);
        } else {
          setError(res.data.error || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        setError('Failed to reset password. Please try again.');
      }
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    !success ? (
      <ScrollView style={customStyle.scrollStyle}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Image
              source={forgotImg}
              style={styles.passwordLogo}
            />
            <Text style={[customStyle.heading, styles.heading]}>Reset Your Password</Text>
            <View style={{ paddingHorizontal: 8 }}>
              <View style={customStyle.inputBox}>
                <Icon name="key" size={20} color={primary} />
                <TextInput
                  style={customStyle.inputStyle}
                  placeholder="Enter new password"
                  placeholderTextColor="#535C68"
                  secureTextEntry={!showNewPassword}
                  value={forgotData.newPassword}
                  onChangeText={(text) => handleChange('newPassword', text)}
                  onFocus={() => setIsNewPasswordFocused(true)}
                  onBlur={() => setIsNewPasswordFocused(false)}
                />
                <TouchableOpacity onPress={toggleNewPasswordVisibility}>
                  <Icon name={showNewPassword ? "eye-off" : "eye"} size={20} color={primary} />
                </TouchableOpacity>
              </View>
              {isNewPasswordFocused && forgotData.newPassword.length > 0 && (
                <View style={customStyle.regexContainer}>
                  <ValideIcon
                    name={validPasswordIcon ? 'check' : 'cross'}
                    color={validPasswordIcon ? 'green' : 'red'}
                    size={18}
                  />
                  {
                    !validPasswordIcon &&
                    <Text style={customStyle.regexText}>Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.</Text>
                  }
                  {
                    validPasswordIcon &&
                    <Text style={customStyle.regexText}>Strong pssword.</Text>
                  }
                </View>
              )}
              <Text style={customStyle.errorText}>{formErrors.newPassword}</Text>
              <View style={customStyle.inputBox}>
                <Icon name="key" size={20} color={primary} />
                <TextInput
                  style={customStyle.inputStyle}
                  placeholder="Confirm new password"
                  placeholderTextColor="#535C68"
                  secureTextEntry={!showConfirmPassword}
                  value={forgotData.confirmPassword}
                  onChangeText={(text) => handleChange('confirmPassword', text)}
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => setIsConfirmPasswordFocused(false)}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                  <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={20} color={primary} />
                </TouchableOpacity>
              </View>
              {isConfirmPasswordFocused && forgotData.confirmPassword.length > 0 && (
                <View style={customStyle.regexContainer}>
                  <ValideIcon
                    name={validPasswordIcon ? 'check' : 'cross'}
                    color={validPasswordIcon ? 'green' : 'red'}
                    size={18}
                  />
                  {
                    !validPasswordIcon &&
                    <Text style={customStyle.regexText}>Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.</Text>
                  }
                  {
                    validPasswordIcon &&
                    <Text style={customStyle.regexText}>Strong pssword.</Text>
                  }
                </View>
              )}
              <Text style={customStyle.errorText}>{formErrors.confirmPassword}</Text>
            </View>

            {error ? <Text style={customStyle.errorText}>{error}</Text> : null}
            <TouchableOpacity style={customStyle.loginBtn} onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={customStyle.loginText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
      : (
        <CustomModal
          visible={modalVisible}
          onClose={closeModal}
          obj={{
            title: 'Password reset!',
            error: false,
            description: 'Password successfully changed.',
            buttonTitle: "Login",
            onPress: closeModal
          }}
        />
      )

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
