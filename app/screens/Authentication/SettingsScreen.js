import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import defaultStyles from '../defaultStyles';

const SettingsScreen = () => {
  // User data state
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    password: '',
    phone: '+1 (555) 123-4567'
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    Alert.alert('Profile Updated', 'Your changes have been saved successfully');
    // Here you would typically call an API to update the profile
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => console.log('User logged out') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={defaultStyles.defaultTitle}>Profile Settings</Text>
      
      <View style={styles.formGroup}>
        <Text style={defaultStyles.defaultLabel}>Full Name</Text>
        <TextInput
          style={defaultStyles.defaultInput}
          value={userData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={defaultStyles.defaultLabel}>Email</Text>
        <TextInput
          style={defaultStyles.defaultInput}
          value={userData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={defaultStyles.defaultLabel}>Password</Text>
        <TextInput
          style={defaultStyles.defaultInput}
          value={userData.password}
          onChangeText={(text) => handleChange('password', text)}
          placeholder="Enter new password"
          secureTextEntry
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={defaultStyles.defaultLabel}>Phone Number</Text>
        <TextInput
          style={defaultStyles.defaultInput}
          value={userData.phone}
          onChangeText={(text) => handleChange('phone', text)}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableHighlight
        style={defaultStyles.defaultButton}
        onPress={handleSubmit}
        underlayColor="#DDDDDD"
      >
        <Text style={defaultStyles.defaultButtonText}>Save Changes</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={[defaultStyles.defaultButton, styles.logoutButton]}
        onPress={handleLogout}
        underlayColor="#FFDDDD"
      >
        <Text style={[defaultStyles.defaultButtonText, styles.logoutText]}>Logout</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  formGroup: {
    marginBottom: 20
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#ff4444'
  },
  logoutText: {
    color: 'white'
  }
});

export default SettingsScreen;