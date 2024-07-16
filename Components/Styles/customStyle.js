import { Dimensions, StyleSheet } from "react-native";

export const windowHeight = Dimensions.get('window').height;
export const primary = '#592DA1'

export const customStyle = StyleSheet.create({
    inputBox: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DAE0E2',
        borderRadius: 6,
        marginVertical: 10,
        paddingHorizontal: 8
    },
    inputStyle: {
        width: '90%',
        fontSize: 18,
        color: '#000',
        fontWeight: '600',
        marginLeft: 4
    },
    heading: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 28,
        color: '#000',
        fontWeight: 'bold',
    },
    loginBtn: {
        backgroundColor: '#592DA1',
        width: '90%',
        padding: 8,
        borderRadius: 6,
        marginTop: 35
    },
    loginText: {
        color: '#FFF',
        fontSize: 18,
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
        marginTop: 30
    },
    lableHeading: {
        fontSize: 18,
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
        marginVertical: 10,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#592DA1'
    },
    fileBtnText: {
        color: '#592DA1',
        fontSize: 18,
        fontWeight: '400',
        marginLeft: 8
    },
});