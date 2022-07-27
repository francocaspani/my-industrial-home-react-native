import { View, Text } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

export default function FavouriteScreen() {

  const user = useSelector(store => store.usersReducer.userData)

  console.warn(user)


  return (
    <View>
      <Text>FavouriteScreen</Text>
    </View>
  )
}