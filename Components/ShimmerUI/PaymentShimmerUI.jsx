import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ShimmerText from './ShimmerText';

export default function PaymentShimmerUI() {
    const dataContainer = () => {
        return (
            <View style={styles.container}>
                <ShimmerText style={[styles.text, { width: '80%' }]}></ShimmerText>
                <ShimmerText style={[styles.text, { width: '60%' }]}></ShimmerText>
                <ShimmerText style={[styles.text, { width: '40%' }]}></ShimmerText>
            </View>
        )
    };
    return (
        <View style={styles.mainConatiner}>
            {Array.from({ length: 10 }).map((_, index) => (
                <React.Fragment key={index}>{dataContainer()}</React.Fragment>
            ))}
        </View>
    )
};

const styles = StyleSheet.create({
    mainConatiner: {},
    container: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        backgroundColor: '#FFF',
        marginVertical: 2
    },
    text: {
        height: 14,
        borderRadius: 10,
        marginVertical: 3
    },
});