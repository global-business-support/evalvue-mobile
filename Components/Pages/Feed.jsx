import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import DotIcon from 'react-native-vector-icons/Entypo';
import {Image} from 'react-native-elements';
import logo from '../../assets/TCS.jpg';
import kisaan from '../../assets/kisaan.jpg';
import review from '../../assets/review.jpeg';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import ReviewCards from '../ReviewCards/ReviewCards';

export default function Feed() {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.profileLogo}>
          <Text style={styles.profileText}>R</Text>
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <SearchIcon name="search1" size={16} color="#616C6F" />
          <Text style={styles.searchText}>Click to Search Employee</Text>
        </TouchableOpacity>
        <DotIcon name="dots-three-vertical" size={22} color="#47535E" />
      </View>
      <ScrollView style={{paddingHorizontal: 10}}>
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
  mainConatiner: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    marginVertical: 6,
    borderBottomWidth: 0.3,
    borderColor: '#4C4B4B',
    paddingBottom: 8,
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orgImg: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
  },
  secondContainer: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
  },
  empContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  empImg: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  commentConatiner: {
    padding: 10,
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: '#99AAAB',
    borderRadius: 6,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  reviewImg: {
    width: '100%',
    height: 150,
    borderRadius: 6,
  },
  orgName: {
    color: '#535C68',
    fontSize: 11,
    marginLeft: 4,
  },
  empNameStyle: {
    color: '#2C3335',
    fontSize: 13,
    marginLeft: 4,
  },
  commentText: {
    color: '#535C68',
    fontSize: 10,
    marginBottom: 6,
    textAlign: 'justify',
  },
  dsgText: {
    color: '#2C3335',
    fontSize: 8,
    marginLeft: 4,
  },
});
