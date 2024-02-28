import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants';
import * as Icon from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { removeFromCart, selectCartItemsById } from '../slices/cartSlice';

const DishRow = ({ item }) => {
  const dispatch = useDispatch();
  const totalItems = useSelector(state =>
    selectCartItemsById(state, item._id),
  );

  const handleIncrease = () => {
    dispatch(addToCart({ ...item }));
  };
  const handleDecrease = () => {
    dispatch(removeFromCart({ id: item._id }));
  };

  return (
    <>
      <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
        <Image
          className="rounded-3xl"
          style={{ height: 100, width: 100 }}
          source={{ uri: item.mediaUrl }}
        />
        <View className="flex flex-1 space-y-3">
          <View className="pl-3">
            <Text className="text-sm text-black font-bold px-4">
              {item.name}
            </Text>
            <Text className="pl-10 text-gray-700 px-4">{item.desc}</Text>
          </View>
          <View className="flex-row pl-3 justify-between items-center">
            <View className="flex-row items-center">
              {item.discounted ?
                <View className='flex-row items-center'>
                  <Text className="text-gray-400 text-lg font-bold pl-4" style={{
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                  }}>
                    Rs. {item.price}
                  </Text>
                  <Text className="text-gray-700 text-lg font-bold pl-4">
                    Rs. {item.discountedPrice}
                  </Text>
                </View>
                :
                <Text className="text-gray-700 text-lg font-bold pl-4">
                  Rs. {item.price}
                </Text>
              }
            </View>
            <View className="flex-row items-center">
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{ backgroundColor: COLORS.primary }}
                onPress={handleDecrease}
                disabled={!totalItems}>
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
              <Text className="text-black px-4">
                {totalItems?.quantity || 0}
              </Text>
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{ backgroundColor: COLORS.primary }}
                onPress={handleIncrease}>
                <Icon.Plus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default DishRow;
