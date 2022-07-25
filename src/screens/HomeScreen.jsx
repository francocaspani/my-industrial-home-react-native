import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import homeStyles from '../styles/homeStyles'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ambientActions from '../redux/actions/ambientActions'
import productActions from '../redux/actions/productActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window')


export default function HomeScreen() {
    const ambients = useSelector(store => store.ambientsReducer.ambients)
    const dispatch= useDispatch()
    useEffect(() => {
        dispatch(ambientActions.getAmbients())
        dispatch(productActions.getProducts())

        if (AsyncStorage.getItem('@token') !== null) {
            const token = AsyncStorage.getItem('@token')

            const verifyToken = async () => {
                await dispatch(usersActions.verifyToken(token))
            verifyToken()
        }
    }}, [])

    const renderItem = ({ item, index }) => {
        return (
            <View style={homeStyles.homeContainer}>
                <Image
                    style={homeStyles.imgAmbient}
                    resizeMode={'cover'}
                    source={{
                        uri: item.img
                    }} />
            </View>
        )

    }


    return (
        <View style={homeStyles.homeContainer}>
            <Carousel
                layout={'default'}
                data={ambients}
                renderItem={renderItem}
                itemWidth={width}
                sliderWidth={width}
                itemHeight={height}
                sliderHeight={height}
                loop={false}
                autoplay={false}
                vertical={true}
                onSnapToItem={(index) => console.warn(index)}
            />
        </View>
    )
}