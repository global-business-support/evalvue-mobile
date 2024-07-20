import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { listStyle } from '../Styles/listStyle';
import { Image } from 'react-native-elements';
import DotIcon from 'react-native-vector-icons/Entypo';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import kisaan from '../../assets/kisaan.jpg';
import { primary } from '../Styles/customStyle';

export default function EmployeeList({ navigation }) {
    return (
        <View style={listStyle.listMainContainer}>
            <View style={listStyle.listHeaderContainer}>
                <Text style={listStyle.listHeading}>Employees</Text>
                <View style={listStyle.listTitleDetailsContainer}>
                <View style={listStyle.listOrgContainer}>
                    <Image
                        source={kisaan}
                        style={listStyle.listLogoImg}
                    />
                    <View>
                        <Text style={listStyle.listText}>Tata Consultancy Services </Text>
                        <Text style={listStyle.listSubText}>Super Coridoor Rd, Indore, Madhya Pradesh</Text>
                        </View>
                    </View>
                    <AddIcon name='add' size={25} color='#FFF' style={listStyle.listAddStyle} />
                </View>
                <TextInput
                    style={listStyle.searchInputStyle}
                    placeholder='Search Employee...'
                    placeholderTextColor="#592DA1"
                />
            </View>
            <ScrollView>
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
                            <Text 
                            style={listStyle.listBtn}
                            onPress={()=>navigation.navigate('EmployeeDetails')}
                            >Review</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    
});