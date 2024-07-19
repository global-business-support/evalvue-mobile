import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import logo from '../../assets/TCS.jpg';
import { Image } from 'react-native-elements';
import DotIcon from 'react-native-vector-icons/Entypo';
import { listStyle } from '../Styles/listStyle';

export default function SearchByAadhar() {
    return (
        <View style={listStyle.listMainContainer}>
            <View style={listStyle.listHeaderContainer}>
                <Text style={listStyle.listHeading}>Search By Aadhar Number</Text>
                <TextInput
                    style={listStyle.searchInputStyle}
                    placeholder='Employee Aadhar number...'
                    placeholderTextColor="#592DA1"
                />
            </View>
            <ScrollView>
                <View style={listStyle.listFooterConatiner}>
                <Text style={styles.searchHeading}>Search History</Text>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Aaman Chhalotre </Text>
                                <Text style={listStyle.listSubTitleText}>Software Developer</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            {/* <DotIcon name='dots-three-vertical' size={16} color='#47535E' /> */}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    searchHeading: {
        textAlign: 'left',
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
        padding: 10
    }
});
