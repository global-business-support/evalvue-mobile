import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Slide2Image from '../../assets/slide2Image.png';

export default function Slide2() {
  return (
    <View style={styles.container}>
      <Text style={styles.textlarge}>Welcome to Evalvue</Text>
      <Text style={styles.textsmall}>
        We offer the best services related to employee work experience. When
        employees leave a company, we help organizations post reviews about
        their performance and the reasons for their departure.
      </Text>

      <Image source={Slide2Image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textlarge: {
    fontSize: 35,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
  },
  textsmall: {
    fontSize: 14,
    color: 'white',
    width: '82%',
    textAlign: 'justify',
  },
  image: {
    height: '50%',
    width: '120%',
    objectFit: 'contain',
  },
});
