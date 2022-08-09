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

export default function BasketScreen({ navigation }) {
  const user = useSelector(store => store.usersReducer.userData)
  const dispatch = useDispatch()
  const basket = useSelector(store => store.basketReducer.productsBasket)
  const [reload, setReload] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

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
    setReload(!reload)
  }

  async function modifyBasket(amountPicked, item) {
    const toModify = {
      productId: item._id,
      amount: amountPicked,
    }
    await dispatch(basketActions.modifyBasketProduct(toModify))
    setReload(!reload)
  }

  return (
    <View style={basketStyles.basketContainer}>
      {basket.length == 0 ?
        <View style={basketStyles.nobasketContainer}>
          <Text style={{fontSize: 25, fontWeight: '600'}}>Nothing over here</Text>
          <Image
                    style={basketStyles.basketImg}
                    source={{
                      uri: 'https://static.thenounproject.com/png/2942210-200.png'
                    }
                    }
                    resizeMode='contain'
                />
          <TouchableOpacity style={basketStyles.checkoutButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={basketStyles.chekoutText}>Continue shopping</Text>
          </TouchableOpacity>
        </View>
        :

        <>
        <ScrollView style={basketStyles.scrollBasket}>
        {
          basket && basket.map((item, i) => {
            const stock = [...Array(item.productId.stock).keys()]

            return (
              <Swipeable rightButtons={[
                <TouchableOpacity
                  onPress={() => deleteBasket(item)}
                  style={{ height: '100%', width: 70, justifyContent: 'center', alignItems: 'center' }}
                ><Ionicons name='trash-bin' size={40} /></TouchableOpacity>,
                <TouchableOpacity
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
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={1}
                    style={basketStyles.picker}
                  >
                    {stock.map((stock) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            modifyBasket((stock + 1), item)
                            setShowPicker(!showPicker)
                          }}
                          style={basketStyles.qttButton}
                        >
                          <Text style={{ color: 'white' }}>
                            {stock + 1}
                          </Text>

                        </TouchableOpacity>
                      )
                    })}
                  </ScrollView>}

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
        <TouchableOpacity style={basketStyles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={basketStyles.chekoutText}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
        </>
      }
      
    </View>
  )
}