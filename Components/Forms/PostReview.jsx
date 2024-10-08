import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'react-native-elements/dist/image/Image';
import { primary } from '../Styles/customStyle';
import { Rating } from 'react-native-elements';
import ImgIcon from 'react-native-vector-icons/FontAwesome6';
import { NATIVE_API_URL } from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImagePreview from '../ImagePreview/ImagePreview';

export default function PostReview() {
    const route = useRoute();
    const { id, empDetails, orgDetails } = route.params;
    const [reviewData, setReviewData] = useState({
        organization_id: id.orgId,
        employee_id: id.empId,
        comment: '',
        rating: 0,
    });
    const [formsErrors, setFormErrors] = useState({});
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [url, setUrl] = useState({});

    const handleImagePreview = url => {
        setShowImage(true);
        setUrl(url);
      };
      
    function validate() {
        const errors = {};
        if (!reviewData.comment) errors.comment = 'Comment is required*';
        if (reviewData.comment.length < 250) errors.comment = 'Minimum 250 Characters are required'
        if (!reviewData.rating) errors.rating = 'Rating is required*';
        return errors;
    };
    const handleRatingFinish = (name, ratingValue) => {
        setReviewData((prev) => ({ ...prev, rating: ratingValue }));
        setFormErrors((prev) => ({ ...prev, [name]: '' }));
    };
    const handleChange = (name, value) => {
        setReviewData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: '' }));
    };
    const selectImage = async name => {
        try {
            const doc = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            });
            setReviewData(prev => ({ ...prev, [name]: doc }));
        } catch (error) {
            console.log("error selectimage");
        }
    };

    const handleSubmit = async () => {
        const errors = validate();
        setFormErrors(errors)
        if(errors){
            
            const formData = new FormData();
            Object.keys(reviewData).forEach(key => {
                formData.append(key, reviewData[key]);
            });
            try {
                setLoading(true);
                const res = await ApiBackendRequest(`${NATIVE_API_URL}/create/review/`, formData);
                setLoading(false);
                if (res.data) {
                    if (res.data.is_review_added_successfull) {
                        navigation.navigate('EmployeeDetails', {
                            empDetails: empDetails,
                            orgDetails: orgDetails,
                            orgId: id.orgId,
                            empId: id.empId
                        })
                    }
                }
                if (res.isexception) {
                    setError(res.exceptionmessage.error)
                }
            } catch (error) {
                setError(error)
            };
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <View>
                    <View style={styles.headerContainer}>
                        <View style={styles.orgContainer}>
                            <Image
                                source={{
                                    uri: orgDetails.orgImage
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
                                    ratingColor="#FFA823"
                                    ratingBackgroundColor="#FFF"
                                    ratingCount={5}
                                    startingValue={0}
                                    imageSize={30}
                                    onFinishRating={(value) => handleRatingFinish('rating', value)}
                                />
                                {formsErrors.rating && (
                                    <Text style={styles.errors}>{formsErrors?.rating}</Text>
                                )}
                            </View>
                            {reviewData.image == null?
                                <TouchableOpacity
                                    onPress={() => selectImage('image')}
                                >
                                    <ImgIcon name="image" size={30} color="#000" />
                                </TouchableOpacity>
                                : <View style={styles.PreviewContainer}>
                                    <Image
                                        source={reviewData.image}
                                        style={styles.previewImage}
                                        onPress={() => {
                                            handleImagePreview(reviewData?.image.uri);
                                            console.log(url)
                                          }}
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
                        <Text style={styles.charLength}>Minimum Characters 250/{reviewData.comment.length}</Text>
                        {formsErrors.comment && (
                            <Text style={styles.errors}>{formsErrors.comment}</Text>
                        )}
                        {error && (
                            <Text style={styles.errors}>{error}</Text>
                        )}
                    </View>
                </View>
                <View style={[styles.orgContainer, styles.postBtnContainer]}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('EmployeeDetails', {
                                empDetails: empDetails,
                                orgId: id.orgId,
                                empId: id.empId
                            })
                        }}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.cancelBtnText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleSubmit()}
                        style={styles.postButton}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.btnText}>Post</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <ImagePreview
                    imageUrl={url}
                    visible={showImage}
                    onClose={() => setShowImage(false)}
                />
            </View>
            
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
    ratingContainer: {
        gap: 5
    },
    orgHeading: {
        fontSize: 22,
        fontWeight: '500',
        marginLeft: 10,
        color: 'black'
    },
    close: {
        marginHorizontal: 8
    },
    postBtnContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: primary,
        width: 100,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    postButton: {
        backgroundColor: primary,
        width: 120,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    cancelBtnText: {
        color: primary,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    btnText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    },
    inputStyle: {
        marginHorizontal: 10,
        paddingHorizontal: 22,
        fontSize: 16,
        color: '#000',
        fontWeight: '400',
        textAlignVertical: 'top',
        borderWidth: 2,
        borderColor: primary,
        borderRadius: 10
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20
    },
    errors: {
        color: 'red',
        paddingLeft: 15,
        fontSize: 13
    },
    previewImage: {
        height: 100,
        width: 100
    },
    PreviewContainer: {
        flexDirection: 'column'
    },
    cancelText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10
    },
    charLength: {
        color: '#999',
        fontSize: 15,
        marginTop: 8,
        marginLeft: 12
    }
});