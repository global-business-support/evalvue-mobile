import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
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
import ImagePreview from '../ImagePreview/ImagePreview';

export default function OrgList() {
  const [Orgdata, setOrgdata] = useState([]);
  const [filteredOrgData, setFilteredOrgData] = useState([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);
  const [Isorgmap, setIsorgmap] = useState(false);
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
            <TruncatedText text={item.name} maxLength={20} dot={true} />
          </Text>
          <Text style={listStyle.listSubTitleText}>
            <TruncatedText text={item.area} maxLength={20} />
            {item.city_name}
          </Text>
        </View>
      </View>
      <View style={listStyle.listBtnContainer}>
        {item.organization_rejected ? (
          <TouchableOpacity
          style={styles.reapplyBtnStyle}
          >
          <Text style={styles.reapplyBtn}>Re-Apply</Text>
        </TouchableOpacity>
        ): item.organization_paid ? (
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
        ): (
          <TouchableOpacity
                style={styles.payBtnStyle}
                // onPress={() =>
                //   
                // }
                >
              <Text style={styles.payBtn}>Pay {""}
                <RupeeIcon
                name="rupee"
                size={15}
                color="white"
                style={styles.payBtn}
              />{count == 0 ? "5" : "99"}</Text>
          </TouchableOpacity>
        )
        }
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
