import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native-elements/dist/image/Image';
import { primary, windowHeight } from '../Styles/customStyle';
import { Rating } from 'react-native-elements';
import ImgIcon from 'react-native-vector-icons/FontAwesome6';
import {NATIVE_API_URL} from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';


export default function PostReview() {
    const route = useRoute();
    const { id, empDetails,orgDetails } = route.params;
    const [reviewData, setReviewData] = useState({
        organization_id: id.orgId,
        employee_id: id.empId,
        comment: '', 
        rating : 0,
    })
    const [rating, setRating] = useState(0);
    const [formsErrors, setFormErrors] = useState({});
    const [error, setError] = useState('')
    const [isFocused,setIsFocused] = useState()
    const navigation = useNavigation()
  

    function validate() {
        const errors = {};
        if (!reviewData.comment) errors.comment = 'Comment is required*';
        if(reviewData.comment.length < 250) errors.comment = 'Minimum 250 Characters is required'
        if (!reviewData.rating) errors.rating = 'Rating is required*';
        return errors;
      }

    const handleRatingFinish = (ratingValue) => {
       setReviewData((prev) => ({...prev, rating : ratingValue}))
    };

    
    const handleChange= (name, value)=> {
        setReviewData((prev) => ({...prev, [name] : value}))
    }


    const selectImage = async name => {
        try {
          const doc = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.images],
          });
          setReviewData(prev => ({...prev, [name]: doc}));
        } catch (error) {
          console.log("error selectimage",error);
        }
      };

    const handleSubmit = async () => {
        const errors = validate();
        setFormErrors(errors)


        const formData = new FormData();
        Object.keys(reviewData).forEach(key => {
            formData.append(key, reviewData[key]);
        });

        console.log(formData)

       try {
        console.log('api')
        const res = await ApiBackendRequest(`${NATIVE_API_URL}/create/review/`, formData)
        console.log('after api')
        
            console.log(res)
        if(res.data){
            if(res.data.is_review_added_successfull){
                navigation.navigate('EmployeeDetails',{
                    orgName : orgName,
                    orgId : id.orgId,
                    empId : id.empId
                })
            }
        }
        if(res.isexception){
            console.log(res.exceptionmessage.error)
        }
       } catch (error) {
        // console.log(error)
       }
            
        
        
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
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
                            <Text style={styles.orgHeading}>{orgDetails.orgName}</Text>
                        </View>
                        
                    </View>
                    <View>

                    <View style={styles.footerContainer}>
                        <View style={styles.ratingContainer}>
                            <Rating
                                type="custom"
                                ratingColor="gold"
                                ratingCount={5}
                                startingValue={0}
                                imageSize={30}
                                onFinishRating={handleRatingFinish}
                                />
                            {formsErrors.rating && (
                                <Text style={styles.errors}>{formsErrors.rating}</Text>
                            )}
                    </View>
                    
                    {reviewData.image== null? 
                    <TouchableOpacity 
                    onPress={()=>selectImage('image')}
                    >
                        <ImgIcon name="image" size={30} color="#000" />
                    </TouchableOpacity>
                    :<View style={styles.PreviewContainer}>
                        <Image
                        source={reviewData.image}
                        style={styles.previewImage}
                        />
                         <TouchableOpacity
                            onPress={() =>
                            setReviewData(previous => ({
                                ...previous,
                                image: null,
                            }))
                            }>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    }
                </View>
                    </View>

                    <View>
                        <TextInput
                            multiline
                            numberOfLines={14}
                            maxLength={500}
                            placeholder='Write your review here...'
                            placeholderTextColor="#535C68"
                            style={styles.inputStyle}
                            onChangeText={(text) => handleChange('comment', text)}
                        >
                        </TextInput>
                        {formsErrors.comment && (
                            <Text style={styles.errors}>{formsErrors.comment}</Text>
                        )}
                    </View>
                </View>
                
                <View style={[styles.orgContainer, styles.postBtnContainer]}>
                            <TouchableOpacity 
                            onPress={()=>{
                                navigation.navigate('EmployeeDetails',{
                                    empDetails : empDetails,
                                    orgId : id.orgId,
                                    empId : id.empId
                                })
                            }}
                            style={styles.cancelButton}                          
                            >
                                <Text style={styles.cancelBtnText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            onPress={()=> handleSubmit()}                            
                            style={styles.postButton}                          
                            >
                                <Text style={styles.btnText}>
                                    Post
                                </Text>
                            </TouchableOpacity>
                        </View>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex : 1,
        gap: 15,
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
    ratingContainer : {
        gap:5
    },
    orgHeading: {
        fontSize: 22,
        fontWeight: '500',
        marginLeft: 10,
        color:'black'
    },
    close: {
        marginHorizontal: 8
    },
    postBtnContainer: {
        justifyContent: 'space-between',
        paddingHorizontal : 10,
    },
    cancelButton: {
        borderWidth : 1,
        borderColor: primary,
        width : 100,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    postButton: {
        backgroundColor: primary,
        width : 120,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    cancelBtnText : {
        color: primary,
        fontSize: 14,
        fontWeight: '500',
        textAlign : 'center'
    }, 
    btnText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
        textAlign : 'center'
    },
    inputStyle: {
        marginHorizontal:10,
        paddingHorizontal: 22,
        fontSize: 16,
        color: '#000',
        fontWeight: '400',
        textAlignVertical: 'top',
        borderWidth : 2,
        borderColor : primary,
        borderRadius : 10
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems : 'center',
        paddingBottom: 20
    },
    errors: {
        color: 'red',
        paddingLeft: 15,
        fontSize : 13
    },
    previewImage : {
        height : 100,
        width : 100
    },
    PreviewContainer : {
        flexDirection : 'column'
    },
    cancelText : {
        color : 'black',
        fontSize : 15,
        fontWeight : '500',
        marginTop : 10
    }
});