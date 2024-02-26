import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {COLORS} from '../constants';
import * as Icon from 'react-native-feather';
import {useSelector, useDispatch} from 'react-redux';
import {selectRestaurant} from '../slices/restaurantSlice';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '../slices/cartSlice';

const CartScreen = ({route, navigation}) => {
  const restaurant = useSelector(selectRestaurant);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupedItems] = useState([]);

  const dispatch = useDispatch();
  const deliveryFee = 2;
  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item.menuId]) {
        group[item.menuId].push(item);
      } else {
        group[item.menuId] = [item];
      }
      return group;
    }, {});
    setGroupedItems(items);
  }, [cartItems]);
  return (
    <View className=" bg-white flex-1">
      {/* top button */}
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          style={{backgroundColor: COLORS.primary}}
          onPress={navigation.goBack}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-2xl text-black">
            Your cart
          </Text>
          <Text className="text-center text-gray-500">{restaurant?.name}</Text>
        </View>
      </View>

      {/* delivery time */}
      <View
        style={{backgroundColor: COLORS.bgColor(0.2)}}
        className="flex-row px-4 items-center">
        <Image
          source={require('../assets/images/bikeGuy.png')}
          className="w-20 h-20 rounded-full"
        />
        <Text className="flex-1 pl-4 text-black">Deliver in 20-30 minutes</Text>
        <TouchableOpacity>
          <Text
            style={{opacity: 0.9, color: COLORS.primary}}
            className="font-bold">
            Change
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white pt-5"
        contentContainerStyle={{
          paddingBottom: 50,
        }}>
        {Object.entries(groupedItems).map(([key, items]) => {
          let menu = items[0];
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
              <Text
                style={{color: COLORS.red, padding: 10}}
                className="font-bold">
                {items.length} x
              </Text>
              <Image className="h-14 w-14 rounded-full" source={menu.photo} />
              <Text className="flex-1 font-bold text-gray-700 text-sm px-4">
                {menu.name}
              </Text>
              <Text className="font-semibold text-black text-sm px-4">
                ${menu.price}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart({id: menu.menuId}))}
                className="p-1 rounded-full"
                style={{backgroundColor: COLORS.primary}}>
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* totals */}
      <View
        style={{backgroundColor: COLORS.bgColor(0.2)}}
        className=" p-6 px-8 rounded-t-3xl space-y-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-700 py-2">Subtotal</Text>
          <Text className="text-gray-700 py-2">$ {cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 py-2">Delivery Fee</Text>
          <Text className="text-gray-700 py-2">$ {deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-extrabold text-black py-2">Order Total</Text>
          <Text className="font-extrabold text-black py-2">
            $ {deliveryFee + cartTotal}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{backgroundColor: COLORS.primary, opacity: 0.8}}
            onPress={() => navigation.navigate('OrderPreparing')}
            className="p-3 rounded-full">
            <Text className="text-white text-center font-bold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
