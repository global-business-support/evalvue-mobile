import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native-elements/dist/image/Image';
import { windowHeight } from '../Styles/customStyle';
import { Rating } from 'react-native-elements';
import ImgIcon from 'react-native-vector-icons/FontAwesome6';

export default function PostReview() {
    const [rating, setRating] = useState(0);

    const handleRatingFinish = (ratingValue) => {
        setRating(ratingValue)
    };
    return (
        <KeyboardAvoidingView>
            <View style={styles.mainContainer}>
                <View>
                    <View style={styles.headerContainer}>
                        {/* <CloseIcon name="close" size={36} color="#000" style={styles.close} /> */}
                        <View style={styles.orgContainer}>
                            <Image
                                source={{
                                    uri: 'http://test.evalvue.com/assets/evalvuelogo-Cc-YEGpi.jpg'
                                }}
                                style={styles.loginLogo}
                            />
                            <Text style={styles.orgHeading}>Evalvue</Text>
                        </View>
                        <View style={[styles.orgContainer, styles.postBtnContainer]}>
                            <Text style={styles.btnText}>
                                Post
                            </Text>
                        </View>
                    </View>

                    <View>
                        <TextInput
                            multiline
                            numberOfLines={14}
                            placeholder='Write your review here...'
                            placeholderTextColor="#535C68"
                            style={styles.inputStyle}
                        >
                        </TextInput>
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <Rating
                        type="custom"
                        ratingColor="gold"
                        ratingCount={5}
                        startingValue={0}
                        imageSize={30}
                        onFinishRating={handleRatingFinish}
                    />
                    <ImgIcon name="image" size={30} color="#000" />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        height: windowHeight,
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
    },
    headerContainer: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    orgContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginLogo: {
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
    },
    orgHeading: {
        fontSize: 22,
        fontWeight: '500',
        marginLeft: 10
    },
    close: {
        marginHorizontal: 8
    },
    postBtnContainer: {
        backgroundColor: '#99AAAB',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6
    },
    btnText: {
        fontSize: 14
    },
    inputStyle: {
        paddingHorizontal: 22,
        fontSize: 16,
        color: '#000',
        fontWeight: '400',
        textAlignVertical: 'top'
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 50
    }
});