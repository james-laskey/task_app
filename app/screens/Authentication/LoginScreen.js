import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import defaultStyles from '../defaultStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('defaultuser@berkeley.edu');
  const [password, setPassword] = useState('Tasku2025!');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Skip login - navigate directly to Homepage
      navigation.navigate('Homepage');
    } catch (error) {
      Alert.alert(
        'Navigation Failed',
        error.message || 'Could not navigate. Please try again.'
      );
      console.error('Navigation error:', error);
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