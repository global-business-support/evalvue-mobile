import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  RefreshControl,
  Alert, Button,
} from 'react-native';
import {Image} from 'react-native-elements';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import DotIcon from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NATIVE_API_URL} from '@env';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import TruncatedText from '../Othercomponent/TruncatedText';
import {listStyle} from '../Styles/listStyle';
import ThreeDotMenu from './ThreeDotMenu ';

export default function EmployeeList() {
  const [Empdata, setEmpdata] = useState([]);
  const [filteredEmpData, setFilteredEmpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const route = useRoute();
  const {orgDetails} = route.params;
  const navigation = useNavigation(); // Ensure navigation is defined
  

  // Fetch data
  const fetchdata = useCallback(async () => {
    try {
      const res = await ApiBackendRequest(`${NATIVE_API_URL}/employees/`, {
        organization_id: orgDetails.orgId,
      });
      setEmpdata(res.data.employee_list);
      setFilteredEmpData(res.data.employee_list);
      if (res.isexception) {
        console.error(res.exceptionmessage.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [orgDetails.orgId]);

  useEffect(() => {
    fetchdata();
  }, [fetchdata]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchdata();
  }, [fetchdata]);

  const handleSearch = useCallback(
    query => {
      setSearchQuery(query);
      if (query) {
        const filteredData = Empdata.filter(item =>
          item.employee_name.toLowerCase().includes(query.toLowerCase()),
        );
        setFilteredEmpData(filteredData);
      } else {
        setFilteredEmpData(Empdata);
      }
    },
    [Empdata],
  );

  // three dot function

  const showAlert = (empname) => {
    Alert.alert(
      "Terminate Employee",
      `Are you sure you want to terminate${empname}`,
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

  const handleTerminate = (empId, OrgId, empname) => {
    const delId = { organization_id: OrgId, employee_id: empId };
    showAlert(empname)
    // if (confirmuser) {
    //   Apibackendrequest(`${apiUrl}/terminate/employee/`, delId)
    //     .then((res) => {
    //       if (res) {
    //         if (res.exceptionmessage.is_employee_terminated_successfull) {
    //           window.location.reload();
    //         } else if (res.isexception) {
    //           setError(res.exceptionmessage.error);
    //         }
    //       }
    //     })
    //     .finally(() => setLoading(false));
    // }
  };
  const handleEdit = (empId, OrgId) => {
    // Navigate to the edit page
    navigation.navigate(`AddEmployee`, {
      state: {
        employee_id: empId,
        organization_id: OrgId,
        addEmp: false,
        orgImage: orgDetails.orgImage,
        orgName: orgDetails.orgName,
        orgAddress:orgDetails.orgAddress
      },
    });
  };
  const renderItem = useCallback(
    ({item}) => (
      <View style={listStyle.listContainer}>
        <View style={listStyle.listSubContainer}>
          <Image
            source={{uri: item.employee_image}}
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
              <TruncatedText text={item.designation} maxLength={20} />
            </Text>
          </View>
        </View>
        <View style={listStyle.listBtnContainer}>
          <TouchableOpacity
            style={listStyle.btnStyle}
            onPress={() =>
              navigation.navigate('EmployeeDetails', {empDetails: item})
            }>
            <Text style={listStyle.listBtn}>Reviews</Text>
          </TouchableOpacity>
          <ThreeDotMenu
            onEdit={() =>
              handleEdit(item.employee_id, orgDetails.orgId)
            }
            onDelete={() =>
              handleTerminate(
                item.employee_id,
                orgDetails.orgId,
                item.employee_name
              )
            }
            edit={true}
            deleted={true}
          />
        </View>
      </View>
    ),
    [navigation],
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyMessage}>Please add employees</Text>
    </View>
  );

  return (
    <View style={listStyle.listMainContainer}>
      <View style={listStyle.listHeaderContainer}>
        <Text style={listStyle.listHeading}>Employees</Text>
        <View style={listStyle.listTitleDetailsContainer}>
          <View style={listStyle.listOrgContainer}>
            <Image
              source={{uri: orgDetails.orgImage}}
              style={[listStyle.listLogoImg, {borderColor: 'white'}]}
            />
            <View>
              <Text style={listStyle.listText}>
                <TruncatedText
                  text={orgDetails.orgName}
                  maxLength={17}
                  dot={true}
                />
              </Text>
              <Text style={listStyle.listSubText}>{orgDetails.orgAddress}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AddEmployee')}>
            <Text style={styles.buttonText}>Add Employee</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <SearchIcon
            name="search"
            size={20}
            color="#592DA1"
            style={styles.searchIcon}
          />
          <TextInput
            style={listStyle.searchInputStyle}
            placeholder="Search Employee..."
            placeholderTextColor="#592DA1"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={filteredEmpData}
        keyExtractor={item => item.employee_id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={listStyle.listFooterContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#e06c0d', '#1c387a', '#e3c100', '#e30048']}
          />
        }
        scrollEnabled
        removeClippedSubviews={true}
        initialNumToRender={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 11,
    color: 'white',
    fontWeight: '500',
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  searchContainer: {
    backgroundColor: '#F2EFF8',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: 8,
    marginTop: 8,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInputStyle: {
    flex: 1,
    color: '#592DA1',
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
  },
});
