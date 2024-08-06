import React from 'react';
import { StyleSheet, View } from 'react-native';
import ShimmerText from './ShimmerText';

export default function ListShimmerUI() {
  const dataContainer = () => {
    return (
      <View style={styles.container}>
        <ShimmerText style={styles.subContainer}></ShimmerText>
        <View style={styles.insideContainer}>
          <ShimmerText width='80%' marginBottom={8} />
          <ShimmerText width='55%' />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {Array.from({ length: 10 }).map((_, index) => (
        <React.Fragment key={index}>{dataContainer()}</React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EAF0F1',
    paddingTop: 4,
  },
  container: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  subContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  insideContainer: {
    width: '80%',
  },
});
