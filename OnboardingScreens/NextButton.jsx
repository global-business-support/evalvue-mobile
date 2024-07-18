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
    height: 45,
    width: 85,
    borderRadius: 20,
  },
  nextButton: {
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    fontSize: 23,
    fontWeight: '800',
    color: 'white',
  },
});
