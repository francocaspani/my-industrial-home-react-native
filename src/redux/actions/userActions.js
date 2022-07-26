import axios from "axios";
import { urlBackend } from "../../../App";
import AsyncStorage from '@react-native-async-storage/async-storage';

const usersActions = {
    signUpUser: (userData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(`${urlBackend}/auth/signup`, { userData })
                dispatch({ type: 'signUpUser', payload: res.data })
                return res
            } catch (error) {
                console.log(error)
            }
        }
    },
    logInUser: (loggedUser) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(`${urlBackend}/auth/login`, { loggedUser })
                dispatch({ type: 'logInUser', payload: res.data })
                console.log(res)
                if (res.data.success) {
                    AsyncStorage.setItem('@token', res.data.response.token)
                }
                return res
            } catch (error) {
                console.log(error);
            }
        }
    },
    logOutUser: () => {
        return async (dispatch, getState) => {
            AsyncStorage.removeItem('@token')
            dispatch({ type: 'logOutUser', payload: null })
        }
    },
    sendNewsletter: (email) => {
        console.log(email)
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(`${urlBackend}/confirmation/${email}`)
                dispatch({ type: 'newsletter', payload: res.data })
                console.log(res)
                return res
            } catch (error) {
                console.log(error)
            }
        }
    },
    verifyToken: (token) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`${urlBackend}/auth/verifytoken`, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(user => {
                    if (user.data.success) {
                        dispatch({ type: 'logInUser', payload: user.data })
                        return user
                    } else {
                        AsyncStorage.removeItem('@token')
                    }
                }).catch(error => {
                    if (error.response.status === 401)
                        dispatch({ type: 'logOutUser', payload: null }) 
                        AsyncStorage.removeItem('@token')
                    return {
                        data:{
                            success: false,
                            message: 'Please log in again'
                        }
                    }
                })

            return res
        }
    },
    handleFavourites: (idProduct, token) => {
        return async (dispatch, getState) => {
            const res = await axios.post(`${urlBackend}/favourite/${idProduct}`, { },{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        return res
        }
    }
    
}

export default usersActions