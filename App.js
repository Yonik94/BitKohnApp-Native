import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import { store } from './app/store';
import { Contact } from './app/screens/Contact.jsx';
import { Register } from './app/screens/Register.jsx';
import { HomeScreen } from './app/screens/HomeScreen.jsx';
import { Transfers } from './app/screens/Transfers';
const Stack = createStackNavigator();
export default function App() {
  let [fontLoaded] = useFonts({
    'Lato-Black': require('./app/assets/fonts/lato/Lato-Black.ttf'),
    'Rubik-Regular': require('./app/assets/fonts/rubik/static/Rubik-Regular.ttf'),
    'Rubik-Black': require('./app/assets/fonts/rubik/static/Rubik-Black.ttf'),
    'Rubik-Medium': require('./app/assets/fonts/rubik/static/Rubik-Medium.ttf'),
    'Rubik-SemiBold': require('./app/assets/fonts/rubik/static/Rubik-SemiBold.ttf'),
  })
  if (!fontLoaded) {
    return <AppLoading />
  } else {
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
}

const styles = StyleSheet.create({

});