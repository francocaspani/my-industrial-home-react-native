import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')


const basketStyles = StyleSheet.create({
    basketContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    scrollBasket: {
        flex: 1,
    },
    basketItem: {
        height: 120,
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: .5,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        marginBottom: 5
    },
    imgItem: {
        height: 100,
        width: 100
    },
    textItem: {
        justifyContent: 'center',
        marginLeft: 20
    },
    textItemName: {
        fontSize: 23,
    },
    totalContainer: {
        width: '100%',
        borderTopColor: 'black',
        borderTopWidth: .5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTotals: {
        width: 100,
        textAlign: 'center',
        fontSize: 18
    },
    addbutton: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        right: -100,
        zIndex: 10
    },
    picker: {
        position: 'absolute',
        width: 30,
        backgroundColor: 'black',
        right: 0,
        zIndex: 20,
        height: '95%',
        borderLeftColor: 'white',
        borderLeftWidth: .5
    },
    qttButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: .5,

    },
    checkoutButton: {
        width: 300,
        height: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10

    },
    chekoutText: {
        fontSize: 20,
        fontWeight: '600'
    },
    basketImg:{
        height: 200, 
        width: 200
    },
    nobasketContainer:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    }

})

export default basketStyles