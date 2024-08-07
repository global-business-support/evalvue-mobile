import { StyleSheet } from "react-native";

export const empListStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondContainer: {
    backgroundColor: '#FFF',
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
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  commentConatiner: {
    paddingTop: 5,
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
    height: 300,
    borderBottomWidth: 0.3,
    borderColor: 'gray'
  },
  timeText: {
    color: '#2e3131',
    fontSize: 11,
    fontWeight: '500'
  },
  empNameStyle: {
    color: '#2e3131',
    fontSize: 15,
    marginLeft: 4,
    fontWeight: '600'
  },
  commentText: {
    color: '#000',
    fontSize: 13,
    marginBottom: 6,
    textAlign: 'justify',
    fontFamily: 'inter',
    lineHeight: 16,
    fontWeight: '600',
    paddingHorizontal: 12
  },
  dsgText: {
    color: '#2e3131',
    fontSize: 10,
    marginLeft: 4,
  },
});