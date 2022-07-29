import axios from 'axios'
import { urlBackend } from "../../../App";
import AsyncStorage from '@react-native-async-storage/async-storage';

const basketActions = {

    getUserBasket: () => {
        return async (dispatch, getState) => {
            const token = await AsyncStorage.getItem('@token')
            try {
                const res = await axios.get(`${urlBackend}/basket`, { headers: { Authorization: "Bearer " + token } })
                dispatch({ type: 'getProductsBasket', payload: res.data.response.basket })
                return res
            } catch (error) {
                console.log(error)
            }
        }
    },

    getProduct: (id) => {
        
        return async (dispatch, getState) => {
            const token = await AsyncStorage.getItem('@token')
            try {
                const answer = await axios.get(`${urlBackend}/basket/${id}`, { headers: { Authorization: "Bearer " + token } })
                dispatch({ type: 'getOne', payload: answer.data.response.basket })
                return (answer.data.response.basket)
            } catch (error) {
                console.log(error)
            }

        }
    },

    addToBasket: (product) => {
        
        return async (dispatch, getState) => {
            const token = await AsyncStorage.getItem('@token')
            const answer = await axios.post(`${urlBackend}/basket`, { product }, { headers: { Authorization: "Bearer " + token } })
            dispatch({ type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success } })
            return answer.data.response
        }
    },

    deleteBasketProduct: (idProduct) => {
       
        return async (dispatch, getState) => {
             const token = await AsyncStorage.getItem('@token')
            try {
                const answer = await axios.delete(`${urlBackend}/deletebasket/${idProduct}`, { headers: { Authorization: "Bearer " + token } })
                dispatch({ type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success } })
                return answer.data.response
            } catch (err) {
                console.log(err)
            }
        }
    },

    modifyBasketProduct: (toModify) => {
        return async (dispatch, getState) => {
            const token = await AsyncStorage.getItem('@token')
            const answer = await axios.put(`${urlBackend}/basket`, { toModify },
                { headers: { Authorization: "Bearer " + token } })
            dispatch({ type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success } })
            return answer.data.response
        }
    },

    modifyState: (sku, buyState) => {
        
        return async (dispatch, getState) => {
            const token = await AsyncStorage.getItem('@token')
            const answer = await axios.put(`${urlBackend}/hola`, { sku, buyState },
                { headers: { Authorization: "Bearer " + token } })
            dispatch({ type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success } })
            return answer.data.response
        }
    },

    modifyStock: (sku) => {
        
        return async (dispatch, getState) => {
            const token = await AsyncStorage.getItem('@token')
            const answer = await axios.put(`${urlBackend}/modifyStock/${sku}`, {},
                { headers: { Authorization: "Bearer " + token } })
            dispatch({ type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success } })
            return answer.data.response
        }
    }

}

export default basketActions