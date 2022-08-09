import { View, Text, Image, Dimensions, ScrollView, Pressable, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import homeStyles from '../styles/homeStyles'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ambientActions from '../redux/actions/ambientActions'
import productActions from '../redux/actions/productActions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window')


export default function HomeScreen({navigation}) {
    const ambients = useSelector(store => store.ambientsReducer.ambients)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ambientActions.getAmbients())
        dispatch(productActions.getProducts())

        if (AsyncStorage.getItem('@token') !== null) {
            
            const verifyToken = async () => {
                const token = await AsyncStorage.getItem('@token')
                await dispatch(usersActions.verifyToken(token))

            }
            verifyToken()
        }
    }, [])

    const newimg = ['https://images-ext-2.discordapp.net/external/iYmFa-tSumO1WF06Mz4_Rvs7YakPv1FFiORCURrPFnY/https/i.pinimg.com/564x/fe/9e/b1/fe9eb113bc8fc97bdb6db12298bf7d3a.jpg', 'https://i.pinimg.com/564x/71/69/5d/71695d1753810c1688cd00fadf8f4758.jpg', 'https://i.pinimg.com/564x/75/03/9e/75039e99c6292c490b09005a7a863c3e.jpg', 'https://i.pinimg.com/564x/0f/3e/da/0f3eda49fbb11b79f5a3446f5695d33e.jpg', 'https://i.pinimg.com/564x/59/4d/c0/594dc008844704ed911ffa7df3f27e8c.jpg']


    return (
        <>
            {ambients.length > 0 &&

                <>
                    <View style={homeStyles.homeContainer}>
                        <ScrollView
                            scrollEventThrottle={1}
                            pagingEnabled
                            snapToInterval={height}
                        >
                            {newimg.map((ambient, i) => {
                                return (
                                    <View style={homeStyles.homeContainer}
                                    key={i}
                                    >
                                        <ImageBackground
                                            style={homeStyles.imgAmbient}
                                            resizeMode={'cover'}
                                            source={{
                                                uri: ambient
                                            }} />
                                        <TouchableOpacity style={homeStyles.button}
                                        onPress={()=> navigation.navigate('Rooms', {id:ambients[i]._id})}
                                        >
                                            <Text style={homeStyles.buttonText}>{ambients[i].name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </ScrollView>
                        <Image
                            style={homeStyles.logo}
                            source={require('../../assets/logo.png')}
                        />
                    </View>
                </>
            }

        </>

    )
}