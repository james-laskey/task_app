// navigation/HomeStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ApiMapAnnotations from '../Core/MapAnnotations';
import TaskInfoPage from '../screens/Core/TaskInfoPage';
import TaskOffersPage from '../screens/Core/TaskOffersPage';
import ConfirmationPage from '../screens/Widgets/ConfirmationPage';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ApiMapAnnotations} options={{ title: 'Home' }} />
      <Stack.Screen name="TaskInfo" component={TaskInfoPage} options={{ title: 'Task Details' }} />
      <Stack.Screen name="TaskOffers" component={TaskOffersPage} options={{ title: 'Task Offers' }} />
      <Stack.Screen name="Confirmation" component={ConfirmationPage} options={{ title: 'Payment Confirmation' }} />
    </Stack.Navigator>
  );
}