import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useShimmerAnimation = (duration = 500) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue, duration]);

  return shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#DAE0E2', '#f0f0f0'],
  });
};
