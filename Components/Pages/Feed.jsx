import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import DotIcon from 'react-native-vector-icons/Entypo';
import { Image } from 'react-native-elements';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import ReviewCards from '../ReviewCards/ReviewCards';

export default function Feed({ navigation }) {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.profileLogo}>
          <Text style={styles.profileText}>R</Text>
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => navigation.navigate('SearchByAadhar')}
        >
          <SearchIcon name="search1" size={16} color="#616C6F" />
          <Text style={styles.searchText}>Click to Search Employee</Text>
        </TouchableOpacity>
        <DotIcon name="dots-three-vertical" size={22} color="#47535E" />
      </View>
      <ScrollView>
        <ReviewCards />
      </ScrollView>
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
