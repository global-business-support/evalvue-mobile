import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import ReviewCards from '../ReviewCards/ReviewCards';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import { NATIVE_API_URL } from '@env';
import ReviewShimmerUI from '../ShimmerUI/ReviewShimmerUI';
import OfferPoster from '../Othercomponent/OfferPosters'; // Import OfferPoster
import { getBooleanData, getStringData } from '../../API-Management/mmkv-Storage';

export default function Feed({ navigation }) {
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isReviewMapped, setIsReviewMapped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOfferVisible, setOfferVisible] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(getBooleanData('isLogin'));
    if (isLogin) {
      setEmail(getStringData("email"));
      setUserName(email[0]?.toUpperCase());
    }
  });

  const fetchData = useCallback(
  async () => {
    try {
      setLoading(true);
      const res = await ApiBackendRequest(`${NATIVE_API_URL}/dashboard/feed/`);
      setFeeds(res.data.dashboard_list);
      if (res.data.is_review_mapped) {
        setIsReviewMapped(res.data.is_review_mapped);
      }
      if (res.isexception) {
        setError(res.exceptionmessage.error);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderItem = useCallback(({item}) => <ReviewCards item={item} />, []);

  const toggleOfferVisibility = () => {
    setOfferVisible(prev => !prev);
  };
  const noFeed = () => {
    return (
      <View>
        <Text style={{ color: primary, fontSize: 16, fontWeight: '600', textAlign: 'left', padding: 10 }}>No review given.</Text>
      </View>
    )
  };

  if (loading) {
    return <ReviewShimmerUI />;
  }
  if (error) {
    return (
      <View>
        <Text style={{ color: 'red', fontSize: 16, fontWeight: '600', textAlign: 'left', padding: 10 }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.profileLogo}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Text style={styles.profileText}>{userName}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => navigation.navigate('SearchByAadhar')}>
          <SearchIcon name="search1" size={16} color="#616C6F" />
          <Text style={styles.searchText}>Click to Search Employee...</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
        >
          <NotificationIcon name="notifications" size={28} color="#47535E" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={feeds}
        renderItem={renderItem}
        initialNumToRender={3} 
        maxToRenderPerBatch={4}
        windowSize={5}
        keyExtractor={item => item?.review_id.toString()}
        ListEmptyComponent={noFeed}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#e06c0d', '#1c387a', '#e3c100', '#e30048']} 
          />
        }
      />
      <OfferPoster
        mediaUri="https://i.pinimg.com/564x/48/59/06/485906bb4f7f0b8f6957928796fdf6a9.jpg"
        type="image" 
        visible={isOfferVisible}
        onClose={toggleOfferVisibility}
      />
      <TouchableOpacity
        style={styles.showOfferButton}
        onPress={toggleOfferVisibility}
      >
        <Text style={styles.showOfferText}>Show plans</Text>
      </TouchableOpacity>
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
    borderRadius: 6,
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
  showOfferButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#5e3aeb',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    elevation: 5,
  },
  showOfferText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
