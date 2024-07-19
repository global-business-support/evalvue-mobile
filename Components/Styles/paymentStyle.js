import { StyleSheet } from "react-native";

export const paymentStyles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 6,
        marginTop: 2,
        backgroundColor: '#FFF',
        padding: 10,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3

    },
    payMainContainer: {
        marginBottom: 2,
    },
    payConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 6,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
    },
    idText: {
        color: '#535C68',
        fontSize: 12
    },
    lastContainer: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        paddingBottom: 6
    }
});