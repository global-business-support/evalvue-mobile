import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {listStyle} from '../Styles/listStyle';
import {Image} from 'react-native-elements';
import DotIcon from 'react-native-vector-icons/Entypo';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import kisaan from '../../assets/kisaan.jpg';
import {primary} from '../Styles/customStyle';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function EmployeeList({navigation}) {
  const route = useRoute();
  const {orgDetails} = route.params;
  console.log(orgDetails);
//   const renderItem = ({item}) => (
//     <View style={listStyle.listContainer}>
//       <View style={listStyle.listSubContainer}>
//         <Image source={{uri: item.image}} style={listStyle.listLogoImg} />
//         <View>
//           <Text style={listStyle.listTitleText}>
//             <TruncatedText text={item.name} maxLength={20} dot={true} />
//           </Text>
//           <Text style={listStyle.listSubTitleText}>
//             <TruncatedText text={item.area} maxLength={20} />
//             {item.city_name}
//           </Text>
//         </View>
//       </View>
//       <View style={listStyle.listBtnContainer}>
//         <TouchableOpacity
//           style={listStyle.btnStyle}
//           onPress={() =>
//             navigation.navigate('EmployeeList', {
//               empDetails: {
//                 orgName: item.name,
//                 orgId: item.organization_id,
//                 orgAddress: item.area + ' ' + item.city_name,
//                 orgImage: item.image,
//               },
//             })
//           }>
//           <Text style={listStyle.listBtn}>View</Text>
//         </TouchableOpacity>
//         <DotIcon name="dots-three-vertical" size={18} color="#47535E" />
//       </View>
//     </View>
//   );

  return (
    <View style={listStyle.listMainContainer}>
      <View style={listStyle.listHeaderContainer}>
        <Text style={listStyle.listHeading}>Employees</Text>
        <View style={listStyle.listTitleDetailsContainer}>
          <View style={listStyle.listOrgContainer}>
            <Image
              source={{uri: orgDetails.orgImage}}
              style={[listStyle.listLogoImg, {borderColor: 'white'}]}
            />
            <View>
              <Text style={listStyle.listText}>{orgDetails.orgName}</Text>
              <Text style={listStyle.listSubText}>{orgDetails.orgAddress}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AddEmployee')}>
            <Text style={styles.buttonText}>
              {' '}
              {/* <AddIcon
                name="add"
                size={20}
                color="#FFF"
                style={listStyle.listAddStyle}
              /> */}
              Add Employee
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.searchContainer}>
          <SearchIcon
            name="search"
            size={20}
            color="#592DA1"
            style={styles.searchIcon}
          />
          <TextInput
            style={listStyle.searchInputStyle}
            placeholder="Search Organization..."
            placeholderTextColor="#592DA1"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View> */}
      </View>
      {/* <ScrollView>
                <View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={kisaan}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Lawarence Bishnoi </Text>
                                <Text style={listStyle.listSubTitleText}>Software Engineer</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeDetails')}
                            >
                                <Text style={listStyle.listBtn}>Review</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
                        </View>
                    </View>
                </View>

            </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
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
  searchContainer: {
    backgroundColor: '#F2EFF8',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#592e55',
    borderRadius: 5,
    paddingLeft: 8,
    marginTop: 8,
  },
  searchIcon: {
    // marginRight: 5,
  },
  searchInputStyle: {
    flex: 1,
    color: '#592DA1',
  },
});
