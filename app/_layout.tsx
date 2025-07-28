import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import LoginScreen from '@/app/screens/Authentication/LoginScreen';
import RegisterScreen from '@/app/screens/Authentication/RegisterScreen';
import SettingsScreen from '@/app/screens/Authentication/SettingsScreen';
import Homepage from '@/app/screens/Core/Homepage';
import { useColorScheme } from '@/hooks/useColorScheme';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}