import React from 'react';
import './global.css';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Restaurant from './screens/Restaurant';
import Tabs from './navigation/Tabs';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View} from 'react-native';
import CartScreen from './screens/CartScreen';
import OrderPreparing from './screens/OrderPreparing';
import OrderDelivery from './screens/OrderDelivery';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen
              name="CartScreen"
              component={CartScreen}
              options={{headerShown: false, presentation: 'modal'}}
            />
            <Stack.Screen
              name="OrderPreparing"
              component={OrderPreparing}
              options={{headerShown: false, presentation: 'modal'}}
            />
            <Stack.Screen
              name="OrderDelivery"
              component={OrderDelivery}
              options={{headerShown: false}}
            />
            {/* <Stack.Screen
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
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const Main = () => (
  <Drawer.Navigator initialRouteName="HomeTabs">
    <Drawer.Screen
      name="HomeTabs"
      component={Tabs}
      options={{headerShown: true}}
    />
    <Drawer.Screen name="Restaurant" component={Restaurant} />
    <Drawer.Screen name="OrderDelivery" component={OrderDelivery} />
    {/* Add more drawer screens if needed */}
  </Drawer.Navigator>
);

export default App;
