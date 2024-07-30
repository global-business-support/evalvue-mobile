import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { primary, windowHeight } from '../Styles/customStyle';
import notificationImg from '../../assets/notification.webp';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Notifications() {
  return (
    <View style={{ backgroundColor: '#FFF', flex: 1 }}>
      <View style={styles.mainHeadingContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Notifications</Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <TouchableOpacity>
          <Image
            source={notificationImg}
            style={styles.imgStyle}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <View style={styles.notificationContainer}>
          <Icon name='notifications-active' size={30} color='#000' />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Welcom to the evalvue, thank you for connecting with us.</Text>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <Icon name='notifications-active' size={30} color='#000' />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>We will keep you updated with the new services through notifications.</Text>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <Icon name='notifications-active' size={30} color='#000' />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Now you can start the free trail.</Text>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <Icon name='notifications-active' size={30} color='#000' />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Add your organizations with us and use our services for ease of employee management.</Text>
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  mainHeadingContainer: {
    alignItems: 'center',
    paddingVertical: 10
  },
  headingContainer: {
    backgroundColor: '#FFF',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5
  },
  heading: {
    color: primary,
    fontSize: 18,
    fontWeight: '600'
  },
  imgContainer: {
    alignItems: 'center',
    paddingBottom: 15
  },
  imgStyle: {
    width: 150,
    height: 150
  },
  notificationContainer: {
    padding: 10,
    backgroundColor: '#99AAAB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 4,
    borderRadius: 25,
    elevation: 5
  },
  textContainer: {
    width: '85%'
  },
  textStyle: {
    color: '#192A56',
    fontWeight: '500',
    fontSize: 14
  }
});