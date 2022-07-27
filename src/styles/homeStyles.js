import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window')


const homeStyles = StyleSheet.create({
    imgAmbient:{
        height: height,
        width: width,
    },
    homeContainer:{
        height: height,
        width: width,
        flex: 1
    },
    button:{
        position: 'absolute',
        top: '50%',
        right: 50,
        height: 30,
        width: 100,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText:{
        fontSize: 16
    },
    logo:{
        height:150,
        width: 300,
        position: 'absolute',
        top: 60,
        left: 50

    }

})

export default homeStyles