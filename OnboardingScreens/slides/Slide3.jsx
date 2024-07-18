import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function Slide3() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '600',
          color: 'white',
          marginBottom: 20,
        }}>
        You Want to{' '}
      </Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
          or
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Sign up</Text>
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
    fontWeight: '500',
    color: 'black',
  },
});
