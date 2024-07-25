import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import LogIcon from 'react-native-vector-icons/MaterialIcons';
import kisaan from '../assets/kisaan.jpg';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {primary} from '../Components/Styles/customStyle';
import { removeData } from '../API-Management/mmkv-Storage';
  
export default function DrawerContent({props}) {
const navigation = useNavigation()

  const handleLogout = () => {
    removeData('accessToken')
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
        <View style={styles.imageContainer}>
          <Image source={kisaan} style={styles.image} />
        </View>
        <View>
          <Text style={styles.userName}>Ritik Sharma</Text>
          <Text style={{color: '#ced6e0'}}>ritiksharma011@gmail.com</Text>
        </View>
      </View>
      <View>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          How can we help ?
        </Text>
      </View>
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <View style={styles.loginView}>
        <TouchableOpacity style={styles.loginTouchable} onPress={()=>handleLogout()}>
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
    display: 'flex',
    gap: 15,
    padding: 15,
  },
  heading: {
    width: '100%',
    // backgroundColor : '#6739B7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
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
    height: 'auto',
    width: '100%',
  },
  loginTouchable: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
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
