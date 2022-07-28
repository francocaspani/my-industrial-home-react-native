import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')

const favouriteStyles = StyleSheet.create({
    favContainer:{
        flex: 1,
        zIndex: -1,
        alignItems: 'center'
    },
    imgback:{
        height: height,
        width: width,
        zIndex: -1
    },
    favScrollContainer:{
        top: 80,
        flex: 1,
        position: 'absolute',
        height: height,
    },
    noUserFavContainer:{
        flex: 1,
        position: 'absolute',
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText:{
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        width: width,
        backgroundColor: 'rgba(0, 0, 0, 0.40)',
        color: '#FFF'
    },
    logInButton:{
        width: 200,
        marginTop: 50,
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20 
    },
    logintxt:{
        fontSize: 25,
        fontWeight: '500'

    }
})

export default favouriteStyles