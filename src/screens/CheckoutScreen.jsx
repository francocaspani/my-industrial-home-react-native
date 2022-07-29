import React, { Component } from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Alert, ActivityIndicator } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { TouchableOpacity } from "react-native-gesture-handler";
import checkoutStyles from "../styles/checkoutStyles";

export default function Checkout({ navigation }) {

  const [form, setForm] = useState({})
  const [showActIndicator, setshowActIndicator] = useState(false)

  const _onChange = (formData) => {
    /* eslint no-console: 0 */
    setForm(formData)
  };

  const _onFocus = (field) => {
    /* eslint no-console: 0 */
  };


  return (
    <>
      {showActIndicator ?
        <ActivityIndicator
          style={{ marginTop: 300 }}
        />
        :
        <View style={checkoutStyles.container}>

          <CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            labelStyle={checkoutStyles.label}
            inputStyle={checkoutStyles.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            cardFontFamily={'System'}
            inputContainerStyle={checkoutStyles.inputContainer}
            onFocus={_onFocus}
            onChange={_onChange} />

          <TouchableOpacity
            style={checkoutStyles.payButton}
            onPress={() => {
              if (form) {
                setshowActIndicator(true)
                setTimeout(() => {
                  navigation.navigate('Order confirmation')
                }, 3000);
                setTimeout(() => {
                  setshowActIndicator(false)
                }, 4000);
              } else {
                Alert.alert(
                  "Error",
                  'Some of the fields are empty, or the information is wrong',
                  [
                    { text: "OK", onPress: () => console.log('done') }
                  ]
                );
              }

            }}
          >
            <Text
              style={checkoutStyles.payText}>
              Pay
            </Text>
          </TouchableOpacity>
        </View>
      }
    </>

  )
}