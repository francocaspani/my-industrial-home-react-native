import { View, Text, TextInput, Pressable, ScrollView, Image, ImageBackground } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import CardProduct from '../components/CardProduct';
import { TouchableOpacity } from 'react-native-gesture-handler';
import favouriteStyles from '../styles/favouritesStyles';

export default function FavouriteScreen({ navigation }) {

  const user = useSelector(store => store.usersReducer.userData)



  return (
    <>
      <View style={favouriteStyles.favContainer}>

        {user ?
          <View style={favouriteStyles.favScrollContainer}>

            <ScrollView style={favouriteStyles.scrollCards}>
              {user.favourite.map((prod,i )=> {
                return (
                  <CardProduct key={i} prod={prod} navigation={navigation} />
                )
              })}

            </ScrollView>
          </View>

          :
          <View style={favouriteStyles.noUserFavContainer}>
            <Text style={favouriteStyles.loginText}>Log in to your account to get your favourites!</Text>
            <TouchableOpacity style={favouriteStyles.logInButton}
            onPress={()=>navigation.navigate('Account')}
            ><Text style={favouriteStyles.logintxt}>Log In</Text></TouchableOpacity>
          </View>
        }
        <ImageBackground
          style={favouriteStyles.imgback}
          source={{
            uri: 'https://readyforloft.com/wp-content/uploads/2021/02/Sende-Industrial-Loft-Mirror3.jpg'
          }}
          resizeMode='cover'
        />

      </View>
    </>

  )
}