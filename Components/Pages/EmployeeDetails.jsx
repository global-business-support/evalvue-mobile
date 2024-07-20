import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ReviewCards from '../ReviewCards/ReviewCards';
import {Image} from 'react-native-elements';

import kisaan from '../../assets/kisaan.jpg';
import { primary } from '../Styles/customStyle';

export default function EmployeeDetails() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerPartTwo}>
          <View style={{flexDirection: 'row', gap: 6}}>
            <View>
              <View style={styles.profileLogo}>
                <Image source={kisaan} style={styles.profileLogo} />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.nameText}>Ritik Sharma</Text>
                <Text
                  style={{color: '#ced6e0', fontSize: 12, fontWeight: '500'}}>
                  keshavvisshnoi4@gmail.com
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 3,
                }}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor: '#2ed573',
                    borderRadius: 10 / 2,
                    marginTop: 5,
                  }}
                />
                <Text style={{color: '#2ed573', fontWeight: '500'}}>
                  Active
                </Text>
                {/* <View
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor: '#ffdd59',
                    borderRadius: 10 / 2,
                    marginTop: 5,
                  }}
                />
                <Text style={{color: '#ffdd59', fontWeight: '500'}}>
                  in Active
                </Text> */}
              </View>
            </View>
          </View>
          <View
            style={{
              marginLeft: 2,
              flexDirection: 'row',
              alignContent: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.orgname}>Tata Cunsultansy Services</Text>
              <Text style={styles.textsmall}>⭐⭐⭐⭐</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add to Organization</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ScrollView>
        <ReviewCards />
        <ReviewCards />
        <ReviewCards />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingHorizontal: 4,
    paddingTop: 10,
  },
  headerPartOne: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 28,
    color: '#000',
  },
  orgname: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  textsmall: {
    fontSize: 12,
    fontWeight: '500',
  },
  headerPartTwo: {
    gap: 20,
    backgroundColor: primary,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  profileLogo: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
    // backgroundColor: '#EA7773',
  },
  nameText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
  button: {},
  buttonText: {
    fontSize: 11,
    color: 'white',
    fontWeight: '500',
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
});
