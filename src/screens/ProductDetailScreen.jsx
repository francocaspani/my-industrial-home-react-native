import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import productActions from '../redux/actions/productActions';
import productDetailStyles from '../styles/productDetailStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { set } from 'react-native-reanimated';

export default function ProductDetailScreen({ route, navigation }) {
    const { id } = route.params
    const [ratingProduct, setRatingProduct] = useState(0)
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch()

    //const product = useSelector(store => store.productsReducer.product)
    const rating = useSelector(store => store.productsReducer.rating)
    useEffect(() => {
        dispatch(productActions.getOneProduct(id))
            .then(res => setProduct(res.data.response.product))
    }, [id])

    useEffect(() => {
        if (product) {
            if (product.reviews.length > 0) {
                dispatch(productActions.getRating(product.reviews))
                setRatingProduct(rating)
            }
        }
    }, [product])




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
                            <TouchableOpacity style={productDetailStyles.button}><Ionicons name='heart' size={50} /></TouchableOpacity>
                            <TouchableOpacity style={productDetailStyles.button}><Ionicons name='basket' size={50} /></TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={productDetailStyles.buttonReviews}><Text style={productDetailStyles.buttonReviewsText}>Reviews</Text></TouchableOpacity>
                        </View>



                    </View>
                </>
            }

        </>

    )
}