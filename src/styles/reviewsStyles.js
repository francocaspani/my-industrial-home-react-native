import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window')


const reviewsStyles = StyleSheet.create({
    reviewContainer:{
        top: 85,
        paddingHorizontal: 20,
        flex: 1
    },
    nameProductReview:{
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '500',
        marginBottom: 20
    },
    stars:{
        width: '100%',
        textAlign: 'center',
        fontSize: 18
    },
    rating:{
        marginBottom: 20
    },
    dateAndName:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    ratingAndDate:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10
    },
    reviewDescriptionContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        height: 150
    },
    imgReview:{
        width: '40%',
        height: 120,
        backgroundColor: 'black',
        borderRadius: 20,
        marginRight: 20
    },
    textReview:{
        justifyContent: 'flex-start',
        height: '90%'
    },
    textTitleReview:{
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10
    },
    everyReview:{
        borderBottomWidth: 0.5,

    }

})

export default reviewsStyles