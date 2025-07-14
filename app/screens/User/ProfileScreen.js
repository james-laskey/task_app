import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import defaultStyles from '../defaultStyles';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Sample profile data
  const profileData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    joinedDate: 'Member since June 2023',
    rating: '4.9 ★ (128 reviews)',
    profilePic: require('../../../assets/defaultUser.png') // Replace with your image path
  };

  // Sample tasks data
  const tasksData = [
    { id: '1', title: 'Fix leaking faucet', offer: '$45', status: 'Completed' },
    { id: '2', title: 'Assemble furniture', offer: '$80', status: 'In Progress' },
    { id: '3', title: 'Pet sitting', offer: '$25/day', status: 'Upcoming' },
  ];

  const renderProfileInfo = () => (
    <View style={defaultStyles.infoContainer}>
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Name</Text>
        <Text style={styles.infoValue}>{profileData.name}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>{profileData.email}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Phone</Text>
        <Text style={styles.infoValue}>{profileData.phone}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Member Since</Text>
        <Text style={styles.infoValue}>{profileData.joinedDate}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Rating</Text>
        <Text style={styles.infoValue}>{profileData.rating}</Text>
      </View>
    </View>
  );

  const renderTasks = () => (
    <FlatList
      data={tasksData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskOffer}>{item.offer}</Text>
          <Text style={[
            styles.taskStatus,
            item.status === 'Completed' && styles.completedStatus,
            item.status === 'In Progress' && styles.inProgressStatus
          ]}>
            {item.status}
          </Text>
        </View>
      )}
    />
  );

  return (
    <ScrollView style={defaultStyles.defaultScrollContainer}>
      {/* Header with Profile Image */}
      <View style={styles.header}>
        <Image 
          source={profileData.profilePic} 
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{profileData.name}</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'profile' && styles.activeTab
          ]}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'profile' && styles.activeTabText
          ]}>
            Profile
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'tasks' && styles.activeTab
          ]}
          onPress={() => setActiveTab('tasks')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'tasks' && styles.activeTabText
          ]}>
            Tasks
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {activeTab === 'profile' ? renderProfileInfo() : renderTasks()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4285F4',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#4285F4',
    backgroundColor: "#CCC"
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#4285F4',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
  },
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskOffer: {
    color: '#4285F4',
    marginBottom: 5,
  },
  taskStatus: {
    fontSize: 14,
    color: '#666',
  },
  completedStatus: {
    color: '#4CAF50',
  },
  inProgressStatus: {
    color: '#FFC107',
  },
});

export default ProfileScreen;