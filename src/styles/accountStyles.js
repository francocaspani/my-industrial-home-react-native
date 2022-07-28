import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')


const accountStyles = StyleSheet.create({
    accountContainer:{
        flex: 1
    },
    logoAndTitle:{
        height: 200,
        justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        flex: 1
    },
    logo:{
        height:150,
        width: 300,
        
    },
    userAvatar:{
        height:100,
        width: 100,
        borderRadius: 100
    },
    userContainer:{
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 20
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    inputContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    input:{
        height: 40,
        width: 300,
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 10,
        padding: 5,
    },
    logInContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    logIn:{
        height: 40,
        width: 200,
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 20,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logInText:{
        fontSize: 17,
        fontWeight: '600'
    },
    ctaSignUp:{
        fontSize: 15,
        fontWeight: '500'
    },
    ctaSignUpButton:{
        height: 40,
        width: 100,
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 20,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgBack:{
        width: width,
        height: height,
        zIndex: -1,
        position: 'absolute'
    }
})

export default accountStyles