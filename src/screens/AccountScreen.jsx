import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import accountStyles from '../styles/accountStyles';
import usersActions from '../redux/actions/userActions'
import favouriteStyles from '../styles/favouritesStyles';


function AccountScreen({ navigation }) {
    const user = useSelector(store => store.usersReducer.userData)
    const dispatch = useDispatch()
    const [password, setPassword] = useState(null)
    const [userName, setUserName] = useState(null)
    console.log(user)
    const HandleSubmit = async () => {
        if (!userName) {
            Alert.alert(
                "Username cannot be empty",
                'Please complete with your email',
                [
                    { text: "OK", onPress: () => console.log('done') }
                ]
            );
        } else {
            const loggedUser = {
                email: userName,
                password: password,
                from: 'propietary-signup'
            }
            console.log(loggedUser)
            const res = await dispatch(usersActions.logInUser(loggedUser))
            if (!res.data.success) {
                Alert.alert(
                    "Error",
                    res.data.message,
                    [
                        { text: "OK", onPress: () => console.log('done') }
                    ]
                );
            }

        }

    }
    const handleLogOut = () => {
        dispatch(usersActions.logOutUser())
    }

    return (
        <View style={accountStyles.accountContainer}>
            <View style={accountStyles.logoAndTitle} >
                <Image
                    style={accountStyles.logo}
                    source={require('../../assets/logo.png')}
                />
            </View>
            {user ?
                <>
                    <View style={accountStyles.userContainer}>
                        <Text style={accountStyles.logInText}>Hi {user.firstName}!</Text>

                    </View>
                    <View style={accountStyles.logInContainer}>
                        {/* <TouchableOpacity style={accountStyles.logIn}
                            onPress={()=> navigation.navigate('Explore')}
                        ><Text style={accountStyles.logInText}>Explore</Text></TouchableOpacity> */}
                        <TouchableOpacity style={accountStyles.logIn}
                            onPress={handleLogOut}
                        ><Text style={accountStyles.logInText}>Log Out</Text></TouchableOpacity>
                    </View>

                </>

                :
                <>
                    <View style={accountStyles.inputContainer}>
                        <TextInput
                            style={accountStyles.input}
                            placeholder='Email'
                            textContentType='emailAddress'
                            value={userName}
                            onChangeText={setUserName}
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={accountStyles.input}
                            placeholder='Password'
                            textContentType='password'
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            value={password}
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={accountStyles.logInContainer}>
                        <TouchableOpacity style={accountStyles.logIn}
                            onPress={HandleSubmit}
                        ><Text style={accountStyles.logInText}>Log In</Text></TouchableOpacity>
                        <Text style={{fontWeight: '700', fontSize: 18}}>Or log in with:</Text>
                        <TouchableOpacity style={accountStyles.logIn}><Text style={accountStyles.logInText}>Google</Text></TouchableOpacity>
                    </View>
                    <View style={accountStyles.logInContainer}>
                        <Text style={accountStyles.ctaSignUp}>Not a member? </Text><TouchableOpacity style={accountStyles.ctaSignUpButton}
                            onPress={() => navigation.navigate('Sign Up')}
                        ><Text>Sign up</Text></TouchableOpacity>
                    </View>
                </>

            }
            <ImageBackground
                style={accountStyles.imgBack}
                source={{
                    uri: 'https://i.pinimg.com/564x/7c/89/c1/7c89c1817f9c03988c64a3601ca4b04b.jpg'
                }}
                resizeMode='cover'
            />
        </View>

    )
}


export default AccountScreen