import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Keychain from 'react-native-keychain';
import { useUser } from '../../UserContext';
import defaultStyles from '../defaultStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('defaultuser@berkeley.edu');
  const [password, setPassword] = useState('Tasku2025!');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();


  const handleLogin = async () => {
    setIsLoading(true);
    
    try {
      
      const API_URL = 'http://localhost:3000/login'
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error(`Login failed with status: ${response.status}`);
      }

      const data = await response.json();
      setUser({ uid: data.uid, firstname: data.firstname, lastname: data.lastname });
      console.log('Login successful:', data);
      
      if (!data.token) {
        throw new Error('No authentication token received');
      }

      // Store token securely
      await Keychain.setGenericPassword(
        'auth_token', // can be any string as username
        data.token,   // the actual JWT token
        {
          service: 'net.task-u.app.service', // optional but recommended
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED // iOS only
        }
      );

      navigation.navigate('Homepage');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error.message || 'Could not log in. Please try again.'
      );
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <Image source={require('../../../assets/logo.png')} />
      <Text style={defaultStyles.defaultTitleAlt}>Welcome!</Text>
      
      <TextInput 
        style={defaultStyles.defaultInput} 
        placeholder="Email"
        placeholderTextColor="#222222"
        value={email} 
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput 
        style={defaultStyles.defaultInput} 
        placeholder="Password" 
        placeholderTextColor="#222222"
        value={password} 
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableHighlight 
        style={[
          defaultStyles.defaultButton, 
          isLoading && { backgroundColor: '#cccccc' }
        ]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableHighlight>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' }
});