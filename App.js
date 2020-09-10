import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
} from 'react-native';

import { store } from './app/store';
import { Contact } from './app/screens/Contact.jsx';
import { Register } from './app/screens/Register.jsx';
import { HomeScreen } from './app/screens/HomeScreen.jsx';
import { Transfers } from './app/screens/Transfers';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Transfers" component={Transfers} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
});