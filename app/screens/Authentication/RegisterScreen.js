// app/screens/Authentication/RegisterScreen.js

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import defaultStyles from '../defaultStyles'; // adjust path if needed

export default function RegisterScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    school: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirm: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleRegister = () => {
    const { school, firstName, lastName, email, password, confirm } = form;
    if (!school || !firstName || !lastName || !email || !password) {
      return Alert.alert('Missing Information', 'Please fill in all required fields');
    }
    if (password !== confirm) {
      return Alert.alert('Password Mismatch', 'Your passwords must match');
    }
    setLoading(true);
    // TODO: call your /register API here
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Welcome to Task‑U!',
        'Your account has been created.',
        [{ text: 'Get Started', onPress: () => navigation.replace('Homepage') }]
      );
    }, 800);
  };

  const handleSocial = provider => {
    Alert.alert('Social Sign‑Up', `Continue with ${provider}`);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={20}
    >
      {/* Logo */}
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* School Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#fff" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Schools..."
          placeholderTextColor="#eee"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
      </View>

      {/* Form Fields */}
      <TextInput
        style={[defaultStyles.defaultInput, styles.input]}
        placeholder="School or University"
        placeholderTextColor="#666"
        value={form.school}
        onChangeText={t => handleChange('school', t)}
      />

      <View style={styles.row}>
        <TextInput
          style={[defaultStyles.defaultInput, styles.input, styles.half]}
          placeholder="First Name"
          placeholderTextColor="#666"
          value={form.firstName}
          onChangeText={t => handleChange('firstName', t)}
        />
        <TextInput
          style={[defaultStyles.defaultInput, styles.input, styles.half]}
          placeholder="Last Name"
          placeholderTextColor="#666"
          value={form.lastName}
          onChangeText={t => handleChange('lastName', t)}
        />
      </View>

      <TextInput
        style={[defaultStyles.defaultInput, styles.input]}
        placeholder="School Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={t => handleChange('email', t)}
      />

      <TextInput
        style={[defaultStyles.defaultInput, styles.input]}
        placeholder="Phone Number"
        placeholderTextColor="#666"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={t => handleChange('phone', t)}
      />

      <TextInput
        style={[defaultStyles.defaultInput, styles.input]}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={form.password}
        onChangeText={t => handleChange('password', t)}
      />

      <TextInput
        style={[defaultStyles.defaultInput, styles.input]}
        placeholder="Password Match"
        placeholderTextColor="#666"
        secureTextEntry
        value={form.confirm}
        onChangeText={t => handleChange('confirm', t)}
      />

      {/* Main CTA */}
      <TouchableHighlight
        style={[
          defaultStyles.defaultButton,
          styles.registerButton,
          loading && styles.disabledButton
        ]}
        onPress={handleRegister}
        underlayColor="#001f4d"
        disabled={loading}
      >
        <Text style={defaultStyles.defaultButtonText}>
          {loading ? 'Registering…' : 'Register'}
        </Text>
      </TouchableHighlight>

      {/* Or sign up with */}
      <Text style={styles.orText}>Or register with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => handleSocial('Google')}>
          <Ionicons name="logo-google" size={36} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocial('Outlook')}>
          <Ionicons name="logo-windows" size={36} color="#0078D4" />
        </TouchableOpacity>
      </View>

      {/* Cancel */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel Registration</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f0f0f0'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20
  },

  // search bar
  searchBar: {
    width: '90%',
    height: 40,
    backgroundColor: '#999',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#fff'
  },

  // inputs
  input: {
    width: '90%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  half: {
    width: '48%'
  },

  // register button
  registerButton: {
    width: '90%',
    marginTop: 8
  },
  disabledButton: {
    backgroundColor: '#555'
  },

  // social
  orText: {
    marginTop: 20,
    color: '#666'
  },
  socialContainer: {
    flexDirection: 'row',
    marginVertical: 12,
    justifyContent: 'space-around',
    width: '50%'
  },

  // cancel
  cancelText: {
    marginTop: 20,
    color: '#333',
    textDecorationLine: 'underline'
  },

  // login link
  loginButton: {
    marginTop: 12,
    paddingVertical: 8
  },
  loginText: {
    color: '#0066cc',
    fontSize: 16,
    fontWeight: '500'
  }
});
