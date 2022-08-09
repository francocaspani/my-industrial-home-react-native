import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import productActions from '../redux/actions/productActions';
import productDetailStyles from '../styles/productDetailStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usersActions from '../redux/actions/userActions';
import basketActions from '../redux/actions/basketActions'

export default function ProductDetailScreen({ route, navigation }) {
    const { id } = route.params
    const [ratingProduct, setRatingProduct] = useState(0)
    const [favourites, setFavourites] = useState([])
    const [product, setProduct] = useState(null)
    const [reload, setReload] = useState(false)
    const [stock, setStock] = useState([])
    const dispatch = useDispatch()

    const user = useSelector(store => store.usersReducer.userData)
    const rating = useSelector(store => store.productsReducer.rating)
    const basket = useSelector(store => store.basketReducer.productsBasket)



    const onClickReload = () =>
        setReload(!reload);

    useEffect(() => {
        dispatch(productActions.getOneProduct(id))
            .then(res => setProduct(res.data.response.product))

        dispatch(basketActions.getUserBasket())
    }, [reload])

    useEffect(() => {
        if (product) {
            if (product.reviews.length > 0) {
                dispatch(productActions.getRating(product.reviews))
                setRatingProduct(rating)
            }
            if (product.stock > 0) {
                let stockArray = [...Array(product.stock).keys()]
                setStock(stockArray)
            }
        }
        if (user) {
            const favId = user.favourite.map(fav => fav._id)
            setFavourites(favId)
        }
    }, [product, rating, user])

    const handleFavourite = async () => {
        if (user) {
            const token = await AsyncStorage.getItem('@token')
            const res = await dispatch(usersActions.handleFavourites(id, token))

        } else {
            Alert.alert(
                "You have to be logged to save this to favourites",
                'Please log in',
                [
                    { text: "OK", onPress: () => navigation.navigate('Account') }
                ]
            );
        }

        if (AsyncStorage.getItem('@token') !== null) {
            const verifyToken = async () => {
                const token = await AsyncStorage.getItem('@token')
                await dispatch(usersActions.verifyToken(token))
            }
            verifyToken()
        }
        onClickReload()
    }

    async function addBasket() {
        const productToAdd = {
            productId: product._id,
            amount: 1
        }
        await dispatch(basketActions.addToBasket(productToAdd));
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
                            >
                                {favourites.includes(product._id) ? <Ionicons name='heart' size={50} /> : <Ionicons name='heart-outline' size={50} />}
                            </TouchableOpacity>
                            <TouchableOpacity style={productDetailStyles.button}
                                onPress={() => addBasket()}
                            ><Ionicons name='basket' size={50} /></TouchableOpacity>
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