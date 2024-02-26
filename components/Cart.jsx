import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../constants';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectCartItems, selectCartTotal} from '../slices/cartSlice';
const Cart = () => {
  const navigation = useNavigation();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  if (!cartItems.length) return;
  return (
    <View className="bg-white">
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 10,
          backgroundColor: COLORS.primary,
          margin: 10,
          zIndex: 50,
        }}
        onPress={() => navigation.navigate('CartScreen', {})}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg">
        <View
          className="p-2 px-4 rounded-full"
          style={{backgroundColor: 'rgba(255,255,255,0.3)', margin: 2}}>
          <Text className="font-extrabold text-white text-lg">
            {cartItems.length}
          </Text>
        </View>

        <Text className="flex-1 text-center font-extrabold text-white text-lg">
          View Cart
        </Text>
        <View style={{margin: 2}}>
          <Text className="font-extrabold px-4 text-white text-lg">
            $ {cartTotal}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
