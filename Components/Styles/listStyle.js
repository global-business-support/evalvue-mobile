import { StyleSheet } from "react-native";

export const listStyle = StyleSheet.create({
    listMainContainer: {},
    listHeaderContainer: {
        padding: 10
    },
    searchInputStyle: {
        backgroundColor: '#F2EFF8',
        height: 35,
        borderRadius: 10,
        fontSize: 10,
        color: '#592DA1',
        paddingHorizontal: 8,
        marginTop: 6
    },
    listFooterConatiner: {
        padding: 2,
        backgroundColor: '#F0EFEF'
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 6,
        marginVertical: 2,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 3
    },
    listSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listLogoImg: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2
    },
    listTitleText: {
        color: '#535C68',
        fontSize: 12,
        marginLeft: 4,
        fontWeight: '500'
    },
    listBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 4
    },
    listBtn: {
        color: '#592DA1',
        fontSize: 12,
        marginRight: 6
    },
    listCityText: {
        color: '#535C68',
        fontSize: 10,
        marginLeft: 6,
    }
});