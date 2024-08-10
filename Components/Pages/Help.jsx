import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { primary } from '../Styles/customStyle';
import { useNavigation } from '@react-navigation/native';

const Help = () => {
    const [activeSections, setActiveSections] = useState([]);
    const navigation = useNavigation();

    const SECTIONS = [
        {
            title: 'How does Evalvue work?',
            content: "Evalvue operates by leveraging employee's work experiences. All companies upload reviews of their employees here, delineating their work methodologies and updates via posts. When an employee departs from the company, their review is appended by the company. Consequently, if they proceed for an interview elsewhere, the prospective employer can preview their data, facilitating the acquisition of a suitable employee for the company."
        },
        {
            title: 'What information is available on Evalvue?',
            content: "On Evalvue, clients can expect to find various types of information, such as employee performance reviews, ratings, work methods, background details, and an assessment of the employee's behavior and goal achievement for tasks performed for the company. This biodata assists other companies in selecting employees."
        },
        {
            title: "How can Evalvue benefit my company?",
            content: "Verify candidates' work experience, identify fake experience, and make informed hiring decisions based on performance ratings."
        },
        {
            title: "How can I sign up to Evalvue?",
            content: "To use Evalvue, You need to create an account. The user must be the owner or HR of the company. Then, they need to log in and choose a plan."
        },
        {
            title: "Is customer support avaiable for Evalvue users?",
            content: "Customer support is available to address any queries or issues they may encounter while using the platform. Contact our customer support. Email: contact@evalvue.com"
        },
    ];

    const renderHeader = (section, _, isActive) => {
        return (
            <View style={[styles.accordionHeader, isActive ? styles.activeAccordionHeader : null]}>
                <Text style={styles.accordionHeaderText}>{section.title}</Text>
                <Text style={styles.accordionArrow}>&rarr;</Text>
            </View>
        );
    };

    const renderContent = (section) => {
        return (
            <View style={styles.accordionContent}>
                <Text style={styles.accordionContentText}>{section.content}</Text>
            </View>
        );
    };

    const handleChange = (activeSections) => {
        setActiveSections(activeSections);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Help Center</Text>
            </View>
            <View style={styles.heroSection}>
                <View style={styles.heroTextContainer}>
                    <Text style={styles.heroTitle}>How Can We Help?</Text>
                    <Text style={styles.heroSubtitle}>Find advice and answers from our support team fast or get in touch</Text>
                </View>
            </View>
            <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={handleChange}
                underlayColor="transparent"
            />
            <View style={styles.contactSection}>
                <Text style={styles.contactTitle}>Didn't find an answer to your question?</Text>
                <Text style={styles.contactSubtitle}>Get in touch with us for details on additional services and custom work pricing</Text>
                <TouchableOpacity 
                style={styles.contactButton} 
                onPress={() => navigation.navigate('Contact')}
                >
                    <Text style={styles.contactButtonText}>Contact Us</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },
    heroSection: {
        backgroundColor: '#2C3335',
        marginBottom: 40,
        overflow: 'hidden',
        position: 'relative',
        paddingVertical: 25
    },
    heroTextContainer: {
        paddingHorizontal: 20,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#fff',
        marginVertical: 10,
    },
    accordionHeader: {
        backgroundColor: primary,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    activeAccordionHeader: {
        backgroundColor: primary,
    },
    accordionHeaderText: {
        fontSize: 12,
        color: '#fff',
    },
    accordionArrow: {
        fontSize: 18,
        color: '#fff',
    },
    accordionContent: {
        backgroundColor: '#e9ecef',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    accordionContentText: {
        fontSize: 12,
        color: '#333',
        lineHeight: 17
    },
    contactSection: {
        padding: 20,
        alignItems: 'center',
    },
    contactTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000'
    },
    contactSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        color: '#000'
    },
    contactButton: {
        backgroundColor: primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Help;
