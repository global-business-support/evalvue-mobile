import { StyleSheet } from "react-native";
import { primary } from "./customStyle";

export const listStyle = StyleSheet.create({
    listMainContainer: {
        flex: 1,
        backgroundColor: '#DAE0E2'
    },
    listHeaderContainer: {
        paddingVertical: 4,
        marginBottom : 2,
        backgroundColor: 'white'
    },
    listHeading: {
        textAlign: 'left',
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    listTitleDetailsContainer: {
        backgroundColor: primary,
        // borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
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
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    searchInputStyle: {
        backgroundColor: '#F2EFF8',
        width:"90%",
        fontSize: 12,
        color: '#592DA1',
    },
    listFooterContainer: {
        paddingVertical: 0,
        backgroundColor: '#DAE0E2'
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
        backgroundColor: '#FFF',
        padding: 10,
    },
    listSubContainer: {
        flexDirection: 'row',
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