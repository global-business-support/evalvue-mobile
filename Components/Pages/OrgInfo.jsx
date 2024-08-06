import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import kisaan from '../../assets/kisaan.jpg'
import EmailIcon from 'react-native-vector-icons/Fontisto';
import OrgIcon from 'react-native-vector-icons/Octicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import TruncatedText from '../Othercomponent/TruncatedText';
import { primary } from '../Styles/customStyle';

export default function OrgInfo() {
    const [visible, setVisible] = useState(true)
    const navigation = useNavigation();
    const route = useRoute()
    const {params, orgDetails} = route.params
  return (
    <>
        <View style={styles.closeButton} >
            <Text style={styles.closeButtonText} onPress={()=> {navigation.navigate("OrganizationList")}}>✕</Text>
          </View>
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: params.image }}
                        style={styles.image}
                        />
                </View>
                <View style={{gap:40}}>
                    <View>
                        <Text style={styles.empName}>
                        {params.name}
                        </Text>
                        {/* <Text style={styles.empDesigation}>
                        {params.area}
                        </Text> */}
                    </View>
                    <View style={styles.infoBox}>
                        <View>
                                <Text style={styles.heading}>
                                    Address
                                </Text>
                                <View style={styles.align}>
                                    <Text style={styles.info}>
                                        {params.area}
                                    </Text>
                                    <Text style={styles.info}t>,</Text>
                                    <Text style={styles.info}>
                                        {params.city_name}
                                    </Text>
                                    <Text style={styles.info}t>,</Text>
                                    <Text style={styles.info}>
                                        {params.state_name}
                                    </Text>
                                </View>
                        </View>
                        <View>
                                <Text style={styles.heading}>
                                    PinCode
                                </Text>
                                <View style={styles.align}>
                                    <Text style={styles.info}>
                                        {params.pincode}
                                    </Text>
                                </View>
                        </View>
                        <View>
                                <Text style={styles.heading}>
                                    Sector 
                                </Text>
                                <View style={styles.align}>
                                    <Text style={styles.info}>
                                        {params.sector_name}
                                    </Text>
                                </View>
                        </View>
                        <View>
                                <Text style={styles.heading}>
                                    Listed Type 
                                </Text>
                                <View style={styles.align}>
                                    <Text style={styles.info}>
                                        {params.listed_name}
                                    </Text>
                                </View>
                        </View>
                        <View>
                                <Text style={styles.heading}>
                                    Document Number 
                                </Text>
                                <View style={styles.align}>
                                    <Text style={styles.info}>
                                        {params.document_number}
                                    </Text>
                                </View>
                        </View>
                    

                    </View>
                </View>
            </View>
        </View>
        </>
  )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 20,
        color : '#666'
    },
    subContainer : {
        height : 500, 
        width : '100%', 
        borderRadius : 10, 
        paddingHorizontal : 10,
        backgroundColor : 'white'
    },
    imageContainer : {
        alignSelf : 'center', 
        borderRadius : 120 /2,
    },
    image : {
        height : 110, 
        width : 110, 
        alignSelf : 'center', 
        marginTop : -50, 
        borderRadius : 120 /2,
    },
    empName : {
        marginTop : 5,
        color : '#666',
        fontSize : 17,
        fontWeight : '500',
        textAlign : 'center'
    },
    empDesigation : {
        marginTop : 1,
        color : 'gray',
        fontSize : 13,
        fontWeight : '400',
        textAlign : 'center'
    },
    infoBox :{
        padding : 15,
        gap : 20,
        height : 200,
        borderTopWidth :1 ,
        borderColor : '#EAEBF0',
        borderRadius : 10,
    },
    heading : {
        color : '#999',
        fontSize : 14,
        fontWeight : '500',
    },
    info : {
        color : '#666',
        fontSize : 15,
        fontWeight : '500',
    },
    closeButton: {
        padding: 10,
        backgroundColor: primary,
      },
      closeButtonText: {
        textAlign : 'right',
        marginRight : 10,
        color: 'white',
        fontSize: 22,
        fontWeight : '600'
      },
      align : {
        flexDirection : 'row',
        gap : 5
      }
})