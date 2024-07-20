import { Dimensions, StyleSheet } from "react-native";

export const windowHeight = Dimensions.get('window').height;
export const primary = '#592DA1';

export const customStyle = StyleSheet.create({
    inputBox: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DAE0E2',
        borderRadius: 6,
        marginVertical: 8,
        paddingHorizontal: 8
    },
    inputStyle: {
        width: '90%',
        fontSize: 12,
        color: '#000',
        marginLeft: 4
    },
    heading: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    loginBtn: {
        backgroundColor: '#592DA1',
        width: '90%',
        padding: 8,
        borderRadius: 6,
        marginTop: 35,
        marginBottom:6
    },
    loginText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loginContainer: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    lableContainer: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 20
    },
    lableHeading: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
    },
    mandatory: {
        color: 'red',
        fontSize: 18,
        marginLeft: 4
    },
    fileBtn: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DAE0E2',
        borderRadius: 6,
        marginVertical: 6,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#592DA1'
    },
    fileBtnText: {
        color: '#592DA1',
        fontSize: 12,
        fontWeight: '400',
        marginLeft: 8
    },

    // ==================list style=======================
    
});