import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import React, { useEffect, useState } from 'react';
import NotificationIcon from 'react-native-vector-icons/MaterialIcons';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import ReviewCards from '../ReviewCards/ReviewCards';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import { NATIVE_API_URL } from '@env';
import ReviewShimmerUI from '../ShimmerUI/ReviewShimmerUI';

export default function Feed({ navigation }) {
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [Isreviewmap, setIsreviewmap] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchdata = async () => {
    try {
      setLoading(true);
      const res = await ApiBackendRequest(`${NATIVE_API_URL}/dashboard/feed/`);
      setFeeds(res.data.dashboard_list);
      if (res.data.is_review_mapped) {
        setIsreviewmap(res.data.is_review_mapped);
      }
      if (res.isexception) {
        setError(res.exceptionmessage.error);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [Isreviewmap]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchdata();
  };

  if (loading) {
    return <ReviewShimmerUI />
  };
  if (error) {
    return (
      <View>
        <Text style={{ color: 'red', fontSize: 16, fontWeight: '600', textAlign: 'left', padding: 10 }}>{error}</Text>
      </View>
    );
  };

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
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
        >
          <NotificationIcon name="notification-important" size={30} color="#47535E" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={feeds}
        renderItem={ReviewCards}
        keyExtractor={item => item?.review_id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#e06c0d', '#1c387a', '#e3c100', '#e30048']} // Set custom colors here
          />
        }
      />
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
    backgroundColor: '#47535E',
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
