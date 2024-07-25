import { StyleSheet } from "react-native";

export const empListStyle = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#FFF',
      marginHorizontal: 6,
      marginVertical: 6,
    },
    subContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    secondContainer: {
      backgroundColor: '#f1f2f6',
      borderRadius: 10,
      justifyContent: 'center',
    },
    empContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    timeText: {
      color: '#535C68',
      fontSize: 11,
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