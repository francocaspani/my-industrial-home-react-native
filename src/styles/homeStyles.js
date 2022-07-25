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
    }
})

export default homeStyles