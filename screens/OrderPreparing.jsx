import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

const OrderPreparing = ({route, navigation}) => {
  const [restaurant, setRestaurant] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [orderItems, setOrderItems] = React.useState([]);

  React.useEffect(() => {
    let restaurant = route.params?.restaurant;
    let currentLocation = route.params?.currentLocation;

    setRestaurant(restaurant);
    setCurrentLocation(currentLocation);
  });
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OrderDelivery', {
        restaurant: restaurant,
        currentLocation: currentLocation,
      });
    }, 3000);
  }, []);
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image
        source={require('../assets/images/delivery.gif')}
        className="h-80 w-80"
      />
    </View>
  );
};

export default OrderPreparing;
