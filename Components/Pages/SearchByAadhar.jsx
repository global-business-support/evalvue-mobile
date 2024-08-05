import {ScrollView, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Image} from 'react-native-elements';
import DotIcon from 'react-native-vector-icons/Entypo';
import {listStyle} from '../Styles/listStyle';
import {NATIVE_API_URL} from '@env';
import ListShimmerUI from '../ShimmerUI/ListShimmerUI';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import TruncatedText from '../Othercomponent/TruncatedText';
import { useNavigation } from '@react-navigation/native';

export default function SearchByAadhar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [empmappedbyaadhar, setempmappedbyaadhar] = useState(false);

  const navigation = useNavigation();

  let value = '';
  const handleSearchChange = async (number) => {

    value = number.replace(/[^0-9]/g, '');
    setSearchTerm(value);
    // console.log(value)
    if (value.length > 0) {
      try {
        const response = await ApiBackendRequest(`${NATIVE_API_URL}/search/employee/aadhar/`, {
          aadhar_number: value,
        })
        // console.log(response.data.employees_list_by_aadhar)
          if (response.data) {
            setEmployees(response.data.employees_list_by_aadhar);
            setempmappedbyaadhar(response.data.employees_mapped_to_aadhar);
          } else if (response.isexception) {
            setError(response.exceptionmessage.error);
          }

      } catch (error) {
        setError('Error fetching employee data', error);
      } finally {
        setLoading(false);
      }
    }
  };
  console.log(employees)

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
      onPress={()=>{navigation.navigate("EmployeeDetails",{
        empDetails: item,
        orgId : item.organization_id,
        empId: item.employee_id,
        orgName : item.organization_name,
        }
      )}}
       >
        <View style={listStyle.listContainer}>
          <View style={listStyle.listSubContainer}>
            <Image
              source={{ uri: item.employee_image }}
              style={listStyle.listLogoImg}
            />
            <View>
              <Text style={listStyle.listTitleText}>
                <TruncatedText
                  text={item.employee_name}
                  maxLength={20}
                  dot={true}
                />
              </Text>
              <Text style={listStyle.listSubTitleText}>
                <TruncatedText text={item.designation} maxLength={20} dot={true}/>
              </Text>
              <Text style={styles.aadharnum}>Aadhaar : {item.aadhar_number}</Text>
            </View>
          </View>
        
          <View style={styles.buttons}>
          <View style={styles.activeInactive}>
                  <View style={[styles.dot, { backgroundColor : (item.status_id == 1)? '#00e600' : '#ff8566'}]}
                  />
                  <Text style={[styles.activeInactiveText,{ color: (item.status_id == 1)? '#00e600' : '#ff8566', paddingRight : (item.status_id == 1)? 15 : '#ff8566' }]}>
                    {(item.status_id == 1)? 'Active' : 'In Active'}
                  </Text>
          </View>
            <TouchableOpacity
              style={listStyle.btnStyle}
              onPress={()=>{navigation.navigate("EmployeeDetails",{
                empDetails: item,
                SearchByAadhar : true,
                orgId : item.organization_id,
                empId: item.employee_id,
                orgName : item.organization_name,
                }
              )}}
              >
              <Text style={listStyle.listBtn}>View</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyMessage}>Please Search for Employee...</Text>
    </View>
  );

  if (loading) {
    return <ListShimmerUI />
  };

  return (
    <View style={[listStyle.listMainContainer]}>
      {/* <View style={listStyle.listHeaderContainer}>
        <Text style={listStyle.listHeading}>Search By Aadhaar Number</Text>
        <TextInput
        value={searchTerm}
          style={listStyle.searchInputStyle}
          placeholder="Employee Aadhar number..."
          placeholderTextColor="#592DA1"
          keyboardType="numeric"
          maxLength={12}
          onChangeText={number => handleSearchChange(number)}
        />
      </View> */}
      <View style={styles.addStyle}>
          <Text style={listStyle.listHeading}>Search by Aadhaar </Text>
        
        <View style={styles.searchContainer}>
          <SearchIcon
            name="search"
            size={20}
            color="#592DA1"
            style={styles.searchIcon}
          />
          <TextInput
            style={listStyle.searchInputStyle}
            placeholder="Employee Aadhar number..."
            placeholderTextColor="#592DA1"
            keyboardType="numeric"
            maxLength={12}
            onChangeText={number => handleSearchChange(number)}
          />
        </View>
          <Text style={styles.searchHeading}>Search History</Text>
        </View>
        <View>
            <FlatList
              data={employees}
              keyExtractor={item => item?.employee_id.toString()}
              renderItem={renderItem}
              ListEmptyComponent={renderEmptyList}
              contentContainerStyle={[listStyle.listFooterContainer,{backgroundColor : ''}]}
              scrollEnabled
              removeClippedSubviews={true}
              initialNumToRender={10}
            />
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  searchHeading: {
    textAlign: 'left',
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#592DA1',
    fontWeight: 'bold',
    paddingHorizontal: 8
  },
  aadharnum : {
    color: '#535C68',
        fontSize: 12,
        marginLeft: 6,
  },
  addStyle: {
    backgroundColor : 'white'
  },
  searchContainer: {
    backgroundColor: '#F2EFF8',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: 8,
    marginTop: 8,
    marginHorizontal: 10
  },
  searchInputStyle: {
    flex: 1,
    color: '#592DA1',
  },
  buttons: {
    alignItems: 'flex-start',
    gap : 10,
    paddingRight : 5,
  },
  activeInactive : {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 3,
  },
  dot :{
    height: 8,
    width: 8,
    borderRadius: 8 / 2, 
    marginTop: 5,
  },
  activeInactiveText : {
    fontWeight: '500', 
    fontSize : 12
  }
});