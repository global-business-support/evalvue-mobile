import { StyleSheet, View } from 'react-native';
import React from 'react';
import NotificationIcon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import ShimmerText from './ShimmerText';

export const reviewCard = () => {
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.footerOneContainer}>
                <ShimmerText style={styles.imgLogo}></ShimmerText>
                <ShimmerText style={[styles.text, { width: '60%' }]}></ShimmerText>
            </View>
            <View style={styles.footerTwoContainer}>
                <ShimmerText style={styles.imgLogo}></ShimmerText>
                <ShimmerText style={[styles.text, { width: '50%' }]}></ShimmerText>
            </View>
            <ShimmerText style={styles.comment}></ShimmerText>
        </View>
    )
};
export default function ReviewShimmerUI() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <ShimmerText style={styles.profile}></ShimmerText>
                <ShimmerText style={styles.searchBar}></ShimmerText>
                <NotificationIcon name="notification-important" size={28} color="#DAE0E2" />
            </View>
            <ScrollView style={styles.scrollStyle}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <React.Fragment key={index}>{reviewCard()}</React.Fragment>
                ))}
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
    },
    searchBar: {
        width: '70%',
        height: 25,
        borderRadius: 10
    },
    imgLogo: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30 / 2,
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
        height: 10,
        borderRadius: 10,
        marginLeft: 10
    },
    comment: {
        width: '97%',
        height: 150,
        margin: 6,
        borderRadius: 8
    }
});