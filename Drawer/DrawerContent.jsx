import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import kisaan from '../assets/kisaan.jpg';
import {DrawerActions} from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function DrawerContent(props) {
  return (
    <View style={styles.Container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Profile</Text>
        <TouchableOpacity
          onPress={() => {
            DrawerActions.closeDrawer();
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
          <Text style={{fontSize : 20, color: 'black', fontWeight : '500'}}>How can we help ?</Text>
      </View>
      <DrawerContentScrollView {...props}>
          <DrawerItemList {...props}/>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
     flex : 1,
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
});
