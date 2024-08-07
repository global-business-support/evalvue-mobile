import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import LogIcon from 'react-native-vector-icons/MaterialIcons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { primary } from '../Components/Styles/customStyle';
import kisaan from '../assets/kisaan.jpg';
import { useNavigation } from '@react-navigation/native';
import { getStringData, removeData, storeData } from '../API-Management/mmkv-Storage';

export default function DrawerContent(props) {
  const navigation = useNavigation();
  const email = getStringData("email")
  const userName = email[0]?.toUpperCase()

  const handleLogout = () =>{
    removeData('email')
    removeData('accessToken')
    storeData('isLogin', false)
    navigation.navigate("Login")
  }

  return (
    <View style={styles.Container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Profile</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
          }}>
          <Icon name="cross" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.userNameContainer}>
          {/* <Image source={kisaan} style={styles.image} /> */}
          <Text style={styles.firstlatter}>{userName}</Text>
        </View>
        <View>
          <Text style={styles.userName}>Ritik Sharma</Text>
          <Text style={{ color: '#ced6e0' }}>{email}</Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 20, color: 'black', fontWeight: '500',marginTop : 50 }}>
          How can we help ?
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <View style={styles.loginView}>
        {/* Uncomment and implement logout logic if needed */}
        <TouchableOpacity style={styles.loginTouchable} onPress={() => handleLogout()}>
          <LogIcon name="logout" style={styles.logIcon} />
          <Text style={styles.logText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 15,
  },
  heading: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom : 20
  },
  headingText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  icon: {
    fontSize: 25,
    color: '#6739B7',
  },
  profileContainer: {
    height: 150,
    borderRadius: 10,
    backgroundColor: '#6739B7',
    padding: 15,
    justifyContent: 'space-between',
  },
  userNameContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : 'center',
    backgroundColor : '#EF6C00'
  },
  firstlatter : {
    fontSize : 30,
    color : 'white'
  },
  userName: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  loginView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginTouchable: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: primary,
  },
  logIcon: {
    fontSize: 18,
    color: 'white',
  },
  logText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});
