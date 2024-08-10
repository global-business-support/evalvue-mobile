import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import LogIcon from 'react-native-vector-icons/MaterialIcons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { primary } from '../Components/Styles/customStyle';
import { useNavigation } from '@react-navigation/native';
import { getBooleanData, getStringData, removeData, storeData } from '../API-Management/mmkv-Storage';
import { navigate } from '../API-Management/navigationService';

export default function DrawerContent(props) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = () => {
    removeData('email')
    removeData('accessToken')
    storeData('isLogin', false)
    navigate("Login")
  };

  useEffect(() => {
    setIsLogin(getBooleanData('isLogin'));
    if (isLogin) {
      setEmail(getStringData("email"));
      setUserName(email[0]?.toUpperCase());
    }
  });

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
          <Text style={styles.firstlatter}>{userName}</Text>
        </View>
        <View>
          {/* <Text style={styles.userName}>Ritik Sharma</Text> */}
          <Text style={styles.userNameText}>{email}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textStyle}>
          How can we help ?
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <View style={styles.loginView}>
        <TouchableOpacity style={styles.loginTouchable} onPress={() => handleLogout()}>
          <LogIcon name="logout" style={styles.logIcon} />
          <Text style={styles.logText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginBottom: 20
  },
  headingText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  icon: {
    fontSize: 30,
    color: '#6739B7',
  },
  profileContainer: {
    paddingVertical: 20,
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
    justifyContent: 'center',
    backgroundColor: '#EF6C00'
  },
  firstlatter: {
    fontSize: 30,
    color: 'white'
  },
  userName: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  loginView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 12
  },
  loginTouchable: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
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
  userNameText: {
    color: "#FFF",
    paddingTop: 10,
    fontWeight: '600',
    fontSize: 15
  },
  textStyle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 6
  }
});
