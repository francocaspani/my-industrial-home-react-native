import { View, Text, Image, Dimensions, ScrollView, Pressable, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import homeStyles from '../styles/homeStyles'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ambientActions from '../redux/actions/ambientActions'
import productActions from '../redux/actions/productActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window')


export default function HomeScreen() {
    const ambients = useSelector(store => store.ambientsReducer.ambients)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ambientActions.getAmbients())
        dispatch(productActions.getProducts())

        if (AsyncStorage.getItem('@token') !== null) {
            const token = AsyncStorage.getItem('@token')

            const verifyToken = async () => {
                await dispatch(usersActions.verifyToken(token))
                verifyToken()
            }
        }
    }, [])

    return (
        <View style={homeStyles.homeContainer}>
            <ScrollView
                scrollEventThrottle={1}
                pagingEnabled
                snapToInterval={height}
            >
                {ambients?.map((ambient, i) => {
                    return (
                        <View style={homeStyles.homeContainer}
                        >
                            <ImageBackground
                                style={homeStyles.imgAmbient}
                                resizeMode={'cover'}
                                source={{
                                    uri: ambient.img
                                }} />
                            <TouchableOpacity style={homeStyles.button}>
                                <Text style={homeStyles.buttonText}>{ambient.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}