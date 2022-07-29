import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')


const checkoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 330
    },
    label: {
        color: "black",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "black",
    },
    inputContainer:{
        backgroundColor: '#fff',
        height: 60,
        justifyContent: 'center',
        borderRadius: 5,
        paddingLeft: 5,
        paddingTop: 20,
        width: 'auto'
    },
    payButton:{
        width: 300,
        height: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10
    },
    payText: {
        fontSize: 20,
        fontWeight: '600'
    }
})

export default checkoutStyles