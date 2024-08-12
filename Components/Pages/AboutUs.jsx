import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { primary } from '../Styles/customStyle';
import { ScrollView } from 'react-native-gesture-handler';
import TruncatedText from '../Othercomponent/TruncatedText';

export default function AboutUs() {
   
     
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headingMainContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.mainHeadingText}>About Us</Text>
                </View>
            </View>
            <View style={styles.aboutTextContainer}>
                <Text style={styles.aboutText}>
                    Welcome to Evalvue where employee feedback meets innovations, we are dedicated to transforming the way companies understand and engage with their workforce. At evalvue we believe that every voice matters and that constructive feedback is the cornerstone of a thriving workplace.
                </Text>
            </View>
            <ScrollView style={{ margin: 10 }}>
                    <View style={styles.footerContainer}>
                        <Text style={styles.headingText}>Our Mission</Text>
                        <Text style={styles.footerText}>
                            <TruncatedText
                                text={" Empower everyone through exemplary employees by contrasting good employees with bad ones. We add worldwide companies to assist in selecting the right employees, ensuring that each organization is equipped with top talent to drive success. Moreover, we recognize that talent knows no borders. By partnering with a diverse array of global companies, we expand the pool of opportunities and resources available for organizations seeking to attract top talent. Whether it's through targeted recruitment strategies, talent development initiatives, or access to specialized expertise, our aim is to ensure that every organization is equipped with the best possible talent to drive success."}
                            />
                           
                        
                        </Text>
                    </View>
                    <View style={styles.footerContainer}>
                        <Text style={styles.headingText}>Our Vision</Text>
                        <Text style={styles.footerText}>
                            <TruncatedText
                                text={"At Evalvue, our vision is to promote transparency and authenticity in the workplace. Our goal is to create a platform where companies can post reviews of their employees' performance when they leave a job, allowing potential employers to clearly see their identity and work experience when applying for a new position. Through Evalvue, we make it possible to identify individuals who provide fake experience, as their actual work history is displayed on our platform. Additionally, we provide ratings for good employees based on their work methods and background, showcasing their exceptional performance. We aim to build a platform that helps employers make informed and accurate hiring decisions while giving employees the opportunity to demonstrate their true potential. Through Evalvue, we strive to create a transparent, reliable, and fair job market for all."}
                            />
                            
                        </Text>
                    </View>
            </ScrollView>
        </View >
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    headingMainContainer: {
        alignItems: 'center',
        paddingBottom: 10
    },
    headingContainer: {
        backgroundColor: '#FFF',
        alignItems: 'flex-start',
        paddingLeft: 10,
        justifyContent: 'center',
        borderRadius: 3,
        width: '100%',
        paddingVertical: 8,
    },
    mainHeadingText: {
        color: primary,
        fontSize: 20,
        fontWeight: '600',
    },
    aboutTextContainer :{
        padding : 20,
        backgroundColor : "#2C3335"
    },
    aboutText: {
        color:'white',
        textAlign: 'justify',
        fontWeight: '500',
        lineHeight: 18,
        fontSize: 15,
        borderRadius: 100
    },
    footerContainer: {
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginBottom: 8,
    },
    footerText: {
        color: 'gray',
        fontWeight: '500',
        fontSize: 12,
        paddingTop: 5,
        lineHeight: 18
    },
    headingText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});