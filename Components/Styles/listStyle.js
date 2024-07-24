import { StyleSheet } from "react-native";
import { primary } from "./customStyle";

export const listStyle = StyleSheet.create({
    listMainContainer: {
        flex: 1
    },
    listHeaderContainer: {
        padding: 10,
        backgroundColor: '#FFF'
    },
    listHeading: {
        textAlign: 'left',
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    listTitleDetailsContainer: {
        backgroundColor: primary,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        justifyContent: 'space-between'
    },
    listOrgContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listText: {
        color: '#FFF',
        fontSize: 14,
        marginLeft: 4,
        fontWeight: '500'
    },
    listSubText: {
        color: '#FFF',
        fontSize: 10,
        marginLeft: 6,
    },
    listAddStyle: {
        fontWeight: 'bold'
    },
    searchInputStyle: {
        backgroundColor: '#F2EFF8',
        height: 40,
        borderRadius: 10,
        fontSize: 12,
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
        borderRadius: 48 / 2,
        borderWidth:1,
        borderColor:primary
    },
    listTitleText: {
        color: '#000',
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
        color: '#FFF',
        fontSize: 13,
        textAlign: 'center'
    },
    listSubTitleText: {
        color: '#535C68',
        fontSize: 10,
        marginLeft: 6,
    
    },
    btnStyle: {
        backgroundColor: primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 2,
        flexDirection: 'row',
        paddingVertical: 3,
        marginRight: 3
    }
});