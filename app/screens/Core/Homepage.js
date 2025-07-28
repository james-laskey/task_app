import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import SettingsScreen from '../Authentication/SettingsScreen';
import HomepageStack from '../Stacks/HomepageStack';
import ProfileScreen from '../User/ProfileScreen';

import { Ionicons } from '@expo/vector-icons'; // Install with: npm install @expo/vector-icons

const Tab = createBottomTabNavigator();

export default function Homepage() {
  // Fullscreen effect
 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4285F4',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          paddingBottom: 50,
          height: 60
        },
        headerShown: false
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomepageStack}
        initialParams={{ 
          apiEndpoint: "http://localhost:3000/getUncompletedTasks?school=University%20of%20California%3A%20Berkeley"
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}




const styles = StyleSheet.create({
  // Your styles here
});