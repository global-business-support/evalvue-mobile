import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { primary } from '../Styles/customStyle';
import MsgIcon from 'react-native-vector-icons/MaterialIcons';
import CallIcon from 'react-native-vector-icons/Feather';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function ContactUs() {
    const [error, setError] = useState('');

    const handleEmailPress = () => {
        const email = 'contact@evalvue.com';
        const subject = 'Query';
        const body = 'Hello, I have a query regarding...';
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.openURL(mailtoUrl).catch((err) => setError('Error opening email client', err));
    };

    if (error) {
        return (
            <View>
                <Text style={{ color: 'red', fontSize: 16, fontWeight: '600', textAlign: 'left', padding: 10 }}>{error}</Text>
            </View>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headingMainContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.mainHeadingText}>Contact Us</Text>
                </View>
            </View>
            <ScrollView
                style={styles.contactMainContainer}
                horizontal
            >
                <View style={styles.contactContainer}>
                    <View style={styles.subHeadingContainer}>
                        <MsgIcon name='message' size={24} color='#000' />
                        <Text style={styles.headingText}>Online Enquiry</Text>
                    </View>
                    <Text style={styles.msgText}>We are here to help you with in three working days.</Text>
                    <TouchableOpacity
                        style={styles.btnContainer}
                        onPress={handleEmailPress}
                    >
                        <Text style={styles.btnText}>Message your query</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contactContainer}>
                    <View style={styles.subHeadingContainer}>
                        <CallIcon name='phone-call' size={22} color='#000' />
                        <Text style={styles.headingText}>Call Us</Text>
                    </View>
                    <Text style={[styles.msgText, { color: '#000' }]}>(+91) 6263767770</Text>
                    <Text style={styles.msgText}>Monday to Friday: 9am to 9pm, Closed on Saturday and Sunday</Text>
                </View>
                <View style={styles.contactContainer}>
                    <View style={styles.subHeadingContainer}>
                        <EmailIcon name='email-send' size={24} color='#000' />
                        <Text style={styles.headingText}>Write To Us</Text>
                    </View>
                    <Text style={[styles.msgText, { color: '#000' }]}>Email: contact@evalvue.com</Text>
                    <Text style={styles.msgText}>Global Bussiness Support, 518, 5th Floor Shagun Tower, Above Apna Sweet Vijay Nagar, Indore (M.P)</Text>
                </View>
            </ScrollView>
            <Text style={styles.subHeadingText}>Another Requests</Text>
            <ScrollView style={{ margin: 10, height: '60%' }}>
                <View style={styles.footerContainer}>
                    <Text style={styles.headingText}>Complaint</Text>
                    <Text style={styles.footerText}>If you have a comment or complaint about our service, let us know.</Text>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.headingText}>Documents</Text>
                    <Text style={styles.footerText}>If you need any documents or have questions about your documentation, let us know.</Text>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.headingText}>Policy Related</Text>
                    <Text style={styles.footerText}>If you have any questions or comments about our policies, we are here to help.</Text>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.headingText}>Services Related</Text>
                    <Text style={styles.footerText}>Services Related If you have inquiries or issues related to our services, please contact us.</Text>
                </View>
            </ScrollView>
        </View>
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
        justifyContent: 'center',
        borderRadius: 3,
        width: '100%',
        paddingVertical: 8,
        paddingLeft: 10,
    },
    mainHeadingText: {
        color: primary,
        fontSize: 20,
        fontWeight: '600',
    },
    contactMainContainer: {
        margin: 10,
    },
    contactContainer: {
        width: 220,
        height: 155,
        padding: 10,
        backgroundColor: '#DAE0E2',
        borderRadius: 5,
        elevation: 5,
        margin: 5
    },
    subHeadingContainer: {
        flexDirection: 'row',
        gap: 5,
        paddingBottom: 5,
        alignItems: 'center'
    },
    headingText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600'
    },
    msgText: {
        color: 'gray',
        fontSize: 12,
        marginBottom: 8,
        lineHeight: 17,
        fontWeight: '500'
    },
    btnContainer: {
        width: '80%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        paddingVertical: 4,
    },
    btnText: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '500'
    },
    subHeadingText: {
        color: primary,
        marginLeft: 12,
        fontWeight: '600',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    footerContainer: {
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginBottom: 5,
        elevation: 1
    },
    footerText: {
        color: 'gray',
        fontWeight: '500',
        paddingTop: 5
    }
});