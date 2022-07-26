import { View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native'
import React from 'react'
import searchStyles from '../styles/searchStyles'
import { useEffect, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { Rating, AirbnbRating } from 'react-native-ratings';
import CardProduct from '../components/CardProduct';
import productActions from '../redux/actions/productActions';

export default function SearchScreen({navigation}) {
  const [input, setInput] = useState('');
  const products = useSelector(store => store.productsReducer.productsFiltered)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(productActions.filterProductsByName(input))
  }, [input])
  

  return (
    <View style={searchStyles.searchContainer}>
      <View style={searchStyles.buttonInput}>
        <Ionicons name='search' color={'black'} size={20} />
        <TextInput
          style={searchStyles.input}
          placeholder='Search'
          onChangeText={setInput}
          value={input}
        />
      </View>
      <ScrollView style={searchStyles.scrollCards}>
        {products.map(prod => {
          return (
            <CardProduct prod={prod} navigation={navigation}/>
          )
        })}

      </ScrollView>

    </View>
  )
}