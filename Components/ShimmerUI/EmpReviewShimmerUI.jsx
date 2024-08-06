import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { reviewCard } from './ReviewShimmerUI';
import ShimmerText from './ShimmerText';

export default function EmpReviewShimmerUI() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.firstContainer}>
                <View style={styles.headerContainer}>
                    <ShimmerText style={styles.profile}></ShimmerText>
                    <ShimmerText style={[styles.text, { width: '60%' }]}></ShimmerText>
                </View>
                <ShimmerText style={[styles.text, { width: '50%' }]}></ShimmerText>
                <ShimmerText style={[styles.text, { width: '40%' }]}></ShimmerText>
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
        justifyContent: 'flex-start',
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
    scrollStyle: {
        backgroundColor: '#DAE0E2'
    },
    text: {
        height: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginVertical: 5
    },
    firstContainer: {
        backgroundColor: '#FFF',
        paddingVertical: 10
    }
});