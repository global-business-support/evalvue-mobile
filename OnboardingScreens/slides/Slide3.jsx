import {StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import React from 'react';
import UserRegistration from '../../Components/Forms/UserRegistration';
import Login from '../../Components/Authentication/Login';
import slide from '../../assets/slide3.png'

export default function Slide3() {
  return (
   
    <View style={styles.container}>
      <View style={{
        width:"90%"
      }}>

      <Text
        style={{
          fontSize: 25,
          fontWeight: '600',
          color: 'white',
          marginBottom: 10,
          textAlign:"center",
        }}>
        "Optimize Your Operations With Our Employee Solutions{' '}"

      </Text>
      <Text   style={{
          fontSize: 18,
          fontWeight: '400',
          color: 'white',
          marginBottom: 10,
          textAlign:"center",
        }}>
      We offer the best services related to employee work experience. When employees leave a company, we help organizations post reviews about their performance and the reasons for their departure.
      </Text>
          </View>
          <Image
        source={slide} // Path to your local image
        style={styles.image}
      />
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-around',
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
    fontWeight: '500',
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // or 'cover', 'stretch' etc.
  },
});
