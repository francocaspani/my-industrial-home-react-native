import { View, Text, TextInput, Pressable, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import searchStyles from '../styles/searchStyles'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productActions from '../redux/actions/productActions';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CardProduct({ prod, navigation }) {
    const dispatch = useDispatch()
    // const [rating, setRating] = useState(0)

    // // useEffect(() => {
    // //     dispatch(productActions.getRating(prod.reviews))
    // //     .then(res)
    // // }, [])
    
    // const [magia, setMagia] = useState(0)
    
    // async function ratingProduct() {
    //     let prodRating;
    //     const ratings = await prod.reviews.map(rev => rev.rating);
    //     let sumRating = 0;
    //     for (let i = 0; i < ratings.length; i++) {
    //         sumRating = ratings[i] + sumRating
    //     }
    //     prodRating = sumRating / (prod.reviews.length)
    //     return prodRating;
    // }

    return (
        <TouchableOpacity style={searchStyles.productCard} onPress={()=> navigation.navigate('Details', {id:prod._id})}>
            <View>
                <Text style={searchStyles.nameProduct}>{prod.name}</Text>
                <Text style={searchStyles.detailProduct}>${prod.price}</Text>

            </View>
            <Image
                style={searchStyles.imgCard}
                resizeMode='contain'
                source={{
                    uri: prod.img
                }}
            />
        </TouchableOpacity>
    )
}