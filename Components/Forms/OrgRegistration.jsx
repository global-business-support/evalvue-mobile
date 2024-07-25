import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {customStyle, windowHeight} from '../Styles/customStyle';
import NameIcon from 'react-native-vector-icons/Ionicons';
import FileIcon from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';

export default function OrgRegistration() {
  const [selectedValue, setSelectedValue] = useState({
    documentType: '',
    orgSector: '',
    orgListed: '',
    empCount: '',
    country: '',
    state: '',
    city: '',
  });
  const [Orgdata, setOrgdata] = useState({
    orgName: '',
    documentNumber: '',
    gstNumber: '',
    referralNumber: '',
    address: '',
    pinCode: '',
  });
  const [formsErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);

  function validate() {
    const errors = {};
    if (!Orgdata.orgName) errors.orgName = 'Name is required*';
    if (!Orgdata.documentType)
      errors.documentType = 'Document type is required*';
    if (!Orgdata.orgSector)
      errors.orgSector = 'Organization Sector is required*';
    if (!Orgdata.orgListed)
      errors.orgListed = 'Organization listed is required*';
    if (!Orgdata.documentNumber)
      errors.documentNumber = 'Document Number is required*';
    if (!Orgdata.empCount) errors.empCount = 'Number of Employees is required*';
    if (!Orgdata.address) errors.address = 'Address is required*';
    if (!Orgdata.country) errors.country = 'Country is required*';
    if (!Orgdata.state) errors.state = 'State is required*';
    if (!Orgdata.city) errors.city = 'City is required*';
    if (!Orgdata.pinCode) errors.pinCode = 'Pin Code is required*';
    return errors;
  }

  const updateData = (key, itemValue) => {
    setSelectedValue(prevState =>
      Object.assign({}, prevState, {[key]: itemValue}),
    );
  };
  const handleChange = (name, value) => {
    setOrgdata(prevData => ({...prevData, [name]: value}));
  };

  const handleOrgSubmit = () => {
    const errors = validate();
    setFormErrors(errors);
    setOrgdata({...Orgdata, ...selectedValue});
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={[customStyle.heading, {paddingBottom: 8}]}>
            Register your organization
          </Text>
          <ScrollView
            style={styles.orgScroll}
            horizontal={false}
            scrollEventThrottle={16}>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>Organization Name</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={customStyle.inputBox}>
                <NameIcon name="person-sharp" size={20} color="#592DA1" />
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="#535C68"
                  style={customStyle.inputStyle}
                  onChangeText={text => handleChange('orgName', text)}
                />
              </View>
              {formsErrors.orgName && (
                <Text style={styles.errors}>{formsErrors.orgName}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>Organization Logo</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <TouchableHighlight>
                <View style={customStyle.fileBtn}>
                  <FileIcon name="clouduploado" size={20} color="#592DA1" />
                  <Text style={customStyle.fileBtnText}>UPLOAD FILE</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>Document Type</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={styles.option}>
                <Picker
                  selectedValue={selectedValue.documentType}
                  onValueChange={itemValue =>
                    updateData('documentType', itemValue)
                  }>
                  <Picker.Item
                    label="Select Option"
                    value="placeholder"
                    style={styles.pickerItem}
                    color="#535C68"
                  />
                  <Picker.Item
                    label="Aadhar Card"
                    value="Aadhar Card"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="Pan Card"
                    value="Pan Card"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="Driving Licence"
                    value="Driving Licence"
                    style={styles.pickerItem}
                  />
                </Picker>
              </View>
              {formsErrors.documentType && (
                <Text style={styles.errors}>{formsErrors.documentType}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>Document File</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <TouchableHighlight>
                <View style={customStyle.fileBtn}>
                  <FileIcon name="clouduploado" size={20} color="#592DA1" />
                  <Text style={customStyle.fileBtnText}>UPLOAD FILE</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View></View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>
                  Organization Sector
                </Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={styles.option}>
                <Picker
                  selectedValue={selectedValue.orgSector}
                  onValueChange={itemValue =>
                    updateData('orgSector', itemValue)
                  }>
                  <Picker.Item
                    label="Select Option"
                    value="placeholder"
                    style={styles.pickerItem}
                    color="#535C68"
                  />
                  <Picker.Item
                    label="Technology Sector"
                    value="Technology Sector"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="Technology Sector"
                    value="Technology Sector"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="Technology Sector"
                    value="Technology Sector"
                    style={styles.pickerItem}
                  />
                </Picker>
              </View>
              {formsErrors.orgSector && (
                <Text style={styles.errors}>{formsErrors.orgSector}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>
                  Organization Listed
                </Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={styles.option}>
                <Picker
                  selectedValue={selectedValue.orgListed}
                  onValueChange={itemValue =>
                    updateData('orgListed', itemValue)
                  }>
                  <Picker.Item
                    label="Select Option"
                    value="placeholder"
                    style={styles.pickerItem}
                    color="#535C68"
                  />
                  <Picker.Item
                    label="Public Sector"
                    value="Public Sector"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="Private Sector"
                    value="Private Sector"
                    style={styles.pickerItem}
                  />
                </Picker>
              </View>
              {formsErrors.orgListed && (
                <Text style={styles.errors}>{formsErrors.orgListed}</Text>
              )}
            </View>

            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>Document Number</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={customStyle.inputBox}>
                <TextInput
                  placeholder="CA947318A"
                  placeholderTextColor="#535C68"
                  style={customStyle.inputStyle}
                  onChangeText={text => handleChange('documentNumber', text)}
                />
              </View>
              {formsErrors.documentNumber && (
                <Text style={styles.errors}>{formsErrors.documentNumber}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>
                  GST Number (Optional)
                </Text>
              </View>
              <View style={customStyle.inputBox}>
                <TextInput
                  placeholder="CA9473186A789A"
                  placeholderTextColor="#535C68"
                  style={customStyle.inputStyle}
                  onChangeText={text => handleChange('gstNumber', text)}
                />
              </View>
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>
                  Number of Employees
                </Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={styles.option}>
                <Picker
                  selectedValue={selectedValue.empCount}
                  onValueChange={itemValue =>
                    updateData('empCount', itemValue)
                  }>
                  <Picker.Item
                    label="Select any one"
                    value="placeholder"
                    style={styles.pickerItem}
                    color="#535C68"
                  />
                  <Picker.Item
                    label="1 - 50"
                    value="1-50"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="100-200"
                    value="100-200"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="200-300"
                    value="200-300"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="300-500"
                    value="300-500"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="500-1000"
                    value="500-1000"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="Above 100"
                    value="Above 100"
                    style={styles.pickerItem}
                  />
                </Picker>
              </View>
              {formsErrors.empCount && (
                <Text style={styles.errors}>{formsErrors.empCount}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>
                  Referral Number (Optional)
                </Text>
              </View>
              <View style={customStyle.inputBox}>
                <TextInput
                  placeholder="Referral Number"
                  placeholderTextColor="#535C68"
                  style={customStyle.inputStyle}
                  onChangeText={text => handleChange('referralNumber', text)}
                />
              </View>
            </View>
            <Text style={styles.addHeading}>Address</Text>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>Address</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={customStyle.inputBox}>
                <TextInput
                  placeholder="Area Ex-148, Nehru Nagar"
                  placeholderTextColor="#535C68"
                  style={customStyle.inputStyle}
                  onChangeText={text => handleChange('address', text)}
                />
              </View>
              {formsErrors.address && (
                <Text style={styles.errors}>{formsErrors.address}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>Country</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={styles.option}>
                <Picker
                  selectedValue={selectedValue.country}
                  onValueChange={itemValue => updateData('country', itemValue)}>
                  <Picker.Item
                    label="Select Country"
                    value="placeholder"
                    style={styles.pickerItem}
                    color="#535C68"
                  />
                  <Picker.Item
                    label="India"
                    value="India"
                    style={styles.pickerItem}
                  />
                </Picker>
              </View>
              {formsErrors.country && (
                <Text style={styles.errors}>{formsErrors.country}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>State</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={styles.option}>
                <Picker
                  selectedValue={selectedValue.state}
                  onValueChange={itemValue => updateData('state', itemValue)}>
                  <Picker.Item
                    label="Select State"
                    value="placeholder"
                    style={styles.pickerItem}
                    color="#535C68"
                  />
                  <Picker.Item
                    label="Madhya Pradesh"
                    value="Madhya Pradesh"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="Arunachal Pradesh"
                    value="Arunachal Pradesh"
                    style={styles.pickerItem}
                  />
                </Picker>
              </View>
              {formsErrors.state && (
                <Text style={styles.errors}>{formsErrors.state}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>City</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={styles.option}>
                <Picker
                  selectedValue={selectedValue.city}
                  onValueChange={itemValue => updateData('city', itemValue)}>
                  <Picker.Item
                    label="Select City"
                    value="placeholder"
                    style={styles.pickerItem}
                    color="#535C68"
                  />
                  <Picker.Item
                    label="Indore"
                    value="Indore"
                    style={styles.pickerItem}
                  />
                  <Picker.Item
                    label="Bhopal"
                    value="Bhopal"
                    style={styles.pickerItem}
                  />
                </Picker>
              </View>
              {formsErrors.city && (
                <Text style={styles.errors}>{formsErrors.city}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>Pin Code</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={customStyle.inputBox}>
                <TextInput
                  placeholder="Pin Number"
                  placeholderTextColor="#535C68"
                  style={customStyle.inputStyle}
                  keyboardType="numeric"
                  onChangeText={number => handleChange('pinCode', number)}
                />
              </View>
              {formsErrors.pinCode && (
                <Text style={styles.errors}>{formsErrors.pinCode}</Text>
              )}
            </View>
          </ScrollView>
          <TouchableOpacity
            style={customStyle.loginBtn}
            onPress={() => handleOrgSubmit()}>
            <Text style={customStyle.loginText}>
              Register Your Organization
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#592DA1',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  orgScroll: {
    flex: 1,
    // height: windowHeight - ((26 * windowHeight) / 100),
    backgroundColor: '#FFF',
  },
  option: {
    width: '90%',
    backgroundColor: '#DAE0E2',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#592DA1',
  },
  pickerItem: {
    color: 'red',
    fontSize: 12,
    color: 'black',
    backgroundColor: '#DAE0E2',
  },
  addHeading: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
    marginTop: 18,
  },
  errors: {
    color: 'red',
    paddingLeft: 5,
  },
});
