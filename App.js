import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import loginScreen from "./screens/loginScreen"
import SingupScreen from './screens/SingupScreen';
import CameraScreen from './screens/CameraScreen';
import Tabs from './navegation/tabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="login" component={loginScreen} options={{ headerShown: false }}/>
       <Stack.Screen name={'Singup'} component={SingupScreen}/>
        <Stack.Screen name={'Tabs'} component={Tabs} options={{ headerShown: false }}/>
        <Stack.Screen name={'Camera'} component={CameraScreen} options={{headerShown: true}} />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
