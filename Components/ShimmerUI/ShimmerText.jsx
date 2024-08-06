import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useShimmerAnimation } from './useShimmerAnimation'; // Adjust the import path as necessary

const ShimmerText = ({ style, width, marginBottom }) => {
  const backgroundColor = useShimmerAnimation();

  return (
    <Animated.View
      style={[
        styles.shimmerText,
        { backgroundColor, width, marginBottom },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  shimmerText: {
    height: 10,
    borderRadius: 10,
  },
});

export default ShimmerText;
