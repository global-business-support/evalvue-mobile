import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import DotIcon from 'react-native-vector-icons/Entypo';
import {Image} from 'react-native-elements';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import ReviewCards from '../ReviewCards/ReviewCards';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import {NATIVE_API_URL} from '@env';
import {UserContext} from '../Context/ContextFile';

export default function Feed({navigation}) {
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState('');
  const {userId} = useContext(UserContext);

  useEffect(() => {
    ApiBackendRequest(`${NATIVE_API_URL}/dashboard/feed/`, {
      user_id: userId,
    }).then(res => {
      if (res.data.dashboard_list) {
        setFeeds(res.data.dashboard_list);
        console.log(res.data.dashboard_list);
      }
      if (res.isexception) {
        setError(res.exceptionmessage.error);
      }
    });
  }, []);

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.profileLogo}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Text style={styles.profileText}>R</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => navigation.navigate('SearchByAadhar')}>
          <SearchIcon name="search1" size={16} color="#616C6F" />
          <Text style={styles.searchText}>Click to Search Employee</Text>
        </TouchableOpacity>
        <DotIcon name="dots-three-vertical" size={22} color="#47535E" />
      </View>
      {/* <ScrollView> */}
      {/* <FlatList
        data={feeds}
        renderItem={({item}) => <ReviewCards data={item} />}
        keyExtractor={item => item.review_id}
      /> */}
      {/* <ReviewCards /> */}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  headerContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileLogo: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40 / 2,
    backgroundColor: 'gray',
  },
  profileText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#FFF',
  },
  searchBtn: {
    backgroundColor: '#DAE0E2',
    width: '70%',
    height: 35,
    borderRadius: 10,
    fontSize: 10,
    color: '#2C3335',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 14,
    color: '#616C6F',
    marginLeft: 6,
  },
});
