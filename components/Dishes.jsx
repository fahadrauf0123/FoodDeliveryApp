import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../constants';
import * as Icon from 'react-native-feather';

const DishRow = ({name, description, id, price, image}) => {
  return (
    <>
      <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
        <Image
          className="rounded-3xl"
          style={{height: 100, width: 100}}
          source={image}
        />
        <View className="flex flex-1 space-y-3">
          <View className="pl-3">
            <Text className="text-sm text-black font-bold px-4">{name}</Text>
            <Text className="pl-10 text-gray-700 px-4">{description}</Text>
          </View>
          <View className="flex-row pl-3 justify-between items-center">
            <Text className="text-gray-700 text-lg font-bold px-4">
              ${price}
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{backgroundColor: COLORS.primary}}>
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
              <Text className="text-black px-4">{2}</Text>
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{backgroundColor: COLORS.primary}}>
                {/* <Text>2</Text> */}
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
