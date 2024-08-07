import { ScrollView, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/TCS.jpg';
import { Image } from 'react-native-elements';
import { listStyle } from '../Styles/listStyle';
import { paymentStyles } from '../Styles/paymentStyle';
import { NATIVE_API_URL } from '@env';
import ApiBackendRequest from '../../API-Management/ApiBackendRequest';
import TruncatedText from '../Othercomponent/TruncatedText';
import { primary } from '../Styles/customStyle';
import PayIcon from 'react-native-vector-icons/MaterialIcons';
import PaymentShimmerUI from '../ShimmerUI/PaymentShimmerUI';
import { capitalizeEachWord } from '../Custom-Functions/customFunctions';

export default function Subscription() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        ApiBackendRequest(`${NATIVE_API_URL}/subscription/history/data/`)
            .then((res) => {
                if (res.data.subscription_history_data) {
                    setList(res.data.subscription_history_data)
                }
                if (res.isexception) {
                    setError(res.exceptionmessage.error);
                }
            })
            .catch((error) => {
                setError(error);
            }).finally(() => {
                setLoading(false)
            });
    }, []);
    const renderItem = ({ item }) => {
        return (
            <View style={{ marginBottom: 4 }}>
                <View style={paymentStyles.listContainer}>
                    <View style={listStyle.listSubContainer}>
                        <PayIcon name='payments' size={30} color='black' style={{ marginRight: 4 }} />
                        <View>
                            <Text style={listStyle.listTitleText}>
                                <TruncatedText text={capitalizeEachWord(item?.organization_name)} maxLength={20} dot={true} />
                            </Text>
                            <Text style={[listStyle.listSubTitleText, { color: primary, fontWeight: '600', fontSize: 12 }]}>
                                ₹{item.amount}
                            </Text>
                        </View>
                    </View>
                    <View style={listStyle.listBtnContainer}>
                        <Text style={[listStyle.listBtn, { color: item?.status === 'active' ? 'green' : primary, fontWeight: '600' }]}>
                            {item?.status}
                        </Text>
                    </View>
                </View>
                <View style={paymentStyles.payMainContainer}>
                    <View style={paymentStyles.payConatiner}>
                        <Text style={paymentStyles.idText}>Billing Cycle: </Text>
                        <Text style={[paymentStyles.idText]}>monthly</Text>
                    </View>
                    <View style={paymentStyles.payConatiner}>
                        <Text style={paymentStyles.idText}>Start Date : </Text>
                        <Text style={paymentStyles.idText}>{item.start_date}</Text>
                    </View>
                    <View style={[paymentStyles.payConatiner, paymentStyles.lastContainer]}>
                        <Text style={paymentStyles.idText}>Next Due Date : </Text>
                        <Text style={paymentStyles.idText}>{item.next_due_date}</Text>
                    </View>
                </View>
            </View>
        )
    };

    const noDetails = () => {
        return (
            <View>
                <Text style={{ color: primary, fontSize: 16, fontWeight: '600', textAlign: 'left', padding: 10 }}>No subscription details.</Text>
            </View>
        )
    };

    if (loading) {
        return <PaymentShimmerUI />
    };
    if (error) {
        return (
            <View>
                <Text style={{ color: 'red', fontSize: 16, fontWeight: '600', textAlign: 'left', padding: 10 }}>{error}</Text>
            </View>
        )
    };

    return (
        <View style={listStyle.listMainContainer}>
            <View style={[listStyle.listHeaderContainer, { marginBottom: 4 }]}>
                <Text style={listStyle.listHeading}>Subscription Details</Text>
            </View>
            <FlatList
                data={list}
                keyExtractor={(item, index) => `${item.amount}-${index}`}
                renderItem={renderItem}
                ListEmptyComponent={noDetails}
            />
        </View>
    );
};