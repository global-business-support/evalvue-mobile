import { StyleSheet, View } from 'react-native';
import React from 'react';
import DotIcon from 'react-native-vector-icons/Entypo';
import HomeIcon from 'react-native-vector-icons/Ionicons';
import OrgIcon from 'react-native-vector-icons/Octicons';
import HistoryIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feed from '../Pages/Feed';
import { windowHeight } from '../Styles/customStyle';
import OrgList from '../Pages/OrgList';

export default function LandingPage() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.landerStyle}>
        {/* <Feed /> */}
        <OrgList />
      </View>
      <View style={styles.footerContainer}>
        <HomeIcon name='home' size={26} color='gray' />
        <OrgIcon name='organization' size={26} color='gray' />
        <OrgIcon name='diff-added' size={26} color='gray' />
        <HistoryIcon name='history' size={26} color='gray' />
        <HomeIcon name='notifications' size={26} color='gray' />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    height: windowHeight
  },
  landerStyle: {
    height: windowHeight - ((15 * windowHeight) / 100)
  },
  footerContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 8,
    borderTopWidth: 1,
    borderColor: 'gary'
  }
});