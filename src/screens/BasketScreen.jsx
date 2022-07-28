import { View, Text, ScrollView, Image, Animated, TouchableHighlight } from 'react-native'
import { useEffect } from 'react'
import basketActions from '../redux/actions/basketActions'
import { useSelector, useDispatch } from 'react-redux';
import basketStyles from '../styles/basketStyles';
import Swipeable from 'react-native-swipeable';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Picker, PickerIOS } from '@react-native-picker/picker';

export default function BasketScreen() {
  const user = useSelector(store => store.usersReducer.userData)
  const dispatch = useDispatch()
  const basket = useSelector(store => store.basketReducer.productsBasket)
  const [reload, setReload] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(basketActions.getUserBasket())
    }
  }, [user, reload])

  let subtotals = []
  if (basket) {
    (basket?.map(product => {
      subtotals.push(product.productId.price * product.amount)
    }))
  }



  let subTotalBasket = 0;
  function addTotal() {
    for (let i = 0; i < subtotals.length; i++) {
      subTotalBasket = subtotals[i] + subTotalBasket;
    }
    return subTotalBasket;
  }
  addTotal()
  let shipping = (basket.length !== 0) ? 15 : 0;
  let totalBasket = shipping + subTotalBasket;

  async function deleteBasket(item) {
    const productId = item._id;
    await dispatch(basketActions.deleteBasketProduct(productId));
    console.log(productId)
    setReload(!reload)
  }

  async function modifyBasket(item) {
    setAmount(event.target.value);
    const toModify = {
      productId: product._id,
      amount: event.target.value,
    }
    await dispatch(basketActions.modifyBasketProduct(toModify))
    setReload(!reload)
  }

  return (
    <View style={basketStyles.basketContainer}>
      <ScrollView style={basketStyles.scrollBasket}>
        {
          basket && basket.map((item, i) => {
            const stock = [...Array(item.productId.stock).keys()]

            return (
              <Swipeable rightButtons={[
                <TouchableOpacity
                  onPress={() => deleteBasket(item)}
                  style={{ height: '100%', width: 70, justifyContent: 'center', alignItems: 'center' }}
                ><Ionicons name='trash-bin' size={40} /></TouchableOpacity>, <TouchableOpacity
                  onPress={() => setShowPicker(!showPicker)}
                  style={{ height: '100%', width: 70, justifyContent: 'center', alignItems: 'center' }}
                ><Ionicons name='add-circle' size={40} /></TouchableOpacity>

              ]}>
                <View style={basketStyles.basketItem}>
                  <Image
                    style={basketStyles.imgItem}
                    source={{
                      uri: item.productId.img
                    }}
                  />
                  <View style={basketStyles.textItem}>
                    <Text style={basketStyles.textItemName}>{item.productId.name}</Text>
                    <Text>${item.productId.price}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 18 }}>Total: ${item.productId.price * item.amount}</Text>
                      <View style={basketStyles.addbutton}><Text> {item.amount} unit</Text></View>
                    </View>

                  </View>
                </View>
                {showPicker &&
                  <PickerIOS
                    style={basketStyles.picker}
                    selectedValue={amount}
                    onValueChange={(itemValue, itemIndex) => {
                      setAmount(itemValue)
                      setTimeout(() => {
                        // addBasket(itemValue)
                        // setShowPicker(!showPicker)
                        //setAmount(0)
                      }, 2000);
                    }
                    }>
                    {stock.map((stock) => {
                      return (
                        <Picker.Item label={`${stock + 1}`} value={stock + 1} />
                      )
                    })}
                  </PickerIOS>}
              </Swipeable>

            )
          })
        }

      </ScrollView>
      <View style={basketStyles.totalContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={basketStyles.textTotals}>Subtotal: </Text>
          <Text style={basketStyles.textTotals}>${subTotalBasket}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={basketStyles.textTotals}>Shipping: </Text>
          <Text style={basketStyles.textTotals}>${shipping}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ fontSize: 25 }}>Total:</Text>
          <Text style={{ fontSize: 25 }}>${totalBasket}</Text>
        </View>
      </View>
    </View>
  )
}