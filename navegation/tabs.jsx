import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home'
import ProfileScreen from '../screens/profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator     screenOptions = {({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'ios-list' : 'ios-list';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
);
}
export default Tabs;