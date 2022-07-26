import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const searchStyles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        alignItems: 'center'
    },
    buttonInput: {
        width: 300,
        height: 30,
        top: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5
    },
    input: {
        width: 270
    },
    scrollCards: {
        top: 80,
        marginBottom: 80
    },
    productCard: {
        height: 200,
        width: width - 30,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row'
    },
    imgCard: {
        height: '100%',
        width: '100%'
    },
    nameProduct: {
        height: 20,
        fontSize: 16
    },
    detailProduct: {
        fontSize: 25,
    }

})

export default searchStyles