import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Alert,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png'
import { Image } from 'react-native-elements';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import { listStyle } from '../Styles/listStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import RupeeIcon from 'react-native-vector-icons/FontAwesome';
import { NATIVE_API_URL } from '@env';
import TruncatedText from '../Othercomponent/TruncatedText';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import ThreeDotMenu from './ThreeDotMenu ';
import ListShimmerUI from '../ShimmerUI/ListShimmerUI';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { primary } from '../Styles/customStyle';
import RazorpayCheckout from 'react-native-razorpay';

import ImagePreview from '../ImagePreview/ImagePreview';

import { capitalizeEachWord } from '../Custom-Functions/customFunctions';
import Receipt from '../Receipt/Receipt';


export default function OrgList() {
  const [Orgdata, setOrgdata] = useState([]);
  const [filteredOrgData, setFilteredOrgData] = useState([]);
  const [count, setCount] = useState();
  const [loadingIndicator, setLoadingIndicator] = useState(false)
  const [loading, setLoading] = useState(true);
  const [Isorgmap, setIsorgmap] = useState(false);
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentSuccessfull, setPaymentSuccessfull] = useState(false);
  const [payment_response_list, setpayment_response_list] = useState([]);
  const [print, setPrint] = useState(false);
  const [receiptVisible, setReceiptVisible] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showImage, setShowImage] = useState(false);
  const [url, setUrl] = useState('');

  const handleImagePreview = url => {
    setUrl(url);
    setShowImage(true);
  };

  const fetchdata = async () => {
    try {
      const res = await ApiBackendRequest(`${NATIVE_API_URL}/organizations/`);
      setOrgdata(res.data.organization_list);
      setFilteredOrgData(res.data.organization_list);
      setCount(res.data.organizations_paid_count);
      if (res.data.is_organization_mapped) {
        setIsorgmap(res.data.is_organization_mapped);
      }
      if (res.isexception) {
        setError(res.exceptionmessage.error);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if(isFocused){
      fetchdata();
    }
  }, [Isorgmap, isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchdata();
  };

  const handleSearch = query => {
    setSearchQuery(query);
    if (query) {
      const filteredData = Orgdata.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredOrgData(filteredData);
    } else {
      setFilteredOrgData(Orgdata);
    }
  };

  const handleEdit = (organizationId) => {
    navigation.navigate(`AddOrganization`, {
      editOrgData: { organization_id: organizationId, editorg: true },
    });
  };
  const handleInfo = (organizationId) => {
    navigation.navigate(`infoorganization`, {
      editOrgData: { organization_id: organizationId, editorg: true },
    });
  };
  const renderItem = ({ item }) => (
    <View style={listStyle.listContainer}>
      <View style={listStyle.listSubContainer}>
        <Image source={{ uri: item.image }} style={listStyle.listLogoImg}  onPress={() => {
                handleImagePreview(item.image);
              }}/>
        <View>
          <Text style={listStyle.listTitleText}>
            <TruncatedText text={capitalizeEachWord(item.name)} maxLength={18} dot={true} />
          </Text>
          <Text style={listStyle.listSubTitleText}>
            <TruncatedText text={capitalizeEachWord(item.area)} maxLength={20} />
            {capitalizeEachWord(item.city_name)}
          </Text>
        </View>
      </View>
      <View style={listStyle.listBtnContainer}>
        {item.organization_rejected ? (
          <TouchableOpacity style={styles.reapplyBtnStyle}>
            <Text style={styles.reapplyBtn}>Re-Apply</Text>
          </TouchableOpacity>
        ) : item.organization_paid ? (
          item.organization_verified ? (

            <>
            <TouchableOpacity
                style={listStyle.btnStyle}
                onPress={() =>
                  navigation.navigate('EmployeeList', {
                    orgDetails: {
                      orgName: item.name,
                      orgId: item.organization_id,
                      orgAddress: item.area + ' ' + item.city_name,
                      orgImage: item.image,
                    },
                  })
                }>
              <Text style={styles.viewBtn}>View</Text>
            </TouchableOpacity>
            <ThreeDotMenu 
            onEdit={() => handleEdit(item.organization_id)} 
            edit={true} 
            deleted={false} 
            path="OrgInfo" 
            params={item} />
            </>
          ) : (
            <TouchableOpacity style={styles.pendingBtnStyle} disabled={true}>
              <Text style={styles.pendingBtn}>Pending...</Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity style={styles.payBtnStyle}
           onPress={() => {
            CreatePayment(item.organization_id, count === 0 ? 3 : 4);
          }}>
              {loadingIndicator ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.payBtn}>
              Pay{' '}
              <RupeeIcon name="rupee" size={15} color="white" style={styles.payBtn} />
              {count === 0 ? '5' : '99'}
            </Text>
              )}
          </TouchableOpacity>
        )}
        
      </View>
    </View>
  );
  

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyMessage}>Please add organization.</Text>
    </View>
  );
  if (loading) {
    return <ListShimmerUI />
  };
  if (error) {
    return (
      <View>
        <Text style={{ color: 'red', fontSize: 16, fontWeight: '600', textAlign: 'left', padding: 10 }}>{error}</Text>
      </View>
    )
  };

  // payment code

  function CreatePayment(organizationId, planId) {
    console.log(planId,organizationId)
    if (planId == 3) {
      // const confirmationpayment = confirm("Thank you for your payment. Please note that your payment has been automatically refunded.");
      if (true) {
        setLoadingIndicator(true)
        const response = ApiBackendRequest(
          `${NATIVE_API_URL}/create/subscription/id/`,
          {
            
            organization_id: organizationId,
            plan_id: planId,
          }
        );
        setLoadingIndicator(false)
        if(response)
        response.then((response) => {
          console.log(response.data);

          if (
            response.data.is_subscription_id_created_successfull ||
            response.data.is_subscription_id_already_exist
          ) {
            const subid =
              response.data.subscription_response_list[0].subscription_id;
            console.log(subid);

            if (subid) {
              setLoading(false);
              var options = {
                key: "rzp_test_mHIc2FsOxWbBD7",
                // key: "rzp_live_0KlxeEsfpZArko",
                subscription_id: `${subid}`,
                name: "Evalvue",
                description: "Monthly Test Plan",
                image: `${logo}`,
                // "subscription_card_change": 0,
                // handler: function (response) {
                //   console.log("payment successfull ");
                //   setLoadingIndicator(true)
                //   const res = ApiBackendRequest(`${NATIVE_API_URL}/verify/payment/`, {
                //     payment_id: response.razorpay_payment_id,
                //     subscription_id: response.razorpay_subscription_id,
                    
                //     organization_id: organizationId,
                //   });
                //   setLoadingIndicator(false)
                //   res.then((response) => {
                //     console.log(response);
                //     if (response.data.is_payment_response_sent_succefull) {
                //       setpayment_response_list(
                //         response.data.generate_reciept_data[0]
                //       );
                //       setPaymentSuccessfull(
                //         response.data.is_payment_response_sent_succefull
                //       );
                //       setReceiptVisible(true)
                //       // setLoading(false);
                //     }
                //     console.log(payment_response_list);
                //   });
                //   res.catch((err) => {
                //     console.log(err);
                //     if (err.isexception) {
                //       setPaymentSuccessfull(
                //         response.data.is_payment_response_sent_succefull
                //       );
                //       console.log(err.exceptionmessage);
                //     }
                //   });
                // },
                prefill: {
                  name: "",
                  email: "",
                  contact: "",
                },
                theme: {
                  color: "#5134a9",
                },
              };

              RazorpayCheckout.open(options).then((response) => {
                // handle success
                console.log("payment successfull ");
                setLoading(true);
                console.log(response,'inside')
                setLoadingIndicator(true)
                const res = ApiBackendRequest(`${NATIVE_API_URL}/verify/payment/`, {
                  payment_id: response.razorpay_payment_id,
                  subscription_id: response.razorpay_subscription_id,
                  
                  organization_id: organizationId,
                });
                setLoadingIndicator(false)
                res.then((response) => {
                  console.log(response);
                  setLoading(false);
                  if (response.data.is_payment_response_sent_succefull) {
                    setpayment_response_list(
                      response.data.generate_reciept_data[0]
                    );
                    setPaymentSuccessfull(
                      response.data.is_payment_response_sent_succefull
                    );
                    setReceiptVisible(true)
                  }
                  console.log(payment_response_list);
                });
                res.catch((err) => {
                  console.log(err);
                  if (err.isexception) {
                    setPaymentSuccessfull(
                      response.data.is_payment_response_sent_succefull
                    );
                    console.log(err.exceptionmessage);
                  }
                });
                alert(`Success: ${response.razorpay_payment_id}`);
              }).catch((error) => {
                // handle failure
                alert(`Error: ${error.error}`);
                console.log(error)
                  setpayment_response_list({ reason: error.error.reason });
                  console.log(payment_response_list);
                  console.log("payment id called");
                  setLoadingIndicator(true)
                  const res = ApiBackendRequest(`${NATIVE_API_URL}/verify/payment/`, {
                    payment_id: error.error.metadata.payment_id,
                    organization_id: organizationId,
                  });
                  setLoadingIndicator(false)
                  res.then((response) => {
                    console.log(response);
                    setLoading(false);
                    if(response.data){
                    if (response.data.is_payment_response_sent_succefull) {
                      setpayment_response_list(
                        response.data.generate_reciept_data[0]
                      );
                      setPaymentSuccessfull(
                        response.data.is_payment_response_sent_succefull
                      );
                      setReceiptVisible(true)
                      // setLoading(false);
                    }}
                    // console.log(payment_response_list);
                  });
                  res.catch((err) => {
                    // console.log(err);
                    if (err.isexception) {
                      setPaymentSuccessfull(
                        response.data.is_payment_response_sent_succefull
                      );
                      // console.log(err.exceptionmessage);
                    }
                  });
                  console.log("payment will be failed ");
                
              });
            }
          } else {
            alert(
              "Payment is not available at this time. Please try again later. "
            );
          }
        });

        response.catch((err) => {
          console.log(err);
        });
      }
    } else {
      setLoadingIndicator(true)
      const response = ApiBackendRequest(`${NATIVE_API_URL}/create/subscription/id/`, {
        
        organization_id: organizationId,
        plan_id: planId,
      });
      setLoadingIndicator(false)
      if(response)
      response.then((response) => {
        console.log(response)
        // setError();
        if(response.isexception){
          alert(response.exceptionmessage.error)
        }

        if (
          response.data.is_subscription_id_created_successfull ||
          response.data.is_subscription_id_already_exist
        ) {
          const subid =
            response.data.subscription_response_list[0].subscription_id;
          console.log(subid);

          if (subid) {
            var options = {
              key: "rzp_test_mHIc2FsOxWbBD7",
              // key: "rzp_live_0KlxeEsfpZArko",
              subscription_id: `${subid}`,
              name: "Evalvue",
              description: "Monthly Test Plan",
              image: `${logo}`,
              prefill: {
                name: "",
                email: "",
                contact: "",
              },
              theme: {
                color: "#5134a9",
              },
            };

            
            console.log("ans is called ")
            RazorpayCheckout.open(options).then((response) => {
              // handle success
              console.log("payment successfull ");
              setLoading(true);
              console.log(response,'inside')
              setLoadingIndicator(true)
              const res = ApiBackendRequest(`${NATIVE_API_URL}/verify/payment/`, {
                payment_id: response.razorpay_payment_id,
                subscription_id: response.razorpay_subscription_id,
                
                organization_id: organizationId,
              });
              setLoadingIndicator(false)
              res.then((response) => {
                console.log(response);
                setLoading(false);
                if (response.data.is_payment_response_sent_succefull) {
                  setpayment_response_list(
                    response.data.generate_reciept_data[0]
                  );
                  setPaymentSuccessfull(
                    response.data.is_payment_response_sent_succefull
                  );
                  setReceiptVisible(true)
                }
                console.log(payment_response_list);
              });
              res.catch((err) => {
                console.log(err);
                if (err.isexception) {
                  setPaymentSuccessfull(
                    response.data.is_payment_response_sent_succefull
                  );
                  console.log(err.exceptionmessage);
                }
              });
              alert(`Success: ${response.razorpay_payment_id}`);
            }).catch((error) => {
              // handle failure
              alert(`Error: ${error.error}`);
              console.log(error)
            
                // alert(response.error.code);
                // alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
                setpayment_response_list({ reason: error.error.reason });
                console.log(payment_response_list);
                console.log("payment id called");
                setLoadingIndicator(true)
                const res = ApiBackendRequest(`${NATIVE_API_URL}/verify/payment/`, {
                  payment_id: error.error.metadata.payment_id,
                  organization_id: organizationId,
                });
                setLoadingIndicator(false)
                res.then((response) => {
                  console.log(response);
                  setLoading(false);
                  if(response.data){
                  if (response.data.is_payment_response_sent_succefull) {
                    setpayment_response_list(
                      response.data.generate_reciept_data[0]
                    );
                    setPaymentSuccessfull(
                      response.data.is_payment_response_sent_succefull
                    );
                    setReceiptVisible(true)
                    // setLoading(false);
                  }}
                  // console.log(payment_response_list);
                });
                res.catch((err) => {
                  // console.log(err);
                  if (err.isexception) {
                    setPaymentSuccessfull(
                      response.data.is_payment_response_sent_succefull
                    );
                    // console.log(err.exceptionmessage);
                  }
                });
                console.log("payment will be failed ");
              
            });
     
          }
        } else {
          Alert.alert(
            "Payment is not available at this time. Please try again later. "
          );
        }
      });

    }
  }

 

  return (
    <View style={listStyle.listMainContainer}>
      <View style={listStyle.listHeaderContainer}>
        <View style={styles.addStyle}>
          <Text style={listStyle.listHeading}>Organization</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddOrganization')}>
            <AddIcon
              name="add"
              size={28}
              color="#000"
              style={listStyle.listAddStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <SearchIcon
            name="search"
            size={20}
            color="#592DA1"
            style={styles.searchIcon}
          />
          <TextInput
            style={listStyle.searchInputStyle}
            placeholder="Search Organization..."
            placeholderTextColor="#592DA1"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={filteredOrgData}
        keyExtractor={item => item.organization_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={listStyle.listFooterContainer}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#e06c0d', '#1c387a', '#e3c100', '#e30048']}
          />
        }
        scrollEnabled
        removeClippedSubviews={true}
        initialNumToRender={10}
      />
      <ImagePreview
        imageUrl={url}
        visible={showImage}
        onClose={() => setShowImage(false)}
      />
      <Receipt
          visible={receiptVisible}
          onClose={()=>{setReceiptVisible(false)}}
          paymentResponseList={payment_response_list}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  addStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#F2EFF8',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: 8,
    marginTop: 8,
    marginBottom: 6,
    marginHorizontal: 10
  },
  searchInputStyle: {
    flex: 1,
    color: '#592DA1',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#592DA1',
    fontWeight: 'bold',
    paddingHorizontal: 8
  },
  viewBtn : {
    color: '#FFF',
    fontSize: 13,
    fontWeight : '500',
    paddingVertical : 3,
    paddingHorizontal : 15,
    textAlign: 'center'
  },
  pendingBtn: {
    color: 'white',
    fontWeight : '500',
    paddingVertical : 3,
    fontSize: 13,
    textAlign: 'center'
  },
  payBtn : {
    color: '#FFF',
    fontWeight : '500',
    paddingHorizontal : 10,
    paddingVertical : 3,
    fontSize: 13,
    textAlign: 'center'
  },
  reapplyBtn : {
    color: '#FFF',
    fontWeight : '500',
    paddingHorizontal : 8,
    paddingVertical : 3,
    fontSize: 13,
    textAlign: 'center'
  },
  reapplyBtnStyle : {
    backgroundColor: '#FF6666',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderRadius: 2,
    flexDirection: 'row',
    paddingVertical: 3,
    marginRight: 32
  },
  pendingBtnStyle : {
    backgroundColor: '#88898B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 2,
    flexDirection: 'row',
    paddingVertical: 3,
    marginRight: 32
  },
  payBtnStyle  : {
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 6,
    borderRadius: 2,
    flexDirection: 'row',
    paddingVertical: 3,
    marginRight: 32
}
});
