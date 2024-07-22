import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

export default function NextButton({percentage, Next}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={Next} style={styles.pressable}>
        <View style={styles.nextButton}>
          <Text style={styles.nextButton}>Next</Text>
          <Icon name="arrowright" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  pressable: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 100,
    borderRadius: 20,
    // backgroundColor: 'white',
  },
  nextButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    fontSize: 18,
    color: 'white',
  },
});
