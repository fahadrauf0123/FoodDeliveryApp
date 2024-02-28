import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS } from '../constants';
import DishRow from '../components/Dishes';
import { useDispatch, useSelector } from 'react-redux';
import * as Icon from 'react-native-feather';
import Cart from '../components/Cart';
import axios from 'axios';
import { baseUrl } from '../env';

const Restaurant = ({ route, navigation }) => {
  const [restaurant, setRestaurant] = React.useState(null);
  const [products, setProducts] = React.useState([]);

  const authToken = useSelector(state => state.auth.authToken);

  const fetchRestaurantsByID = async (resID) => {
    try {
      const res = await axios.get(`${baseUrl}/restaurant/getRestaurant/${resID}`, {
        headers: {
          Authorization: authToken,
        },
      })
      setRestaurant(res.data.restaurant)
    } catch (error) {
      console.log("error by res fetch ==>", error.response.data)
      ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT)
    }
  }

  const fetchProducts = async (resID) => {
    try {
      const res = await axios.get(`${baseUrl}/restaurant/getProducts/${resID}`, {
        headers: {
          Authorization: authToken,
        },
      })
      setProducts(res.data.products)
    } catch (error) {
      console.log("error by product fetch ==>", error.response.data)
      ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT)
      setRestaurants([])
    }
  }

  let { restaurantID, location } = route.params;

  useEffect(() => {
    fetchRestaurantsByID(restaurantID)
    fetchProducts(restaurantID)
  }, [restaurantID])

  return (
    <View>
      <ScrollView>
        <Image className="w-full h-72" source={{ uri: restaurant?.logo }} />
        <TouchableOpacity
          className="absolute top-3 left-4 bg-gray-50 p-2 rounded-full shadow"
          onPress={() => navigation.goBack()}>
          <Icon.ArrowLeft strokeWidth={3} stroke={COLORS.primary} />
        </TouchableOpacity>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6">
          <View className="px-5">
            <Text className="text-3xl font-bold text-black">{restaurant?.name}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require('../assets/images/fullStar.png')}
                  className="h-4 w-4"
                />
                <Text className="text-xs">
                  <Text className="text-green-700">4.1</Text>
                  <Text className="text-gray-700"> - (4.6k review)</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="pb-36 bg-white">
          <Text className="text-black px-4 py-4 text-2xl font-bold">Menu</Text>
          {products?.map(menu => {
            return (
              <DishRow
                item={{ ...menu }}
                key={menu._id}
              />
            );
          })}
        </View>
        <Cart />
      </ScrollView>
    </View>
  );
};

export default Restaurant;
