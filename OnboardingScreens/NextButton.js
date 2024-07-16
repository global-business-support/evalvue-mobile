import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function NextButton({ percentage, scrollTo }) {

  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrollTo} style={styles.pressable}>
        <Text style={styles.nextButton}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        marginBottom : 20
    },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 70,
    borderRadius : 20,
    backgroundColor: '#5134A9',
  },
  nextButton: {
    color: 'white',
    fontSize: 18,
  },
});
