import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native-elements';
import { primary, windowHeight } from '../Styles/customStyle';

export default function Profile() {
    return (
        <ScrollView>
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headerPartOne}>
                    <Text style={styles.heading}>Profile</Text>
                </View>
                <View style={styles.headerPartTwo}>
                    <View>
                        <View style={styles.profileLogo}>
                            <Text style={styles.profileText}>R</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.nameText}>Ritik Sharma</Text>
                        <Text style={{ color: '#FFF', fontSize: 18 }}>keshavvisshnoi4@gmail.com</Text>
                    </View>
                </View>
            </View>
            {/* <View>
                <ScrollView
                    style={styles.profileScroll}
                    horizontal={false}
                    scrollEventThrottle={16}
                >
                    <Text style={[styles.heading, {paddingHorizontal: 10, paddingTop: 10}]}>How can we help?</Text>
                </ScrollView>
            </View> */}
        </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    mainContainer: {},
    headerContainer: {
        paddingHorizontal: 15,
        paddingTop: 10
    },
    headerPartOne: {
        marginBottom: 10
    },
    heading: {
        fontSize: 28,
        color: '#000'
    },
    headerPartTwo: {
        backgroundColor: '#6639AF',
        borderRadius: 15,
        padding: 15,
    },
    profileLogo: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70 / 2,
        backgroundColor: '#EA7773'
    },
    profileText: {
        fontSize: 40,
        fontWeight: '400',
        color: '#FFF'
    },
    nameText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '500'
    },
    // profileScroll: {
    //     flex: 1,
    //     height: windowHeight - ((40 * windowHeight) / 100),
    //     // backgroundColor: 'pink',
    // }
});