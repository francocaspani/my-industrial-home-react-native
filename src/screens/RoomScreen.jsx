import { View, Text } from 'react-native'
import React from 'react'
import roomStyles from '../styles/roomStyles'


export default function RoomScreen({ route, navigation }) {
    const { id } = route.params
    return (
        <View style={roomStyles.roomContainer}>
            <Text>RoomScreen</Text>
        </View>
    )
}