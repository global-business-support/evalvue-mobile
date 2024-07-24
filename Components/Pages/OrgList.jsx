import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from '../../assets/TCS.jpg';
import {Image} from 'react-native-elements';
import DotIcon from 'react-native-vector-icons/Entypo';
import {listStyle} from '../Styles/listStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import { NATIVE_API_URL } from '@env';
// import { error } from 'console';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';

export default function OrgList({navigation}) {
  const [Orgdata, setOrgdata] = useState([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [Isorgmap, setIsorgmap] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await ApiBackendRequest(`${NATIVE_API_URL}/organizations/`, {user_id: 1});
        console.log(res);
        setOrgdata(res.data.organization_list);
        setCount(res.data.organizations_paid_count);

        if (res.data.is_organization_mapped) {
          setIsorgmap(res.data.is_organization_mapped);
        } else {
          setAddress(res.data);
        }
        if (res.isexception) {
          setError(res.exceptionmessage.error);
        }
     
      } catch (err) {
        // console.log(err);
        setError(err);
      }
      finally{
        setLoading(false);
      }
      console.log(print, 'print again');
    };
    fetchdata();
  },[]);
  return (
    <View style={listStyle.listMainContainer}>
      <View style={listStyle.listHeaderContainer}>
        <View style={styles.addStyle}>
          <Text style={listStyle.listHeading}>Organization</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddOrganization')}>
            <AddIcon
              name="add"
              size={28}
              color="#000"
              style={listStyle.listAddStyle}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={listStyle.searchInputStyle}
          placeholder="Search Organization..."
          placeholderTextColor="#592DA1"
        />
      </View>
      <ScrollView>
        <View style={listStyle.listFooterConatiner}>
          <View style={listStyle.listContainer}>
            <View style={listStyle.listSubContainer}>
              <Image source={logo} style={listStyle.listLogoImg} />
              <View>
                <Text style={listStyle.listTitleText}>
                  Tata Counsultancy Services{' '}
                </Text>
                <Text style={listStyle.listSubTitleText}>Indore</Text>
              </View>
            </View>
            <View style={listStyle.listBtnContainer}>
              <TouchableOpacity
                style={listStyle.btnStyle}
                onPress={() => navigation.navigate('EmployeeList')}>
                <Text style={listStyle.listBtn}>View</Text>
              </TouchableOpacity>
              <DotIcon name="dots-three-vertical" size={18} color="#47535E" />
            </View>
          </View>
        </View>

        {/* ===================================== */}

        {/* ============================ */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
