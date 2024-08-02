import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'react-native-elements';
import empImg from '../../assets/kisaan.jpg';
import { customStyle, primary } from '../Styles/customStyle';
import { Picker } from '@react-native-picker/picker';

export default function AddToOrganization() {
  const [selectedValue, setSelectedValue] = useState("Select Organization");
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingSubContainer}>
        <Text style={styles.headingText}>Add employee to your organization</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={empImg}
            style={styles.empImg}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.nameText}>DEEPAK RAJPUT</Text>
          <Text style={styles.dsgText}>Frontend Developer</Text>
          <Text style={styles.dsgText}>keshavvishnoi4@gamil.com</Text>
          <Text style={styles.dsgText}>Mobile number : 8103112050</Text>
          <Text style={styles.dsgText}>Aadhar number : 942057139756</Text>
        </View>
      </View>
      <View style={styles.option}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Select Organization" value="Select Organization" color='#2C3335' style={styles.picker} />
          <Picker.Item label="Lenskart" value="Lenskart" style={styles.picker} />
          <Picker.Item label="Tata Consultancy Services" value="Tata Consultancy Services" style={styles.picker} />
          <Picker.Item label="Wipro" value="Wipro" style={styles.picker} />
        </Picker>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={customStyle.loginBtn}>
          <Text style={customStyle.loginText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  container: {
    marginHorizontal: 8,
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: primary
  },
  headerContainer: {
    paddingBottom: 45,
    backgroundColor: primary,
    alignItems: 'center',
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -30
  },
  empImg: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    borderWidth: 3,
    borderColor: '#FFF'
  },
  detailContainer: {
    padding: 10,
  },
  nameText: {
    color: '#2C3335',
    fontWeight: '600',
    fontSize: 16
  },
  dsgText: {
    color: '#2C3335',
    fontWeight: '500',
    fontSize: 12
  },
  headingContainer: {
    alignItems: 'center'
  },
  headingSubContainer: {
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 1,
    backgroundColor: '#FFF'
  },
  headingText: {
    color: primary,
    fontSize: 18,
    fontWeight: '600'
  },
  picker: {},
  option: {
    width: '100%',
    backgroundColor: '#535C68',
    paddingHorizontal: 8,
    marginTop: 25,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#2C3335'
  },
  picker: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500'
  },
  btnContainer: {
    alignItems: 'center'
  }
});