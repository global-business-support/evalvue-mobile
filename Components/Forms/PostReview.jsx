import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native-elements/dist/image/Image';
import { customStyle } from '../Styles/customStyle';
import { Rating } from 'react-native-elements';

export default function PostReview() {
    const [empRating, setEmpRating] = useState(0);

    const handleRating = (rating)=>{
        setEmpRating(rating);
        console.log(empRating)
    };
    useEffect(() => {
        console.log(empRating);
    }, [empRating]);
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <CloseIcon name="close" size={36} color="#000" style={styles.close} />
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
                <Rating
                showRating
                type="custom"
                ratingColor="black"
                ratingCount={5}
                startingValue={0}
                imageSize={30}
                onFinishRating={()=>handleRating()}
                />
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
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        // backgroundColor: 'pink',
    },
    headerContainer: {
        paddingVertical: 20,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    orgContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginLogo: {
        height: 60,
        width: 60,
        // marginTop: 50,
        borderRadius: 65 / 2,
        // backgroundColor: 'gray'
    },
    orgHeading: {
        fontSize: 28,
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
        fontSize: 20
    },
    // inputBox: {
    //     flex: 1,
    //     // flexDirection: 'row',
    //     alignItems: 'center',
    //     backgroundColor: '#DAE0E2',
    //     borderRadius: 6,
    //     marginVertical: 10,
    //     paddingHorizontal: 8
    // },
    inputStyle: {
        paddingHorizontal: 22,
        fontSize: 22,
        color: '#000',
        fontWeight: '400',
        textAlignVertical: 'top'
    },
});