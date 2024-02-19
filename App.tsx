import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Restaurant from './screens/Restaurant';
import OrderDelivery from './screens/OrderDelivery';
import Tabs from './navigation/Tabs';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'HomeTabs'}>
        <Stack.Screen
          name="HomeTabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Restaurant"
          component={Restaurant}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderDelivery"
          component={OrderDelivery}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
