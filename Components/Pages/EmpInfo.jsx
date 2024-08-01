import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import kisaan from '../../assets/kisaan.jpg'
import EmailIcon from 'react-native-vector-icons/Fontisto';
import OrgIcon from 'react-native-vector-icons/Octicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import TruncatedText from '../Othercomponent/TruncatedText';

export default function EmpInfo() {
    const navigation = useNavigation();
    const route = useRoute()
    const {params, orgDetails} = route.params
  return (
    <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: params.employee_image }}
                    style={styles.image}
                    />
            </View>
            <View style={{gap:40}}>
                <View>
                    <Text style={styles.empName}>
                    {params.employee_name}
                    </Text>
                    <Text style={styles.empDesigation}>
                    {params.designation}
                    </Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.align}>
                            <Text style={styles.heading}>
                            Email id
                            </Text>
                            <Text style={styles.info}>
                                {params.email}
                            </Text>
                    </View>
                    <View  style={styles.align}>
                            <Text style={styles.heading}>
                            Current Organization 
                            </Text>
                            <Text style={styles.info}>
                            <TruncatedText text={orgDetails.orgName} maxLength={25} dot={true} />
                            </Text>
                    </View>
                    <View  style={styles.align}>
                            <Text style={styles.heading}>
                                Aadhar Number  
                            </Text>
                            <Text style={styles.info}>
                                {params.aadhar_number}
                            </Text>
                    </View>
                    <View  style={styles.align}>
                            <Text style={styles.heading}>
                                Mobile Number  
                            </Text>
                            <Text style={styles.info}>
                                {params.mobile_number}
                            </Text>
                    </View>
                   

                </View>
            </View>
        </View>
    </View>
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
    align : {
        // flexDirection :'row',
        // justifyContent : 'space-between'
    },
})