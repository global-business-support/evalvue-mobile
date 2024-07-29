import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import logo from '../../assets/TCS.jpg'; // Custom logo
import {Image} from 'react-native-elements';
import DotIcon from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/MaterialIcons'; // Importing search icon
import {listStyle} from '../Styles/listStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import {NATIVE_API_URL} from '@env';
import TruncatedText from '../Othercomponent/TruncatedText';
// import { error } from 'console';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import ThreeDotMenu from './ThreeDotMenu ';

export default function OrgList({navigation}) {
  const [Orgdata, setOrgdata] = useState([]);
  const [filteredOrgData, setFilteredOrgData] = useState([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [Isorgmap, setIsorgmap] = useState(false);
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchdata = async () => {
    try {
      const res = await ApiBackendRequest(
        `${NATIVE_API_URL}/organizations/`,
        // { user_id: 1 },
      );
      setOrgdata(res.data.organization_list);
      setFilteredOrgData(res.data.organization_list);
      setCount(res.data.organizations_paid_count);

      if (res.data.is_organization_mapped) {
        setIsorgmap(res.data.is_organization_mapped);
      }

      if (res.isexception) {
        setError(res.exceptionmessage.error);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [Isorgmap]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchdata();
  };

  const handleSearch = query => {
    setSearchQuery(query);
    if (query) {
      const filteredData = Orgdata.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredOrgData(filteredData);
    } else {
      setFilteredOrgData(Orgdata);
    }
  };

  // three dot function
  const handleEdit = organizationId => {
    // Navigate to the edit page
    // navigate(`/dashboard/organization/addorganization`, {
    //   state: { organization_id: organizationId, editorg: true },
    // });
    // navigate(`/dashboard/organization/edit/${organizationId}`)
  };

  const renderItem = ({item}) => (
    <View style={listStyle.listContainer}>
      <View style={listStyle.listSubContainer}>
        <Image source={{uri: item.image}} style={listStyle.listLogoImg} />
        <View>
          <Text style={listStyle.listTitleText}>
            <TruncatedText text={item.name} maxLength={20} dot={true} />
          </Text>
          <Text style={listStyle.listSubTitleText}>
            <TruncatedText text={item.area} maxLength={20} />
            {item.city_name}
          </Text>
        </View>
      </View>
      <View style={listStyle.listBtnContainer}>
        <TouchableOpacity
          style={listStyle.btnStyle}
          onPress={() =>
            navigation.navigate('EmployeeList', {
              orgDetails: {
                orgName: item.name,
                orgId: item.organization_id,
                orgAddress: item.area + ' ' + item.city_name,
                orgImage: item.image,
              },
            })
          }>
          <Text style={listStyle.listBtn}>View</Text>
        </TouchableOpacity>
        <ThreeDotMenu onEdit={() => handleEdit(organization.organization_id)} edit={true} deleted={false} />
      </View>
    </View>
  );

  return (
    <View style={listStyle.listMainContainer}>
      <View style={listStyle.listHeaderContainer}>
        <View style={styles.addStyle}>
          <Text style={listStyle.listHeading}>Organization</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddOrganization')}>
            <AddIcon
              name="add"
              size={28}
              color="#000"
              style={listStyle.listAddStyle}
            />
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
            placeholder="Search Organization..."
            placeholderTextColor="#592DA1"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={filteredOrgData}
        keyExtractor={item => item.organization_id.toString()} // Ensure unique keys
        renderItem={renderItem}
        contentContainerStyle={listStyle.listFooterContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#e06c0d', '#1c387a', '#e3c100', '#e30048']} // Set custom colors here
          />
        }
        // Enable smooth scrolling
        scrollEnabled
        removeClippedSubviews={true}
        initialNumToRender={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#F2EFF8',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#592e55',
    borderRadius: 5,
    paddingLeft: 8,
    marginTop: 8,
  },
  searchIcon: {
    // marginRight: 5,
  },
  searchInputStyle: {
    flex: 1,
    color: '#592DA1',
  },
});
