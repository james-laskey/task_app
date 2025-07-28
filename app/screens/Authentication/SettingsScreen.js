// SettingsScreen.js
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import defaultStyles from '../defaultStyles';

export default function SettingsScreen({ route, navigation }) {
  const { profile } = route.params || {};
  
  const [form, setForm] = useState({
    firstName: profile?.firstName || 'Default',
    lastName: profile?.lastName || 'User',
    email: profile?.email || 'defaultuser@berkeley.edu',
    phone: profile?.phone || '+1 (555) 123-4567',
    school: profile?.school || 'University of California: Berkeley',
    bio: profile?.bio || 'Passionate DIYer and pet lover. Always up to help out!'
  });

  const handleChange = (field, val) =>
    setForm(f => ({ ...f, [field]: val }));

  const handleSave = () => {
    Alert.alert(
      'Success!', 
      'Profile updated successfully (Demo Mode)',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => navigation.popToTop() }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={defaultStyles.defaultTitle}>Profile Settings</Text>

      {
        [
          ['First Name', 'firstName'],
          ['Last Name', 'lastName'],
          ['Email', 'email'],
          ['Phone', 'phone'],
          ['School', 'school'],
          ['Bio', 'bio']
        ].map(([label, key]) => (
          <View key={key} style={styles.formGroup}>
            <Text style={defaultStyles.defaultLabel}>{label}</Text>
            <TextInput
              style={[
                defaultStyles.defaultInput,
                key === 'bio' && { height: 100, textAlignVertical: 'top' }
              ]}
              multiline={key === 'bio'}
              value={form[key]}
              onChangeText={t => handleChange(key, t)}
              placeholder={`Enter ${label.toLowerCase()}`}
              editable={key !== 'email'}
            />
            {key === 'email' && (
              <Text style={styles.helperText}>Email cannot be changed</Text>
            )}
          </View>
        ))
      }

      <TouchableHighlight
        style={defaultStyles.defaultButton}
        onPress={handleSave}
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

      <View style={styles.demoNotice}>
        <Text style={styles.demoText}>
          🎭 Demo Mode: Changes won't be saved to server
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  formGroup: {
    marginBottom: 20
  },
  helperText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontStyle: 'italic'
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#ff4444'
  },
  logoutText: {
    color: 'white'
  },
  demoNotice: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeaa7'
  },
  demoText: {
    color: '#856404',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500'
  }
});
