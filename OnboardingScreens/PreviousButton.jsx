import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function PreviousButton({Previous}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={Previous} style={styles.pressable}>
        <Text style={styles.nextButton}>Previous</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        marginBottom : 20,
    },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 90,
    borderRadius : 20,
    backgroundColor: 'white',
  },
  nextButton: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  },
});
