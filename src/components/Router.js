import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorScheme } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchScreen from '../screens/SearchScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import AccountScreen from '../screens/AccountScreen';

const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackVisible: true,
                headerTransparent: true,
            }}>
            <Stack.Screen
                component={HomeScreen}
                name='HomeScreen'
                options={{
                    title: 'My Industrial Home'
                }} />
        </Stack.Navigator>
    )
}



export default function Router() {
    const scheme = useColorScheme()
    return (
        <NavigationContainer
            theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        } else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search-outline';
                        } else if (route.name === 'Account') {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'Favourites') {
                            iconName = focused ? 'heart' : 'heart-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen
                    name='Home'
                    component={HomeStack}
                    options={{
                        headerShown: false,
                    }} />
                <Tab.Screen
                    name='Search'
                    component={SearchScreen}
                    options={{
                        headerShown: false,
                    }} />
                <Tab.Screen
                    name='Favourites'
                    component={FavouriteScreen}
                    options={{
                        headerShown: false,
                    }} />
                <Tab.Screen
                    name='Account'
                    component={AccountScreen}
                    options={{
                        headerShown: false,
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}