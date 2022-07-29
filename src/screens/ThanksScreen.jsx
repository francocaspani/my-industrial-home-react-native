import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import tyStyles from '../styles/tyStyles'

export default function ThanksScreen({navigation}) {
    return (
        <View style={tyStyles.accountContainer}>
            <View style={tyStyles.logoAndTitle} >
                <Image
                    style={tyStyles.logo}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <View style={tyStyles.textContainer}>
                <Text style={{fontSize: 25}}>Thanks for your purchase!</Text>
                <Text>Your order confirmation is:</Text><Text style={{fontSize: 18}}>9RJ68417JU9093806</Text>
                <Text style={{fontSize: 15, textAlign: 'center'}}>Will be send you an email with the details of your purchase. If you don`t receive it check your spam.</Text>
                <Image
                    style={tyStyles.tyImg}
                    source={require('../../assets/puchase.png')}
                    resizeMode='contain'
                />
            </View>
            <TouchableOpacity style={tyStyles.button}
            onPress={()=> navigation.navigate('HomeScreen')}
            >
                <Text style={tyStyles.buttonText}>Continue shopping</Text>
            </TouchableOpacity>
        </View>
    )
}