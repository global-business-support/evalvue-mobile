import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import slides from './slides.js';
import OnboardingItem from './OnboardingItem.jsx';
import Paginator from './Paginator.jsx';
import NextButton from './NextButton.jsx';
import PreviousButton from './PreviousButton.jsx';
import { primary } from '../Components/Styles/customStyle.js';
import { getBooleanData, storeData } from '../API-Management/mmkv-Storage.js';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

useEffect(()=>{
  if(getBooleanData("viewedOnboarding")=='undefined'){

    console.log("viewonbording update success tru")
    storeData("viewedOnboarding" , false)
  }
    console.log(getBooleanData("viewedOnboarding"),'in obbordingscreen')

},[storeData])

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const Next = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
    //  storeData("viewedOnboarding" , true)
    }
  };
  const Skip = () => {
    slidesRef.current.scrollToIndex({ index: slides.length - 1 });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={primary} barStyle={'light-content'} animated={true} />
      <View style={{ flex: 3, width: '100%' }}>
        {currentIndex < slides.length - 1 && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity style={styles.pressable} onPress={Skip}>
              <Text style={styles.skipButton}>Skip</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.flexbox}>
        <View style={styles.flexbox}>
          {currentIndex < slides.length - 1 && (
            <NextButton
              Next={Next}
              percentage={(currentIndex + 1) * (100 / slides.length)}
            />
          )}
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'start',
          }}>
          <Paginator data={slides} scrollX={scrollX} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#592DA1',
  },
  flexbox: {
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    position: 'absolute',
    bottom: 20,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 85,
  },
  skipButton: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    marginTop: 10,
    marginRight: 10,
  },
});

export default Onboarding;
