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
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import ReviewShimmerUI from '../ShimmerUI/ReviewShimmerUI';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EmployeeDetails() {
  const [reviewData, setReviewData] = useState([]);
  const [empData, setEmpData] = useState(null);
  const [error, setError] = useState('');
  const [isReviewMapped, setIsReviewMapped] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { empDetails, orgDetails, orgName, orgId, empId } = route.params;
  const navigation = useNavigation();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await ApiBackendRequest(`${NATIVE_API_URL}/reviews/`, {
          search_by_aa: false,
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
    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={empListStyle.mainContainer}>
        <View style={empListStyle.secondContainer}>
          <View style={empListStyle.empContainer}>
            <View style={empListStyle.subContainer}>
              {empData?.employee_image && empData?.employee_image !== 'null' && (
                <Image source={{ uri: empData?.employee_image }} style={empListStyle.empImg} />
              )}
              <View>
                <Text style={empListStyle.empNameStyle}>{empData?.employee_name}</Text>
                <Text style={empListStyle.dsgText}>{empData?.designation}</Text>
              </View>
            </View>
            <Text style={empListStyle.timeText}>{item?.created_on}</Text>
          </View>
          <View style={empListStyle.commentConatiner}>
            <Text style={empListStyle.commentText}>{item?.comment}</Text>
            {item?.image && item?.image !== 'null' && (
              <Image source={{ uri: item?.image }} style={empListStyle.reviewImg} />
            )}
            <View style={styles.ratingContainer}>
              <Rating
                type="star"
                ratingColor="gold"
                ratingCount={5}
                startingValue={item?.rating}
                imageSize={20}
                readonly
              />
            </View>
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
    return <ReviewShimmerUI />;
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
                <Image source={{ uri: empDetails?.employee_image }} style={styles.profileLogo} />
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
                <Text style={styles.nameText}>{empDetails?.employee_name}</Text>
                <Text
                  style={{ color: '#ced6e0', fontSize: 10, fontWeight: '500' }}>
                  {empDetails?.designation}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 3,
                }}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor: '#2ed573',
                    borderRadius: 10 / 2,
                    marginTop: 5,
                  }}
                />
                <Text style={{ color: '#2ed573', fontWeight: '500' }}>
                  Active
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
              <Text style={styles.orgname}>{orgName}</Text>
              <View style={styles.empRatingContainer}>
                <Rating
                  type="custom"
                  ratingColor={primary}
                  ratingCount={5}
                  startingValue={empData?.avg_rating}
                  imageSize={20}
                  readonly
                  style={styles.ratingStyle}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AddReview',{
                  empDetails: empDetails,
                  orgDetails : orgDetails,
                    id: {
                      orgId: orgId,
                      empId: empId,
                    },}
                 )}
              >
                <Text style={styles.buttonText}>Add Review</Text>
              </TouchableOpacity>
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
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  headerPartTwo: {
    gap: 20,
    backgroundColor: primary,
    paddingHorizontal: 8,
    paddingVertical: 15,
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
    fontWeight: '500',
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
    paddingVertical: 6,
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
  }
});
