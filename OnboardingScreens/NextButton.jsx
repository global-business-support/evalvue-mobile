import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function NextButton({ percentage, Next }) {

  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={Next} style={styles.pressable}>
        <Text style={styles.nextButton}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        marginBottom : 20,
        alignItems: 'flex-end'
    },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 70,
    borderRadius : 20,
    backgroundColor: 'white',
  },
  nextButton: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  },
});
