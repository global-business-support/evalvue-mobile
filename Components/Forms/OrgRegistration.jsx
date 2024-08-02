import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {customStyle, primary, windowHeight} from '../Styles/customStyle';
import NameIcon from 'react-native-vector-icons/Ionicons';
import FileIcon from 'react-native-vector-icons/AntDesign';
import CancelImgIcon from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import {Image} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import TruncatedText from '../Othercomponent/TruncatedText';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import {NATIVE_API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../CustomModal/CustomModal';



export default function OrgRegistration() {
  const [Orgdata, setOrgdata] = useState({
    organization_name: '',
    document_type_id: '',
    sector_id: '',
    listed_id: '',
    number_of_employee: '',
    country_id : '',
    state_id : '',
    city_id : '',
    gstin: '',
    referralNumber: '',
    area: '',
    pincode: '',
    organization_image: {},
    document_file: {},
  });
  const [formsErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);
  const [documenttype, setdocumenttype] = useState([]);
  const [sectortype, setsectortype] = useState([]);
  const [listedtype, setlistedtype] = useState([]);
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);
  const [statedata, setstatedata] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [editOrgEnabled, seteditOrgEnabled] = useState(false);
  const [iscity, setiscity] = useState(!editOrgEnabled ? false : true);
  const [isstate, setisstate] = useState(!editOrgEnabled ? false : true);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  function validate() {
    const errors = {};
    if (!Orgdata.organization_name) errors.organization_name = 'Name is required*';
    if (!Orgdata.organization_image) errors.organization_image = 'Organization Logo is required*';
    if (!Orgdata.document_file)
      errors.document_file = 'Document File is required*';
    if (!Orgdata.document_type_id)
      errors.document_type_id = 'Document type is required*';
    if (!Orgdata.sector_id)
      errors.sector_id = 'Organization Sector is required*';
    if (!Orgdata.listed_id)
      errors.listed_id = 'Organization listed is required*';
    if (!Orgdata.document_number)
      errors.document_number = 'Document Number is required*';
    if (!Orgdata.number_of_employee) errors.number_of_employee = 'Number of Employees is required*';
    if (!Orgdata.area) errors.area = 'Address is required*';
    if (!Orgdata.country_id) errors.country_id = 'Country is required*';
    if (!Orgdata.state_id) errors.state_id = 'State is required*';
    if (!Orgdata.city_id) errors.city_id = 'City is required*';
    if (!Orgdata.pincode) errors.pincode = 'Pin Code is required*';
    return errors;
  }

  function populateState(id) {
    var data = statedata;
    var tempList = [];
    tempList.push(
      <Picker.Item
        label="Select Option"
        value="placeholder"
        style={styles.pickerItem}
        color="#535C68"
      />,
    );
    Object.keys(data).forEach(function (key) {
      if (data[key].CountryId == id) {
        tempList.push(
          <Picker.Item
            key={key}
            label={data[key].Name} // Accessing the object's property using the key
            value={key}
            style={styles.pickerItem}
          />,
        );
      }
    });
    setisstate(true);
    setstate(tempList);
  }

  function populateCity(id) {
    var data = citydata;
    var tempList = [];
    tempList.push(
      <Picker.Item
        label="Select Option"
        value="placeholder"
        style={styles.pickerItem}
        color="#535C68"
      />,
    );
    Object.keys(data).forEach(function (key) {
      if (data[key].StateId == id) {
        tempList.push(
          <Picker.Item
            key={key}
            label={data[key].Name} // Accessing the object's property using the key
            value={key}
            style={styles.pickerItem}
          />,
        );
      }
    });
    setiscity(true);
    setcity(tempList);
  }

  function populateDropDown(data) {
    var tempList = [];
    tempList.push(
      <Picker.Item
        label="Select Option"
        value="placeholder"
        style={styles.pickerItem}
        color="#535C68"
      />,
    );
    Object.keys(data).forEach(function (key) {
      tempList.push(
        <Picker.Item
          key={key}
          label={data[key].Name} // Accessing the object's property using the key
          value={key}
          style={styles.pickerItem}
        />,
      );
    });
    return tempList;
  }

  useEffect(async () => {
    try {
      const res = await ApiBackendRequest(
        `${NATIVE_API_URL}/add/organization/`,
      );
      setdocumenttype(populateDropDown(res.data.document_type));
      setsectortype(populateDropDown(res.data.sector_type));
      setlistedtype(populateDropDown(res.data.listed_type));
      setcountry(populateDropDown(res.data.country));
      setstate(populateDropDown(res.data.state));
      setstatedata(res.data.state);
      setcity(populateDropDown(res.data.city));
      setcitydata(res.data.city);
    } catch (error) {}
  }, []);

  const handleChange = (name, value) => {
    setOrgdata(prevData => ({...prevData, [name]: value}));
    if (name == 'country_id') {
      populateState(value);
    } else if (name == 'state_id') {
      populateCity(value);
    }
    
    setFormErrors(prevErrors => ({...prevErrors, [name]: ''}));
  };

  const selectImage = async name => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log(name, doc);
      setOrgdata(prev => ({...prev, [name]: doc}));
    } catch (error) {
      console.log("error selectimage",error);
    }
  };

  
  
  const handleOrgSubmit = async () => {
    
    const errors = validate();
    setFormErrors(errors);
    
    const formData = new FormData();
    Object.keys(Orgdata).forEach(key => {
      formData.append(key, Orgdata[key]);
    });

    try{
      console.log('before api')
      const res = await ApiBackendRequest(
        `${NATIVE_API_URL}${'/create/organization/'}`,formData,
      );
      if (res.data) {
        console.log('after api')
        if (
          res.data.is_organization_register_successfull ||
          res.data.organization_edit_sucessfull
        ) {
          console.log('organization created successfully');
          navigation.navigate('OrganizationList');
        }
      } else if (res.isexception) {
        console.log(res.exceptionmessage.error)
        setError(res.exceptionmessage.error);
        setModalVisible(true);
        validate();
      }
    } catch (error) {
      setError(error);
      setModalVisible(true);
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
                  <Text style={customStyle.lableHeading}>
                    Organization Name
                  </Text>
                  <Text style={customStyle.mandatory}>*</Text>
                </View>
                <View style={customStyle.inputBox}>
                  <NameIcon name="person-sharp" size={20} color="#592DA1" />
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="#535C68"
                    style={customStyle.inputStyle}
                    onChangeText={text => handleChange('organization_name', text)}
                  />
                </View>
                {formsErrors.organization_name && (
                  <Text style={styles.errors}>{formsErrors.organization_name}</Text>
                )}
              </View>

              <View>
                <View style={customStyle.lableContainer}>
                  <Text style={customStyle.lableHeading}>
                    Organization Logo
                  </Text>
                  <Text style={customStyle.mandatory}>*</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'coloum'}}>
                  <TouchableOpacity onPress={() => selectImage('organization_image')}>
                    <View style={customStyle.fileBtn}>
                      <FileIcon name="clouduploado" size={20} color="#592DA1" />
                      <Text style={customStyle.fileBtnText}>
                        {Object.keys(Orgdata.organization_image).length == 0 ? (
                          'UPLOAD FILE'
                        ) : (
                          <TruncatedText
                            text={Orgdata.organization_image.name}
                            maxLength={25}
                            dot={true}
                          />
                        )}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {Object.keys(Orgdata.organization_image).length !== 0 && (
                    <View style={styles.viewContainer}>
                      <TouchableOpacity>
                        <Text style={styles.viewText}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setOrgdata(previous => ({
                            ...previous,
                            organization_image: {},
                          }))
                        }>
                        <Text style={styles.cancelText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                {formsErrors.organization_image && (
                  <Text style={styles.errors}>{formsErrors.organization_image}</Text>
                )}
              </View>
              <View>
                <View style={customStyle.lableContainer}>
                  <Text style={customStyle.lableHeading}>Document Type</Text>
                  <Text style={customStyle.mandatory}>*</Text>
                </View>
                <View style={styles.option}>
                  <Picker
                    selectedValue={Orgdata.document_type_id}
                    onValueChange={itemValue =>
                      handleChange('document_type_id', itemValue)
                    }>
                    {documenttype}
                  </Picker>
                </View>
                {formsErrors.document_type_id && (
                  <Text style={styles.errors}>{formsErrors.document_type_id}</Text>
                )}
              </View>
              <View>
                <View style={customStyle.lableContainer}>
                  <Text style={customStyle.lableHeading}>Document File</Text>
                  <Text style={customStyle.mandatory}>*</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => selectImage('document_file')}>
                    <View style={customStyle.fileBtn}>
                      <FileIcon name="clouduploado" size={20} color="#592DA1" />
                      <Text style={customStyle.fileBtnText}>
                        {Object.keys(Orgdata.document_file).length == 0 ? (
                          'UPLOAD FILE'
                        ) : (
                          <TruncatedText
                            text={Orgdata?.document_file.name}
                            maxLength={25}
                            dot={true}
                          />
                        )}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {Object.keys(Orgdata.document_file).length !== 0 && (
                    <View style={styles.viewContainer}>
                      <TouchableOpacity>
                        <Text style={styles.viewText}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setOrgdata(previous => ({
                            ...previous,
                            document_file: {},
                          }))
                        }>
                        <Text style={styles.cancelText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                {formsErrors.document_file && (
                  <Text style={styles.errors}>{formsErrors.document_file}</Text>
                )}
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
                    selectedValue={Orgdata.sector_id}
                    onValueChange={itemValue =>
                      handleChange('sector_id', itemValue)
                    }>
                    {sectortype}
                  </Picker>
                </View>
                {formsErrors.sector_id && (
                  <Text style={styles.errors}>{formsErrors.sector_id}</Text>
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
                    selectedValue={Orgdata.listed_id}
                    onValueChange={itemValue =>
                      handleChange('listed_id', itemValue)
                    }>
                    {listedtype}
                  </Picker>
                </View>
                {formsErrors.listed_id && (
                  <Text style={styles.errors}>{formsErrors.listed_id}</Text>
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
                    onChangeText={text => handleChange('document_number', text)}
                  />
                </View>
                {formsErrors.document_number && (
                  <Text style={styles.errors}>
                    {formsErrors.document_number}
                  </Text>
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
                    onChangeText={text => handleChange('gstin', text)}
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
                    selectedValue={Orgdata.number_of_employee}
                    onValueChange={itemValue =>
                      handleChange('number_of_employee', itemValue)
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
                {formsErrors.number_of_employee && (
                  <Text style={styles.errors}>{formsErrors.number_of_employee}</Text>
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
                    onChangeText={text => handleChange('area', text)}
                  />
                </View>
                {formsErrors.area && (
                  <Text style={styles.errors}>{formsErrors.area}</Text>
                )}
              </View>
              <View>
                <View style={customStyle.lableContainer}>
                  <Text style={customStyle.lableHeading}>Country</Text>
                  <Text style={customStyle.mandatory}>*</Text>
                </View>
                <View style={styles.option}>
                  <Picker
                    selectedValue={Orgdata.country_id}
                    onValueChange={itemValue =>
                      handleChange('country_id', itemValue)
                    }>
                    {country}
                  </Picker>
                </View>
                {formsErrors.country_id && (
                  <Text style={styles.errors}>{formsErrors.country_id}</Text>
                )}
              </View>
              <View>
                <View style={customStyle.lableContainer}>
                  <Text style={customStyle.lableHeading}>State</Text>
                  <Text style={customStyle.mandatory}>*</Text>
                </View>
                <View style={styles.option}>
                  <Picker
                    selectedValue={Orgdata.state_id}
                    onValueChange={itemValue =>
                      handleChange('state_id', itemValue)
                    }
                    enabled={isstate}>
                    {state}
                  </Picker>
                </View>
                {formsErrors.state_id && (
                  <Text style={styles.errors}>{formsErrors.state_id}</Text>
                )}
              </View>
              <View>
                <View style={customStyle.lableContainer}>
                  <Text style={customStyle.lableHeading}>City</Text>
                  <Text style={customStyle.mandatory}>*</Text>
                </View>
                <View style={styles.option}>
                  <Picker
                    selectedValue={Orgdata.city_id}
                    onValueChange={itemValue => handleChange('city_id', itemValue)}
                    enabled={iscity}>
                    {city}
                  </Picker>
                </View>
                {formsErrors.city_id && (
                  <Text style={styles.errors}>{formsErrors.city_id}</Text>
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
                    maxLength={6}
                    onChangeText={number => handleChange('pincode', number)}
                  />
                </View>
                {formsErrors.pincode && (
                  <Text style={styles.errors}>{formsErrors.pincode}</Text>
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
        <CustomModal
          visible={modalVisible}
          onClose={closeModal}
          obj={{
            title: 'Error',
            error: error ? true : false,
            description: error || 'Something went wrong.',
            buttonTitle: 'OK',
            onPress: closeModal,
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginVertical: 2,
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
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  viewText: {
    fontSize: 15,
    color: primary,
    textAlignVertical: 'start',
    fontWeight: '500',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#592DA1',
  },
});
