import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')

const productDetailStyles = StyleSheet.create({
    imgProduct: {
        height: 250,
        width: width,
        backgroundColor: '#fff'
    },
    detailContainer: {
        top: 80,
        flex: 1,
    },
    detailTextContainer: {
        paddingHorizontal: 10
    },
    nameProduct: {
        width: width,
        fontSize: 26,
        textAlign: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontWeight: '700',
        marginVertical: 10
    },
    detailProduct: {
        fontSize: 18,
        marginBottom: 10
    },
    price: {
        fontSize: 25,
        fontWeight: '700'
    },
    rating: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 30
    },
    detailButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        width: '30%',
        height: 60,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20
    },
    buttonReviews: {
        width: '50%',
        height: 60,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,

    },
    buttonReviewsText: {
        fontSize: 25,
    },
    picker:{
        position: 'absolute',
        height: 200,
        top: 600,
        width: width,
        backgroundColor: '#FFF'
    }
})

export default productDetailStyles