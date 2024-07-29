import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NetworkErrorOverlay = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOffline, setShowOffline] = useState(false);

  // Create animated values for success and offline messages
  const successAnimation = useRef(new Animated.Value(-100)).current;
  const offlineAnimation = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const online = state.isConnected;

      if (online !== isOnline) {
        setIsOnline(online);
        if (online) {
          setShowSuccess(true);
          setShowOffline(false);
          // Animate success message
          Animated.spring(successAnimation, {
            toValue: 0,
            useNativeDriver: true,
            friction: 4,
          }).start();
          
          // Hide success message after 2 seconds
          setTimeout(() => {
            Animated.spring(successAnimation, {
              toValue: -100,
              useNativeDriver: true,
              friction: 4,
            }).start(() => setShowSuccess(false));
          }, 2000);
          
        } else {
          setShowOffline(true);
          setShowSuccess(false);
          // Animate offline message
          Animated.spring(offlineAnimation, {
            toValue: 0,
            useNativeDriver: true,
            friction: 4,
          }).start();
        }
      }
    });

    return () => unsubscribe();
  }, [isOnline]);

  return (
    <View style={styles.container}>
      {showSuccess && (
        <Animated.View style={[styles.successOverlay, { transform: [{ translateY: successAnimation }] }]}>
          <Text style={styles.text}>Your internet is connected successfully</Text>
        </Animated.View>
      )}
      {showOffline && (
        <Animated.View style={[styles.overlay, { transform: [{ translateY: offlineAnimation }] }]}>
          <Text style={styles.text}>You are offline</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure it is above other components
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default NetworkErrorOverlay;
