import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import UserRegistration from '../../Components/Forms/UserRegistration';
import Login from '../../Components/Authentication/Login';
import slide from '../../assets/slide3.png';
import Slide2Image from '../../assets/slide2Image.png';
import { useNavigation } from '@react-navigation/native';
export default function Slide3() {
  const navigation = useNavigation();
  return (

    <View style={styles.container}>
      <View style={{
        width: "90%"
      }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: 'white',
            marginBottom: 10,
            textAlign: "start",
          }}>
          Optimize Your Operations With Our Employee Solutions
        </Text>
        <Text style={{
          fontSize: 14,
          fontWeight: '400',
          color: 'white',
          marginBottom: 10,
          textAlign: "start",
        }}>
          We offer the best services related to employee work experience. When employees leave a company, we help organizations post reviews about their performance and the reasons for their departure.
        </Text>
        <Image source={Slide2Image} style={styles.image} />
      </View>

      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {
          navigation.navigate('Login');
        }}>
          <Text style={styles.text}>Get Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 5,
  },
  button: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#592DA1',
  },
  image: {
    height: '40%',
    width: '100%',
    objectFit: 'contain',
    opacity: 0.9
  },
});
