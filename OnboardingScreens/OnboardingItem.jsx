import {View, Text, Image, useWindowDimensions, StyleSheet} from 'react-native';
import React from 'react';

const OnboardingItem = ({item}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <View style={{flex: 1, width: '100%'}}>
        {item.component}
        <Text style={styles.title}>{item.title}</Text>
        {/* <Text style={styles.description}>{item.description}</Text> */}
      </View>
      {item.image && (
        <Image
          source={item?.image}
          style={[styles?.image, {resizeMode: 'contain'}]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
    // paddingHorizontal: 64,
  },
});

export default OnboardingItem;
