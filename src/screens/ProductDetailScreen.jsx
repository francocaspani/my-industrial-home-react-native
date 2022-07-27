import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import productActions from '../redux/actions/productActions';
import productDetailStyles from '../styles/productDetailStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usersActions from '../redux/actions/userActions';

export default function ProductDetailScreen({ route, navigation }) {
    const { id } = route.params
    const [ratingProduct, setRatingProduct] = useState(0)
    const [favourites, setFavourites] = useState([])
    const [product, setProduct] = useState(null)
    const [reload, setReload] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(store => store.usersReducer.userData)
    //const product = useSelector(store => store.productsReducer.product)
    const rating = useSelector(store => store.productsReducer.rating)

    // if (user) {
    //     if (user.favourite.length > 0){
    //         setFavourites(user.favourite.map(fav => fav._id))
    //     }
    // }
    
    console.warn(user)
    const onClickReload = () =>
        setReload(!reload);

    useEffect(() => {
        dispatch(productActions.getOneProduct(id))
            .then(res => setProduct(res.data.response.product))
    }, [reload])

    useEffect(() => {
        if (product) {
            if (product.reviews.length > 0) {
                dispatch(productActions.getRating(product.reviews))
                setRatingProduct(rating)
            }
        }
    }, [product, rating])

    const handleFavourite = async () => {
        if (user) {
            const token = await AsyncStorage.getItem('@token')
            const res = await dispatch(usersActions.handleFavourites(id, token))
            console.warn(id)
        } else {
            Alert.alert(
                "You have to be logged to save this to favourites",
                'Please log in',
                [
                    { text: "OK", onPress: () => navigation.navigate('Account') }
                ]
            );
        }
        onClickReload()
    }

    return (
        <>
            {product &&
                <>
                    <View style={productDetailStyles.detailContainer}>
                        <Image
                            style={productDetailStyles.imgProduct}
                            source={{
                                uri: product.img
                            }}
                            resizeMode='contain'
                        />
                        <View style={productDetailStyles.detailTextContainer}>
                            <Text style={productDetailStyles.nameProduct}>{product.name}</Text>
                            <Text style={productDetailStyles.detailProduct}>{product.detail}</Text>


                            <View style={productDetailStyles.rating}>
                                <Text style={productDetailStyles.price}>${product.price}</Text>
                                <Rating
                                    type='custom'
                                    tintColor={'#F2F2F2'}
                                    readonly
                                    startingValue={ratingProduct}
                                />
                            </View>
                        </View>
                        <View style={productDetailStyles.detailButtons}>
                            <TouchableOpacity style={productDetailStyles.button}
                            onPress={handleFavourite}
                            ><Ionicons name='heart' size={50} /></TouchableOpacity>
                            <TouchableOpacity style={productDetailStyles.button}><Ionicons name='basket' size={50} /></TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={productDetailStyles.buttonReviews}
                                onPress={() => navigation.navigate('Reviews', { id: id })}
                            ><Text style={productDetailStyles.buttonReviewsText}>Reviews</Text></TouchableOpacity>
                        </View>



                    </View>
                </>
            }

        </>

    )
}