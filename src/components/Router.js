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
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useSelector, useDispatch } from 'react-redux';
import BasketScreen from '../screens/BasketScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import { useEffect } from 'react';
import basketActions from '../redux/actions/basketActions'
import ThanksScreen from '../screens/ThanksScreen';

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
                headerShown: false,
            }} />
        </Stack.Navigator>
    )
}

function SearchStack() {
    return(
        <Stack.Navigator
        screenOptions={{
            headerBackVisible: true,
            headerTransparent: true,
        }}
        >
            <Stack.Screen
            component={SearchScreen}
            name='Search Screen'
            options={{
                headerShown: false,
            }} 
            />
            <Stack.Screen
            component={ProductDetailScreen}
            name='Details'
            />
            <Stack.Screen
            component={ReviewsScreen}
            name='Reviews'
            />
        </Stack.Navigator>
    )
}

function FavouriteStack() {
    return(
        <Stack.Navigator
        screenOptions={{
            headerBackVisible: true,
            headerTransparent: true,
        }}
        >
            <Stack.Screen
            component={FavouriteScreen}
            name='Your Favourites'
            options={{
                headerShown: false,
            }} 
            />
            <Stack.Screen
            component={ProductDetailScreen}
            name='Details'
            />
        </Stack.Navigator>
    )
}

function AccountStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="My Account" component={AccountScreen} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </Stack.Navigator>
    );
}

function BasketStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name='Basket'
            component={BasketScreen}
            />
            <Stack.Screen
            name='Checkout'
            component={CheckoutScreen}
            />
            <Stack.Screen
            name='Order confirmation'
            component={ThanksScreen}
            options={{
                headerBackVisible: false
            }}
            />
        </Stack.Navigator>
    )
}

export default function Router() {
    const user = useSelector(store => store.usersReducer.userData)
    const basket = useSelector(store => store.basketReducer.productsBasket)
    const scheme = useColorScheme()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (user) {
          dispatch(basketActions.getUserBasket())
        }
      }, [user])
    
    
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
                        }else if (route.name === 'Basket') {
                            iconName = focused ? 'basket' : 'basket-outline'
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
                    component={SearchStack}
                    options={{
                        headerShown: false,
                    }} />
                <Tab.Screen
                    name='Basket'
                    component={BasketStack}
                    options={{
                        headerShown: false,
                        tabBarBadge: basket ? basket.length : null
                    }} />
                <Tab.Screen
                    name='Favourites'
                    component={FavouriteStack}
                    options={{
                        headerShown: false,
                        tabBarBadge: user? user.favourite.length : null
                    }} />
                <Tab.Screen
                    name='Account'
                    component={AccountStackScreen}
                    options={{
                        headerShown: false
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}