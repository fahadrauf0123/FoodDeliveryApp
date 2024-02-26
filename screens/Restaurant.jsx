import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import {useRoute} from '@react-navigation/native';
import DishRow from '../components/Dishes';
import {useDispatch} from 'react-redux';
import * as Icon from 'react-native-feather';
import {setRestaurant} from '../slices/restaurantSlice';
import Cart from '../components/Cart';
// import Cart from '../components/Cart';
const Restaurant = ({route, navigation}) => {
  // const [restaurant, setRestaurant] = React.useState(null);
  // const [currentLocation, setCurrentLocation] = React.useState(null);
  // const [orderItems, setOrderItems] = React.useState([]);

  // React.useEffect(() => {
  //   let {item, currentLocation} = route.params;

  //   setRestaurant(item);
  //   setCurrentLocation(currentLocation);
  // });
  let item = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    if (item && item.id) {
      dispatch(setRestaurant({...item}));
    }
  }, []);

  return (
    <View>
      <ScrollView>
        <Image className="w-full h-72" source={item.photo} />
        <TouchableOpacity
          className="absolute top-3 left-4 bg-gray-50 p-2 rounded-full shadow"
          onPress={() => navigation.goBack()}>
          <Icon.ArrowLeft strokeWidth={3} stroke={COLORS.primary} />
        </TouchableOpacity>
        <View
          style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
          className="bg-white -mt-12 pt-6">
          <View className="px-5">
            <Text className="text-3xl font-bold text-black">{item.name}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require('../assets/images/fullStar.png')}
                  className="h-4 w-4"
                />
                <Text className="text-xs">
                  <Text className="text-green-700">{item.rating}</Text>
                  <Text className="text-gray-700"> (4.6k review)</Text> ·{' '}
                  {/* <Text className="font-semibold text-gray-700">{type}</Text> */}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="pb-36 bg-white">
          <Text className="text-black px-4 py-4 text-2xl font-bold">Menu</Text>
          {item.menus.map(menu => {
            return (
              <DishRow
                item={{...menu}}
                key={menu.menuId}
                name={menu.name}
                description={menu.description}
                price={menu.price}
                image={menu.photo}
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
