import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Image} from 'react-native-elements';

const ReviewCards = ({item}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.mainContainer}>
        <View style={styles.firstContainer}>
          <View style={styles.subContainer}>
            <Image source={{uri : item.organization_image}} style={styles.orgImg} />
            <View>
              <Text style={styles.orgName}>{item.organization_name}</Text>
            </View>
          </View>
          <Text style={styles.orgName}>{item.created_on}</Text>
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.empContainer}>
            <Image source={{uri : item.employee_image}} style={styles.empImg} />
            <View>
              <Text style={styles.empNameStyle}>{item.employee_name}</Text>
              <Text style={styles.dsgText}>{item.designation}</Text>
            </View>
          </View>
          <View style={styles.commentConatiner}>
            <Text style={styles.commentText}>{item.comment}</Text>
            {item.image && item.image !== 'null' && (
              <Image source={{ uri: item?.image }} style={styles.reviewImg} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewCards;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 6,
    marginVertical: 6,
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f2f6',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#d2dae2',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orgImg: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
  },
  secondContainer: {
    backgroundColor: '#f1f2f6',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
  },
  empContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  empImg: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  commentConatiner: {
    paddingVertical: 5,
    paddingHorizontal: 6,
    margin: 5,
    marginBottom: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  reviewImg: {
    width: '100%',
    height: 150,
    borderRadius: 6,
  },
  orgName: {
    color: '#535C68',
    fontSize: 11,
    marginLeft: 4,
  },
  empNameStyle: {
    color: '#2C3335',
    fontSize: 13,
    marginLeft: 4,
  },
  commentText: {
    color: '#535C68',
    fontSize: 10,
    marginBottom: 6,
  },
  dsgText: {
    color: '#2C3335',
    fontSize: 8,
    marginLeft: 4,
  },
});
