import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import DotIcon from 'react-native-vector-icons/Entypo';
import { Image } from 'react-native-elements';
import logo from '../../assets/TCS.jpg';
import kisaan from '../../assets/kisaan.jpg';
import review from '../../assets/review.jpeg';

export default function Feed() {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.profileLogo}>
          <Text style={styles.profileText}>R</Text>
        </View>
        <TextInput
          style={styles.inputStyle}
          placeholder='Search by aadhar...'
          placeholderTextColor="#535C68"
        />
        <DotIcon name='dots-three-vertical' size={22} color='#47535E' />
      </View>
      <ScrollView>
        <View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View>

        {/* =================COPIED REVIEWS=================== */}
        <View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Infosys</Text>
              </View>
            </View>
            <Text style={styles.orgName}>3d</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Aman Chhalotre</Text>
                <Text style={styles.dsgText}>Frontend Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Wipro Consultancy</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2m</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Keshav Bishnoi</Text>
                <Text style={styles.dsgText}>Backend Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>1y</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View><View style={styles.mainConatiner}>
          <View style={styles.firstContainer}>
            <View style={styles.subContainer}>
              <Image
                source={logo}
                style={styles.orgImg}
              />
              <View>
                <Text style={styles.orgName}>Tata Counsultancy Services</Text>
              </View>
            </View>
            <Text style={styles.orgName}>2min</Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.empContainer}>
              <Image
                source={kisaan}
                style={styles.empImg}
              />
              <View>
                <Text style={styles.empNameStyle}>Jaydeep Sharma</Text>
                <Text style={styles.dsgText}>Software Developer</Text>
              </View>
            </View>
            <View style={styles.commentConatiner}>
              <Text style={styles.commentText}>
                A review is an evaluation of a publication, product, service, or company or a critical take on current affairs in literature, politics or culture. In addition to a critical evaluation
              </Text>
              <Image
                source={review}
                style={styles.reviewImg}
              />
            </View>
          </View>
        </View>
        {/* ==================================== */}
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  parentContainer: {
    justifyContent: 'space-between',
  },
  headerContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileLogo: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40 / 2,
    backgroundColor: 'gray'
  },
  profileText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#FFF'
  },
  inputStyle: {
    backgroundColor: '#DAE0E2',
    width: '70%',
    height: 35,
    borderRadius: 10,
    fontSize: 10,
    color: '#2C3335',
    paddingHorizontal: 8
  },
  mainConatiner: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    marginVertical: 6,
    borderBottomWidth: 0.3,
    borderColor: '#4C4B4B',
    paddingBottom: 8,
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orgImg: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2
  },
  secondContainer: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
  },
  empContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  empImg: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2
  },
  commentConatiner: {
    padding: 10,
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: '#99AAAB',
    borderRadius: 6,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  reviewImg: {
    width: '100%',
    height: 150,
    borderRadius: 6
  },
  orgName: {
    color: '#535C68',
    fontSize: 11,
    marginLeft: 4
  },
  empNameStyle: {
    color: '#2C3335',
    fontSize: 13,
    marginLeft: 4
  },
  commentText: {
    color: '#535C68',
    fontSize: 10,
    marginBottom: 6,
    textAlign: 'justify'
  },
  dsgText: {
    color: '#2C3335',
    fontSize: 8,
    marginLeft: 4
  }
});