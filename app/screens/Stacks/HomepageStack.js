// navigation/HomeStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ApiMapAnnotations from '../Core/MapAnnotations';
import TaskInfoPage from '../Core/TaskInfopage';
import TaskOffersPage from '../Core/TaskOffersPage';
import ConfirmationPage from '../Widgets/ConfirmationPage';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={ApiMapAnnotations} options={{ title: 'Campus',headerShown:false }} />
      <Stack.Screen name="TaskInfo" component={TaskInfoPage} options={{ title: 'Task Details' }} />
      <Stack.Screen name="TaskOffers" component={TaskOffersPage} options={{ title: 'Task Offers' }} />
      <Stack.Screen name="Confirmation" component={ConfirmationPage} options={{ title: 'Payment Confirmation' }} />
    </Stack.Navigator>
  );
}