import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')


const tyStyles = StyleSheet.create({
    accountContainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    logoAndTitle:{
        height: 200,
        justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        backgroundColor: 'black'
    },
    logo:{
        height:150,
        width: 300,
    },
    tyImg:{
        height: 300, 
        width: 300
    },
    textContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        width: 300,
        height: 50,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10
    },
    buttonText:{
        fontSize: 20,
        fontWeight: '600'
    }

})

export default tyStyles