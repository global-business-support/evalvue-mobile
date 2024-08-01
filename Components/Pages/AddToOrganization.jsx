import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-native-elements';
import { customStyle, primary } from '../Styles/customStyle';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NATIVE_API_URL } from '@env';
import ApiBackendRequest, { ApiAxiosRequest } from '../../API-Management/ApiBackendRequest';

export default function AddToOrganization() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [orgList, setOrgList] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState({ organization_id: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSentSuccessfull, setOtpSentSuccessfull] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const timerRef = useRef(null);
  const textInputRefs = useRef([]);
  const route = useRoute();
  const { empDetails, orgDetails } = route.params;
  const navigation = useNavigation();

  function populateDropDown(data) {
    const tempList = [
      <Picker.Item
        label="Select Organization"
        value=""
        style={styles.pickerItem}
        color="#535C68"
        key="placeholder"
      />,
    ];
    data.forEach((org) => {
      tempList.push(
        <Picker.Item
          key={org.organization_id}
          label={org.name}
          value={org.organization_id}
          style={styles.pickerItem}
        />,
      );
    });
    return tempList;
  }

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await ApiBackendRequest(`${NATIVE_API_URL}/organizations/`);
        if (res.data) {
          const list = res.data.organization_list.filter((org) => org.organization_verified);
          setOrgList(populateDropDown(list));
          if (res.isexception) {
            setError(res.exceptionmessage.error );
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (name, value) => {
    setSelectedOrg((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  function validate() {
    const newErrors = {};
    if (!selectedOrg.organization_id) {
      newErrors.organization_list = 'Please select an organization';
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }

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

  const SendOTP = async () => {
    setError({});
    const email = empDetails?.email;
    const isCallApi = validate();
    if (isCallApi) {
      try {
        setShowResendButton(false);
        setLoading(true)
        const body= {
          email : email,
          user_verification: false,
          employee_verification: true,
        }
        
        const res = await ApiAxiosRequest(`${NATIVE_API_URL}/shoot/otp/`, body);
        setLoading(false)
        if(res.data){
          if (res.data.otp_send_successfull) {
            setOtpSentSuccessfull(true);
            setOtpSent(true);
            startTimer(); // Uncomment if timer functionality is needed
          }
        } if(res.isexception) {
          setError( res.exceptionmessage );
          console.log(res.exceptionmessage)
        }
      } catch (error) {
        setError(error);
      }
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

  const handleOtpChange = (text, index) => {
    if (isNaN(text)) return;
  
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  
    const nextIndex = index + 1;
    if (nextIndex < otp.length) {
        textInputRefs.current[nextIndex].focus();
    }
  };

  const handleOtpSubmit = async (element, index, event) => {

    const otpCode = otp.join("");
    const body = {
      email: empDetails?.email,
        otp_number: otpCode,
        employee_id : empDetails.employee_id,
        organization_id : selectedOrg.organization_id,
        user_verification: false,
        employee_verification: true,
    }
    if (otpCode.length < 1) {
        setError("Please enter the OTP");
    } else {
        try {
            setLoading(true);
            console.log('one')
            const res = await ApiAxiosRequest(`${NATIVE_API_URL}/verify/otp/`, body);
            setLoading(false)
            if(res.data){
              console.log('two')
              if (res.data.otp_verified_successfull ) {
                if (res.data.otp_verified_successfull) {
                    // setIsOtpVerified(res.data.otp_verified_successfull);
                    console.log('three')
                      navigation.navigate("OrganizationList")
                      console.log("successfull")
                  };
                  setModalVisible(true);
              } else if (res.data.otp_is_expired) {
                  setError("OTP is expired. Please request a new one.");
              } else if (res.data.incorrect_otp) {
                  setError("Please enter correct OTP");
              } else {
                  setError(res.exceptionmessage || "OTP verification failed. Please try again.");
              }
            }
            
        } catch (err) {
            setError(err || "OTP verification failed. Please try again.");
        }
    }
};


  const renderItem = ({ item, index }) => (
    <TextInput
        ref={ref => textInputRefs.current[index] = ref}
        style={styles.inputBox}
        value={item}
        onChangeText={(text) => handleOtpChange(text, index)}
        onKeyPress={(e) => handleKeyDown(e, index)}
        keyboardType="numeric"
        maxLength={1}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingSubContainer}>
        <Text style={styles.headingText}>Add employee to your organization</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}></View>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: empDetails?.employee_image }}
            style={styles.empImg}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.nameText}>{empDetails?.employee_name}</Text>
          <Text style={styles.dsgText}>{empDetails?.designation}</Text>
          <Text style={styles.dsgText}>{empDetails?.email}</Text>
          <Text style={styles.dsgText}>Mobile number: {empDetails?.mobile_number}</Text>
          <Text style={styles.dsgText}>Aadhar number: {empDetails?.aadhar_number}</Text>
        </View>
      </View>
      {!otpSentSuccessfull&&(
        <>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.option}>
            <Picker
            style={{ backgroundColor : '#DAE0E2'}}
              selectedValue={selectedOrg.organization_id}
              onValueChange={(itemValue) => handleChange('organization_id', itemValue)}
            >
              {orgList}
            </Picker>
          </View>
        </View>
        {error?.organization_list && (
          <Text style={styles.errors}>{error?.organization_list}</Text>
        )}
        
          <View style={styles.btnContainer}>
          <TouchableOpacity style={customStyle.loginBtn} onPress={SendOTP}>
              {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={customStyle.loginText}>Send OTP</Text>
              )}
            
          </TouchableOpacity>
        </View>
        </>
    )}
      {error?.general && (
        <Text style={styles.errors}>{error.general}</Text>
      )}

    {otpSentSuccessfull&&(
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
        <ScrollView style={{ backgroundColor: '#FFF' }}>
          <View style={styles.centeredView}>
              <View style={styles.otpBox}>
                  <Text style={customStyle.heading}>Verification Code</Text>
                  <Text style={styles.otpText}>Please enter the verification code sent to Employee's email</Text>
                  <FlatList
                      data={otp}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      contentContainerStyle={styles.inputContainer}
                  />
                  {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
                  {otpSent && timeLeft > 0 && (
                      <Text style={styles.timeText}>OTP is valid for {timeLeft} seconds</Text>
                  )}
                  {
                      showResendButton&&(
                      <View style={styles.resendContainer}>
                          <Text style={styles.text}>Didn't receive an OTP ?</Text>
                          <TouchableOpacity
                              onPress={SendOTP}
                          >
                              {loading ? (
                                  <ActivityIndicator size="small" color={primary} />
                              ) : (
                                  <Text style={[styles.resendBtn, styles.submitBtn]}>Resend OTP?</Text>
                              )}

                          </TouchableOpacity>
                      </View>)
                  }
                  <TouchableOpacity
                      style={customStyle.loginBtn}
                      onPress={handleOtpSubmit}
                  >
                      {loading ? (
                          <ActivityIndicator size="small" color="white" />
                      ) : (
                          <Text style={customStyle.loginText}>Submit</Text>
                      )}
                  </TouchableOpacity>
              </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
  },
  container: {
    marginHorizontal: 8,
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: primary,
  },
  headerContainer: {
    paddingBottom: 45,
    backgroundColor: primary,
    alignItems: 'center',
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -30,
  },
  empImg: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  detailContainer: {
    padding: 10,
  },
  nameText: {
    color: '#2C3335',
    fontWeight: '600',
    fontSize: 16,
  },
  dsgText: {
    color: '#2C3335',
    fontWeight: '500',
    fontSize: 12,
  },
  headingContainer: {
    alignItems: 'center',
  },
  headingSubContainer: {
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 1,
    backgroundColor: '#FFF',
  },
  headingText: {
    color: primary,
    fontSize: 18,
    fontWeight: '600',
  },
  pickerItem: {
    fontSize: 12,
    color: 'black',
    backgroundColor: '#DAE0E2',
  },
  option: {
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 25,
  },
  picker: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  btnContainer: {
    alignItems: 'center',
  },
  errors: {
    color: 'red',
    paddingLeft: 5,
  },
  centeredView: {
  },
  otpBox: {
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
  },
  errorText: {
      color: 'red',
      fontSize: 13,
      marginBottom: 4
  },
  emailImgStyle: {
      height: 110,
      width: 110
  }
});
