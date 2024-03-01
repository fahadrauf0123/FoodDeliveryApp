import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { io } from 'socket.io-client';
import { socketUrl } from '../env';
import { useSelector } from 'react-redux';

const OrderPreparing = ({ route, navigation }) => {

  const authToken = useSelector(state => state.auth.authToken);
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const chatSocket = io(`${socketUrl}/?token=${authToken}`);
    setSocket(chatSocket);

    chatSocket.emit(
      'joinRoom',
      {
        roomID: route.params?.orderID,
      },
    );

    chatSocket.emit("orderPlaced", { orderID: route.params?.orderID })

    chatSocket?.on('orderStatus', (status) => {
      console.log(status);
      navigation.navigate('OrderDelivery', {
        orderID: route.params?.orderID,
        socket,
      });
    });
    // setTimeout(() => {
    // }, 3000);
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image
        source={require('../assets/images/delivery.gif')}
        className="h-80 w-80"
      />
      <Text>Your Order is being prepared</Text>
    </View>
  );
};

export default OrderPreparing;
