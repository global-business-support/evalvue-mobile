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
import ShimmerUI from '../ShimmerUI/ShimmerUI';

export default function EmployeeDetails() {
  const [reviewData, setReviewData] = useState([]);
  const [empData, setEmpData] = useState(null);
  const [error, setError] = useState('');
  const [isReviewMapped, setIsReviewMapped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await ApiBackendRequest(`${NATIVE_API_URL}/reviews/`, {
          search_by_aa: false,
          organization_id: 5,
          employee_id: 332,
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

  const noReview = ()=>{
    return(
      <View>
      <Text style={{ color: 'black',fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: 30 }}>No review given!</Text>
    </View>
    )
  };

  if (loading) {
    return <ShimmerUI />;
  };
  if(error){
    return (
      <View>
      <Text style={{ color: 'red', textAlign: 'center', marginTop: 30 }}>{error}</Text>
    </View>
    );
  };

  return isReviewMapped && (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerPartTwo}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <View>
              <View style={styles.profileLogo}>
                {empData?.employee_image && empData?.employee_image !== 'null' && (
                  <Image source={{ uri: empData?.employee_image }} style={styles.profileLogo} />
                )}
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.nameText}>{empData?.employee_name}</Text>
                <Text
                  style={{ color: '#ced6e0', fontSize: 12, fontWeight: '500' }}>
                  {empData?.email}
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
              <Text style={styles.orgname}>Tata Consultancy Services</Text>
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
              <TouchableOpacity style={styles.button}>
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
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingHorizontal: 4,
    paddingTop: 10,
  },
  orgname: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  headerPartTwo: {
    gap: 20,
    backgroundColor: primary,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  profileLogo: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
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
