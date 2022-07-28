import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window')


const basketStyles = StyleSheet.create({
    basketContainer:{
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    scrollBasket:{
        flex: 1,
    },
    basketItem:{
        height: 120, 
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: .5,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        marginBottom: 5
    },
    imgItem:{
        height: 100, 
        width: 100
    },
    textItem:{
        justifyContent: 'center',
        marginLeft: 20
    },
    textItemName:{
        fontSize: 23,
    },
    totalContainer:{
        width: '100%',
        borderTopColor: 'black',
        borderTopWidth: .5
    },
    textTotals:{
        width: 100,
        textAlign: 'center',
        fontSize: 18
    },
    addbutton:{
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        right: -100,
        zIndex: 10
    },
    picker:{
        position: 'absolute',
        width: 80,
        backgroundColor: '#FFF',
        right: 0
    }

})

export default basketStyles