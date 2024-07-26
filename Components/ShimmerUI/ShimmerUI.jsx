import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function ShimmerUI() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.subConatiner}></View>
        <View style={styles.insideConatiner}></View>
      </View>
      <View style={styles.container}>
        <View style={styles.subConatiner}></View>
        <View style={styles.insideConatiner}></View>
      </View>
      <View style={styles.container}>
        <View style={styles.subConatiner}></View>
        <View style={styles.insideConatiner}></View>
      </View>
      <View style={styles.container}>
        <View style={styles.subConatiner}></View>
        <View style={styles.insideConatiner}></View>
      </View>
      <View style={styles.container}>
        <View style={styles.subConatiner}></View>
        <View style={styles.insideConatiner}></View>
      </View>
      <View style={styles.container}>
        <View style={styles.subConatiner}></View>
        <View style={styles.insideConatiner}></View>
      </View>
      <View style={styles.container}>
        <View style={styles.subConatiner}></View>
        <View style={styles.insideConatiner}></View>
      </View>
      <View style={styles.container}>
        <View style={styles.subConatiner}></View>
        <View style={styles.insideConatiner}></View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 15
    },
    container: {
        backgroundColor: '#EAF0F1',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginVertical: 8
    },
    subConatiner: {
        backgroundColor: '#DAE0E2',
        width: 50,
        height: 50,
        borderRadius: 25
    },
    insideConatiner: {
        backgroundColor: '#DAE0E2' ,
        width: '80%',
        height: 25,
        borderRadius: 15
    }
});