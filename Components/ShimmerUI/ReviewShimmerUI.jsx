import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DotIcon from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';

export default function ReviewShimmerUI() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.profile}></View>
                <View style={styles.searchBar}></View>
                <DotIcon name="dots-three-vertical" size={22} color="#616C6F" />
            </View>
            <ScrollView style={styles.scrollStyle}>
                <View style={styles.reviewContainer}>
                    <View style={styles.footerOneContainer}>
                        <View style={styles.imgLogo}></View>
                        <View style={styles.text}></View>
                    </View>
                    <View style={styles.footerTwoContainer}>
                        <View style={styles.imgLogo}></View>
                        <View style={styles.text}></View>
                    </View>
                    <View style={styles.comment}></View>
                </View>
                <View style={styles.reviewContainer}>
                    <View style={styles.footerOneContainer}>
                        <View style={styles.imgLogo}></View>
                        <View style={styles.text}></View>
                    </View>
                    <View style={styles.footerTwoContainer}>
                        <View style={styles.imgLogo}></View>
                        <View style={styles.text}></View>
                    </View>
                    <View style={styles.comment}></View>
                </View>
                <View style={styles.reviewContainer}>
                    <View style={styles.footerOneContainer}>
                        <View style={styles.imgLogo}></View>
                        <View style={styles.text}></View>
                    </View>
                    <View style={styles.footerTwoContainer}>
                        <View style={styles.imgLogo}></View>
                        <View style={styles.text}></View>
                    </View>
                    <View style={styles.comment}></View>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {},
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#FFF'
    },
    profile: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40 / 2,
        backgroundColor: '#616C6F',
    },
    searchBar: {
        width: '70%',
        backgroundColor: '#616C6F',
        height: 25,
        borderRadius: 10
    },
    imgLogo: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30 / 2,
        backgroundColor: '#DAE0E2',
    },
    text: {
        width: '80%',
        height: 15,
        backgroundColor: '#DAE0E2',
        borderRadius: 10
    },
    reviewContainer: {
       backgroundColor: '#FFF',
       marginTop: 6
    },
    footerOneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderBottomWidth: 1,
        borderColor: '#616C6F'
    },
    footerTwoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    scrollStyle: {
        backgroundColor: '#DAE0E2'
    },
    text: {
        width: '60%',
        height: 10,
        backgroundColor: '#616C6F',
        borderRadius: 10,
        marginLeft: 10
    },
    comment: {
        width: '97%',
        height: 150,
        backgroundColor: '#EAF0F1',
        margin: 6,
        borderRadius: 8
    }
});