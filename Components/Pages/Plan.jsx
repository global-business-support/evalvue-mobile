import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { primary } from '../Styles/customStyle';
import CheckIcon from 'react-native-vector-icons/Entypo';
import OkIcon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function Plan() {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingMainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.mainHeadingText}>Subscription Plan</Text>
        </View>
      </View>
      <View style={styles.mainPlanContainer}>
        <View style={styles.planContainer}>
          <View style={styles.palnHeadingContainer}>
            <Text style={[styles.planHeadingText]}>Simple, </Text>
            <Text style={[styles.planHeadingText, { color: primary, textDecorationLine: 'underline' }]}>transparent pricing</Text>
          </View>
          <Text style={styles.planSubHeading}>No contracts. No surprise fees.</Text>
          <View style={styles.planDetailContainer}>
            <View style={styles.planBtnContainer}>
              <Text style={styles.planBtnText}>Monthly Plan</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.textStyle}>One organization register</Text>
              <CheckIcon name='check' size={23} color='#FFF' />
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.textStyle}>Add unlimited employees</Text>
              <CheckIcon name='check' size={23} color='#FFF' />
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.textStyle}>Chat support</Text>
              <CheckIcon name='check' size={23} color='#FFF' />
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.textStyle}>Data end-to-end encrypted</Text>
              <CheckIcon name='check' size={23} color='#FFF' />
            </View>
            <TouchableOpacity
              style={styles.amountBtnContainer}
              onPress={() => navigation.navigate("OrganizationList")}
            >
              <View style={styles.amountTextContainer}>
                <OkIcon name='checkcircle' size={22} color={primary} />
                <Text style={styles.amountText}> Basic</Text>
              </View>
              <View style={[styles.amountTextContainer, { alignItems: 'flex-end' }]}>
                <Text style={[styles.amountText, { fontSize: 26 }]}>₹99</Text>
                <Text style={[styles.amountText, { fontSize: 12 }]}> /Month</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  headingMainContainer: {
    alignItems: 'center',
    paddingBottom: 10
  },
  headingContainer: {
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 3,
    width: '100%',
    paddingVertical: 8,
    paddingLeft: 10,
  },
  mainHeadingText: {
    color: primary,
    fontSize: 20,
    fontWeight: '600',
  },
  mainPlanContainer: {
    margin: 5
  },
  planContainer: {
    padding: 10,
    elevation: 0.5
  },
  palnHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  planHeadingText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600'
  },
  planSubHeading: {
    color: '#000',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center'
  },
  planDetailContainer: {
    marginVertical: 30,
    backgroundColor: '#8B78E6',
    paddingHorizontal: 8,
    paddingVertical: 30,
    elevation: 5,
    borderRadius: 3
  },
  planBtnContainer: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: '55%',
    borderRadius: 8,
    paddingVertical: 6
  },
  planBtnText: {
    color: primary,
    fontWeight: '500',
    fontSize: 16
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 4,
    paddingRight: 10,
    marginVertical: 6,
    paddingVertical: 10
  },
  textStyle: {
    color: '#000',
    fontWeight: '500',
    fontSize: 15
  },
  amountBtnContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  amountTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  amountText: {
    color: primary,
    fontSize: 18,
    fontWeight: '500'
  }
});