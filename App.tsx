import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Restaurant from './screens/Restaurant';
import OrderDelivery from './screens/OrderDelivery';
import Tabs from './navigation/Tabs';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
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
      </PersistGate>
    </Provider>
  );
};

export default App;
