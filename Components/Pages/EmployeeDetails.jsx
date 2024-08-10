import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { Image, Rating } from 'react-native-elements';
import { NATIVE_API_URL } from '@env';
import { primary } from '../Styles/customStyle';
import { empListStyle } from '../Styles/empListStyle';
import EmpReviewShimmerUI from '../ShimmerUI/EmpReviewShimmerUI'
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import TruncatedText from '../Othercomponent/TruncatedText';
import { capitalizeEachWord } from '../Custom-Functions/customFunctions';
import ImagePreview from '../ImagePreview/ImagePreview';

export default function EmployeeDetails() {
  const [reviewData, setReviewData] = useState([]);
  const [empData, setEmpData] = useState(null);
  const [error, setError] = useState('');
  const [isReviewMapped, setIsReviewMapped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const route = useRoute();
  const { empDetails, orgDetails, orgName, orgId, empId, SearchByAadhar } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showImage, setShowImage] = useState(false);
  const [url, setUrl] = useState('');


  const handleImagePreview = url => {
    setUrl(url);
    setShowImage(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await ApiBackendRequest(`${NATIVE_API_URL}/reviews/`, {
          search_by_aa: SearchByAadhar,
          organization_id: orgId,
          employee_id: empId,
        });
        if (res.data) {
          if (res.data.is_review_mapped_to_employee_successfull) {
            setIsReviewMapped(true);
            setReviewData(res.data.review_list);
            setEmpData(res.data.employee_list[0]);
          }
        } else if (res.isexception) {
          setError(res.exceptionmessage.error)
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, orgId, empId]);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={empListStyle.mainContainer}>
        <View style={empListStyle.secondContainer}>
          <View style={empListStyle.empContainer}>
            <View style={empListStyle.subContainer}>
              {empData?.employee_image && empData?.employee_image !== 'null' && (
                <Image source={{ uri: empData?.employee_image }} style={empListStyle.empImg} onPress={() => {
                  handleImagePreview(empData?.employee_image);
                }}/>
              )}
              <View>
                <Text style={empListStyle.empNameStyle}>
                  <TruncatedText
                    text={capitalizeEachWord(empData?.employee_name)}
                    maxLength={15}
                    dot={true}
                  />
                </Text>
                <Text style={empListStyle.dsgText}>{capitalizeEachWord(empData?.designation)}</Text>
              </View>
            </View>
            <View>
              <Text style={empListStyle.timeText}>{item?.created_on}</Text>
              <View style={styles.ratingContainer}>
                <Rating
                  type="star"
                  ratingColor="gold"
                  ratingCount={5}
                  startingValue={item?.rating}
                  imageSize={14}
                  readonly
                />
              </View>
            </View>
          </View>
          <View style={empListStyle.commentConatiner}>
            <Text style={empListStyle.commentText}>
              <TruncatedText
                text={item?.comment}
                maxLength={
                  item?.image
                    ? readMore
                      ? item?.comment?.length
                      : 70
                    : item?.comment?.length
                }
                dot={true}
              />
              {item.image && (
                <Text
                  style={{ color: primary, fontSize: 13, fontWeight: '500' }}
                  onPress={() => {
                    handleReadMore();
                  }}>
                  {' '}
                  {readMore ? 'less' : 'read more'}
                </Text>
              )}
            </Text>
            {item?.image && item?.image !== 'null' && (
              <Image source={{ uri: item?.image }} style={empListStyle.reviewImg} onPress={() => {
                handleImagePreview(item?.image);
              }}/>
            )}
          </View>
        </View>
      </View>
    );
  };

  const noReview = () => {
    return (
      <View>
        <Text style={{ color: primary, fontSize: 16, fontWeight: '600', textAlign: 'left', padding: 10 }}>No review given.</Text>
      </View>
    )
  };

  if (loading) {
    return <EmpReviewShimmerUI />;
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
      <View style={styles.headerContainer}>
        <View style={styles.headerPartTwo}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <View>
              {empDetails?.employee_image && empDetails?.employee_image !== 'null' && (
                <Image source={{ uri: empDetails?.employee_image }} style={styles.profileLogo} onPress={() => {
                  handleImagePreview(empDetails?.employee_image );
                }}/>
              )}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.nameText}>
                  <TruncatedText 
                    text={capitalizeEachWord(empDetails?.employee_name)}
                    maxLength={20}
                    dot={true}
                  />
                  </Text>
                <Text
                  style={{ color: '#FFF', fontSize: 10, fontWeight: '500' }}>
                    <TruncatedText 
                    text={capitalizeEachWord(empDetails?.designation)}
                    maxLength={25}
                    dot={true}
                  />
                  
                </Text>
              </View>
              <View style={styles.activeInactive}>
                <View style={[styles.dot, { backgroundColor: (SearchByAadhar) ? (empDetails.status_id == 1) ? '#00e600' : '#ff8566' : '#00e600' }]} />
                <Text style={[styles.activeInactiveText, { color: (SearchByAadhar) ? (empDetails.status_id == 1) ? '#00e600' : '#ff8566' : '#00e600', paddingRight: (empDetails.status_id == 1) ? 15 : '#ff8566' }]}>
                  {(SearchByAadhar) ? (empDetails.status_id == 1) ? 'Active' : 'In Active' : 'Active'}

                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginLeft: 2,
              flexDirection: 'row',
              alignContent: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <View>
              {(SearchByAadhar) ? (empDetails.status_id == 1) ? <Text style={styles.orgname}>{capitalizeEachWord(orgName)}</Text> : '' : <Text style={styles.orgname}>{capitalizeEachWord(orgName)}</Text>}
              <View style={styles.empRatingContainer}>
                <Rating
                  type="custom"
                  ratingColor={primary}
                  ratingCount={5}
                  startingValue={empData?.avg_rating}
                  imageSize={14}
                  readonly
                  style={styles.ratingStyle}
                />
              </View>
            </View>

            <View style={{ gap: 5 }}>
              {(SearchByAadhar) ? empDetails.status_id == 1 ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('AddReview', {
                    empDetails: empDetails,
                    orgDetails: orgDetails,
                    id: {
                      orgId: orgId,
                      empId: empId,
                    },
                  }
                  )}
                >
                  <Text style={styles.buttonText}>Add Review</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('AddToOrganization', {
                    empDetails: empDetails,
                    orgDetails: orgDetails
                  }
                  )}
                >
                  <Text style={styles.buttonText}>Add Employee</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('AddReview', {
                    empDetails: empDetails,
                    orgDetails: orgDetails,
                    id: {
                      orgId: orgId,
                      empId: empId,
                    },
                  }
                  )}
                >
                  <Text style={styles.buttonText}>Add Review</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.totalReviews}>Total Reviews : {reviewData.length}</Text>
            </View>
          </View>
        </View>
      </View>
      <FlatList
        data={reviewData}
        keyExtractor={item => item?.review_id ? item?.review_id.toString() : item.toString()}
        renderItem={renderItem}
        ListEmptyComponent={noReview}
      />
      <ImagePreview
        imageUrl={url}
        visible={showImage}
        onClose={() => setShowImage(false)}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#DAE0E2',
  },
  headerContainer: {
    paddingTop: 1,
    marginBottom: 2
  },
  orgname: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  headerPartTwo: {
    gap: 20,
    backgroundColor: primary,
    paddingHorizontal: 8,
    paddingTop: 15,
    paddingBottom: 4
  },
  profileLogo: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
    borderWidth: 1,
    borderColor: '#FFF'
  },
  nameText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    fontSize: 11,
    color: 'white',
    fontWeight: '500',
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  ratingContainer: {
    alignItems: 'flex-start',
    paddingTop: 4,
    alignItems: 'flex-end'
  },
  empRatingContainer: {
    alignItems: 'flex-start',
    marginTop: 4,
  },
  ratingStyle: {
    padding: 1,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 2
  },
  activeInactive: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 3,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    marginTop: 5,
  },
  activeInactiveText: {
    fontWeight: '500',
    fontSize: 12
  },
  totalReviews: {
    color: 'white',
    fontWeight: '500',
    fontSize: 10
  }
});