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
// import Login from './screens/Login';
import SignUp from './screens/SignUp';
import {Text, View} from 'react-native';
import CartScreen from './screens/CartScreen';
import OrderPreparing from './screens/OrderPreparing';
import OrderDelivery from './screens/OrderDelivery';

const Stack = createStackNavigator();

const App = () => {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        /> */}
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
      </Stack.Navigator>
    </NavigationContainer>
    //   </PersistGate>
    // </Provider>
  );
};

export default App;
