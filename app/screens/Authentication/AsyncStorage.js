import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (error) {
    console.error('Failed to save token:', error);
  }
};

// Retrieve data
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@auth_token');
    return token;
  } catch (error) {
    console.error('Failed to fetch token:', error);
    return null;
  }
};

// Remove data
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@auth_token');
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};
