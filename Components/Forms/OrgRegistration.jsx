import {
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
import {pickSingle} from 'react-native-document-picker';
import TruncatedText from '../Othercomponent/TruncatedText';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import {NATIVE_API_URL} from '@env';
import { useNavigation } from '@react-navigation/native';
export default function OrgRegistration() {

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
  const [previewimage, setPreviewImage] = useState({
    orgLogo: {},
    documentfile: {},
  });
  const [documenttype, setdocumenttype] = useState([]);
  const [sectortype, setsectortype] = useState([]);
  const [listedtype, setlistedtype] = useState([]);
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);
  const [statedata, setstatedata] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [editOrgEnabled, seteditOrgEnabled] = useState(false)
  const [iscity, setiscity] = useState(!editOrgEnabled?false:true);
  const [isstate, setisstate] = useState(!editOrgEnabled?false:true);

  const navigation = useNavigation()

  function validate() {
    const errors = {};
    if (!Orgdata.orgName) errors.orgName = 'Name is required*';
    if (!Orgdata.OrgLogo)
      errors.OrgLogo = 'Organization Logo is required*';
    if (!Orgdata.documenttype)
      errors.documenttype = 'Document type is required*';
    if (!Orgdata.orgSector)
      errors.orgSector = 'Organization Sector is required*';
    if (!Orgdata.listedtype)
      errors.listedtype = 'Organization listed is required*';
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

  function populateState(id) {
    var data = statedata;
    var tempList = [];
    tempList.push(<Picker.Item
      label="Select Option"
      value="placeholder"
      style={styles.pickerItem}
      color="#535C68"
    />);
    Object.keys(data).forEach(function (key) {
      if (data[key].CountryId == id) {
        tempList.push(<Picker.Item
          key={key}
          label={data[key].Name} // Accessing the object's property using the key
          value={key} 
          style={styles.pickerItem}
        />);
      }
    });
    setisstate(true);
    setstate(tempList);
  }

  function populateCity(id) {
    var data = citydata;
    var tempList = [];
    tempList.push(<Picker.Item
      label="Select Option"
      value="placeholder"
      style={styles.pickerItem}
      color="#535C68"
    />);
    Object.keys(data).forEach(function (key) {
      if (data[key].StateId == id) {
        tempList.push(<Picker.Item
          key={key}
          label={data[key].Name} // Accessing the object's property using the key
          value={key} 
          style={styles.pickerItem}
        />);
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
      />
    );
    Object.keys(data).forEach(function (key) {
      tempList.push(
        <Picker.Item
          key={key}
          label={data[key].Name} // Accessing the object's property using the key
          value={key} 
          style={styles.pickerItem}
        />
      );
    });
    return tempList;
  }


  useEffect(async ()=>{
      try {
      const res = await ApiBackendRequest(`${NATIVE_API_URL}/add/organization/`)
      console.log(res)
      setdocumenttype(populateDropDown(res.data.document_type));
      setsectortype(populateDropDown(res.data.sector_type));
      setlistedtype(populateDropDown(res.data.listed_type));
      setcountry(populateDropDown(res.data.country));
      setstate(populateDropDown(res.data.state));
      setstatedata(res.data.state);
      setcity(populateDropDown(res.data.city));
      setcitydata(res.data.city);
      } catch (error) {
      
      }
  },[])

  const handleChange = (name, value) => {
    setOrgdata(prevData => ({...prevData, [name]: value}));
    if (name == "country") {
      populateState(value);
    } else if (name == "state") {
      populateCity(value);
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const selectImage = async name => {
    try {
      const doc = await pickSingle();
      console.log(name, doc);
      setPreviewImage(prev => ({...prev, [name]: doc}));
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleOrgSubmit = () => {
    const errors = validate();
    setFormErrors(errors);

    setOrgdata({...Orgdata,...previewimage});

    const formData=  new FormData();
    Object.keys(Orgdata).forEach(key => {
      formData.append(key, Orgdata[key]);
    });

      ApiBackendRequest(`${NATIVE_API_URL}${editOrgEnabled ? "/organization/edit/" : "/create/organization/"}`, formData)
        .then((res) => {
          if(res.data){
            if (res.data.is_organization_register_successfull || res.data.organization_edit_sucessfull) {
              // setIsOrganizationCreated(true);
              // navigate("/dashboard/organization");
              // setloading(false);
              console.log("organization created successfully")
              navigation.navigate("OrganizationList")
            }
          } else if(res.isexception){
                // setloading(false);
              
                setError(res.exceptionmessage.error);
                
                validate();
              }
            })
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
              <View style={{display: 'flex', flexDirection: 'coloum'}}>
                <TouchableOpacity onPress={() => selectImage('orgLogo')}>
                  <View style={customStyle.fileBtn}>
                    <FileIcon name="clouduploado" size={20} color="#592DA1" />
                    <Text style={customStyle.fileBtnText}>
                      {Object.keys(previewimage.orgLogo).length == 0 ? (
                        'UPLOAD FILE'
                      ) : (
                        <TruncatedText
                          text={previewimage.orgLogo.name}
                          maxLength={25}
                          dot={true}
                        />
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
                {Object.keys(previewimage.orgLogo).length !== 0 && (
                  <View
                    style={styles.viewContainer}>
                      <TouchableOpacity>
                        <Text style={styles.viewText} >View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setPreviewImage(previous => ({
                            ...previous,
                            orgLogo: {},
                          }))
                        }>
                        <Text style={styles.cancelText}>Cancel</Text>
                      </TouchableOpacity>
                  </View>
                )}
              </View>
              {formsErrors.onChangeTextrgLogo && (
                <Text style={styles.errors}>{formsErrors.orgLogo}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>Document Type</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View style={styles.option}>
                <Picker
                  selectedValue={Orgdata.documenttype}
                  onValueChange={itemValue =>
                    handleChange('documenttype', itemValue)
                  }>
                    {documenttype}
                </Picker>
              </View>
              {formsErrors.documenttype && (
                <Text style={styles.errors}>{formsErrors.documenttype}</Text>
              )}
            </View>
            <View>
              <View style={customStyle.lableContainer}>
                <Text style={customStyle.lableHeading}>Document File</Text>
                <Text style={customStyle.mandatory}>*</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => selectImage('documentfile')}>
                  <View style={customStyle.fileBtn}>
                    <FileIcon name="clouduploado" size={20} color="#592DA1" />
                    <Text style={customStyle.fileBtnText}>
                      {Object.keys(previewimage.documentfile).length == 0 ? (
                        'UPLOAD FILE'
                      ) : (
                        <TruncatedText
                          text={previewimage.documentfile.name}
                          maxLength={25}
                          dot={true}
                        />
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
                {Object.keys(previewimage.documentfile).length !== 0 && (
                  <View
                    style={styles.viewContainer}>
                      <TouchableOpacity>
                        <Text style={styles.viewText}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setPreviewImage(previous => ({
                            ...previous,
                            documentfile: {},
                          }))
                        }>
                        <Text style={styles.cancelText}>Cancel</Text>
                      </TouchableOpacity>
                  </View>
                )}
              </View>
              {formsErrors.documenttype && (
                <Text style={styles.errors}>{formsErrors.documenttype}</Text>
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
                  selectedValue={Orgdata.sectortype}
                  onValueChange={itemValue =>
                    handleChange('sectortype', itemValue)
                  }>
                  {sectortype}
                </Picker>
              </View>
              {formsErrors.sectortype && (
                <Text style={styles.errors}>{formsErrors.sectortype}</Text>
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
                  selectedValue={Orgdata.listedtype}
                  onValueChange={itemValue =>
                    handleChange('listedtype', itemValue)
                  }>
                  {listedtype}
                </Picker>
              </View>
              {formsErrors.listedtype && (
                <Text style={styles.errors}>{formsErrors.listedtype}</Text>
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
                  selectedValue={Orgdata.empCount}
                  onValueChange={itemValue =>
                    handleChange('empCount', itemValue)
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
                  selectedValue={Orgdata.country}
                  onValueChange={itemValue => handleChange('country', itemValue)}
                  >
                  {country}
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
                  selectedValue={Orgdata.state}
                  onValueChange={itemValue => handleChange('state', itemValue)}
                  enabled={isstate}
                  >
                  {state}
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
                  selectedValue={Orgdata.city}
                  onValueChange={itemValue => handleChange('city', itemValue)}
                  enabled={iscity}
                  >
                  {city}
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
                  maxLength={6}
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
  viewContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  viewText: {
    fontSize: 15,
    color:primary ,
    textAlignVertical: 'start',
    fontWeight: '500',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#592DA1',
  },
});
