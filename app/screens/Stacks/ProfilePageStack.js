import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../User/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { user } = useUser();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileTabs"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}