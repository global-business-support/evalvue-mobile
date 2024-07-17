import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topCircle} />
      <Image 
        source={require('../assets/logo.png')} // Update the path to your logo image
        style={styles.logo}
      />
      {/* <Text style={styles.text}>Your App Name</Text> */}
      <View style={styles.bottomCircle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#592DA1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCircle: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#6B21A8',
  },
  logo: {
    width: 200,
    height: 58,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#6B21A8',
  },
});

export default SplashScreen;
