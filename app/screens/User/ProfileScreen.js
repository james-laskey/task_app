// ProfileScreen.js
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import defaultStyles from '../defaultStyles';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('info');
  
  // Mock profile data
  const profile = {
    firstName: 'Default',
    lastName: 'User',
    email: 'defaultuser@berkeley.edu',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate DIYer and pet lover. Always up to help out!',
    school: 'University of California: Berkeley'
  };

  // Mock activities data
  const activitiesData = [
    { 
      id: '1', 
      avatar: { uri: 'https://randomuser.me/api/portraits/women/1.jpg' }, 
      title: 'Math Tutoring Help', 
      subtitle: 'Completed on Jan 15, 2025', 
      price: '$25', 
      completed: true 
    },
    { 
      id: '2', 
      avatar: { uri: 'https://randomuser.me/api/portraits/men/2.jpg' }, 
      title: 'Haircut Service', 
      subtitle: 'In Progress', 
      price: '$50', 
      completed: false 
    },
    { 
      id: '3', 
      avatar: { uri: 'https://randomuser.me/api/portraits/women/3.jpg' }, 
      title: 'Pet Walking', 
      subtitle: 'Completed on Jan 10, 2025', 
      price: '$15', 
      completed: true 
    }
  ];

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 4; i++) {
      stars.push(<FontAwesome key={i} name="star" size={24} color="#FAD867" />);
    }
    stars.push(<FontAwesome key="half" name="star-half-full" size={24} color="#FAD867" />);
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  const renderActivityCard = ({ item }) => (
    <View style={defaultStyles.cardContainer}>
      <Image source={item.avatar} style={defaultStyles.cardAvatar} />
      <View style={defaultStyles.cardTextContainer}>
        <Text style={defaultStyles.cardTitle}>{item.title}</Text>
        <Text style={defaultStyles.cardSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={defaultStyles.cardPrice}>{item.price}</Text>
      <View
        style={[
          defaultStyles.cardIcon,
          item.completed ? defaultStyles.cardIconSuccess : defaultStyles.cardIconDisabled
        ]}
      >
        <FontAwesome name={item.completed ? 'check' : 'clock-o'} size={16} color="#fff" />
      </View>
    </View>
  );

  const renderInfo = () => (
    <View style={styles.infoContainer}>
      {[
        ['First Name', profile.firstName],
        ['Last Name', profile.lastName],
        ['Email', profile.email],
        ['Phone', profile.phone],
        ['School', profile.school],
        ['Bio', profile.bio]
      ].map(([label, value]) => (
        <View key={label} style={styles.infoItem}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value || 'Not provided'}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={defaultStyles.defaultButton}
        onPress={() => navigation.navigate('Settings', { profile })}
      >
        <Text style={defaultStyles.defaultButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={defaultStyles.defaultScrollContainer}>
      <ImageBackground
        source={require('../../../assets/UC BERKELEY.jpg')}
        style={styles.headerBackground}
      >
        <View style={styles.headerOverlay}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>
            {profile.firstName} {profile.lastName}
          </Text>
          {renderStars()}
          <Text style={styles.ratingText}>4.5 (24 reviews)</Text>
        </View>
      </ImageBackground>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'info' && styles.activeTab]}
          onPress={() => setActiveTab('info')}
        >
          <FontAwesome name="info-circle" size={20} color={activeTab === 'info' ? '#002676' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'activity' && styles.activeTab]}
          onPress={() => setActiveTab('activity')}
        >
          <FontAwesome name="history" size={20} color={activeTab === 'activity' ? '#002676' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>Activity</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrapper}>
        {activeTab === 'info' ? (
          <ScrollView style={styles.scrollContent}>
            {renderInfo()}
          </ScrollView>
        ) : (
          <FlatList
            data={activitiesData}
            keyExtractor={item => item.id}
            renderItem={renderActivityCard}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBackground: { width: '100%', height: 280 },
  headerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 12
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  },
  ratingContainer: { flexDirection: 'row', marginBottom: 4 },
  ratingText: {
    color: '#fff',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  activeTab: {
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#002676'
  },
  tabText: { fontSize: 16, color: '#666', fontWeight: '500' },
  activeTabText: { color: '#002676', fontWeight: '600' },
  contentWrapper: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flex: 1 },
  infoContainer: { padding: 20 },
  infoItem: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  infoLabel: { fontSize: 14, color: '#666', marginBottom: 6, fontWeight: '500' },
  infoValue: { fontSize: 16, color: '#111', fontWeight: '400' }
});
