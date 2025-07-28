// app/screens/Rankings/SchoolRankingsScreen.js

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import defaultStyles from '../defaultStyles';

// Mock data for demo
const mockRankings = [
  { school: 'UC Berkeley',         total_earned: '158945.00' },
  { school: 'Stanford University', total_earned: '123800.50' },
  { school: 'UCLA',                total_earned: '112507.75' },
  { school: 'USC',                 total_earned: '98500.00'  },
  { school: 'UCSF',                total_earned: '86403.30'  }
];

export default function SchoolRankingsScreen({ navigation }) {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRankings(mockRankings);
      setLoading(false);
    }, 800);
  }, []);

  const total = rankings.reduce(
    (sum, row) => sum + parseFloat(row.total_earned),
    0
  );

  const medalColor = idx =>
    idx === 0 ? '#FAD867' :
    idx === 1 ? '#C0C0C0' :
    idx === 2 ? '#CD7F32' : 'transparent';

  // Create a fallback avatar with school initials
  const getSchoolInitials = (schoolName) => {
    return schoolName
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const renderCard = ({ item, index }) => (
    <View style={defaultStyles.cardContainer}>
      <View style={styles.logoWrapper}>
        <View style={styles.cardAvatar}>
          <Text style={styles.avatarText}>
            {getSchoolInitials(item.school)}
          </Text>
        </View>
        {index < 3 && (
          <MaterialIcons
            name="emoji-events"
            size={28}
            color={medalColor(index)}
            style={styles.medalIcon}
          />
        )}
      </View>
      <View style={defaultStyles.cardTextContainer}>
        <Text style={defaultStyles.cardTitle}>{item.school}</Text>
        <Text style={defaultStyles.cardSubtitle}>Total earned</Text>
      </View>
      <Text style={defaultStyles.cardPrice}>${item.total_earned}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#002676" />
      </View>
    );
  }

  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color="#002676" />
        </Pressable>
        <Text style={styles.headerTitle}>Task‑U School Rankings</Text>
        <Text style={styles.headerTotal}>Total Payments: ${total.toLocaleString()}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable style={[styles.tab, styles.tabInactive]}>
          <Ionicons name="information-circle-outline" size={24} color="#888" />
        </Pressable>
        <Pressable style={[styles.tab, styles.tabActive]}>
          <Ionicons name="time-outline" size={24} color="#fff" />
        </Pressable>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Top School</Text>

      {/* Highlight #1 */}
      {rankings.length > 0 && (
        <View style={styles.highlight}>
          <Text style={styles.highlightRank}>#1</Text>
          <View style={styles.highlightLogo}>
            <Text style={styles.highlightLogoText}>
              {getSchoolInitials(rankings[0].school)}
            </Text>
          </View>
          <MaterialIcons name="emoji-events" size={48} color="#FAD867" />
        </View>
      )}

      {/* List */}
      <FlatList
        data={rankings}
        keyExtractor={r => r.school}
        renderItem={renderCard}
        contentContainerStyle={{ padding:16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex:1, justifyContent:'center', alignItems:'center' },

  header: {
    padding:16,
    backgroundColor:'#fff',
    borderBottomColor:'#eee',
    borderBottomWidth:1
  },
  back: { position:'absolute', left:16, top:16, zIndex: 10 },
  headerTitle: {
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold',
    color:'#002676',
    marginTop: 24
  },
  headerTotal: {
    textAlign:'center',
    fontSize:18,
    fontWeight:'600',
    marginTop:4,
    color:'#018943'
  },

  tabs: { flexDirection:'row', height:48 },
  tab: { flex:1, alignItems:'center', justifyContent:'center' },
  tabActive: { backgroundColor:'#002676' },
  tabInactive: { backgroundColor:'#D0D0D0' },

  sectionTitle: {
    textAlign:'center',
    fontSize:20,
    color:'#FAD867',
    marginVertical:12,
    fontWeight:'bold'
  },

  highlight: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    paddingVertical:16,
    backgroundColor:'#f9f9f9',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16
  },
  highlightRank: { 
    fontSize:32, 
    fontWeight:'bold',
    color:'#002676'
  },
  highlightLogo: { 
    width:80, 
    height:80, 
    borderRadius:40,
    backgroundColor:'#002676',
    justifyContent:'center',
    alignItems:'center'
  },
  highlightLogoText: {
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },

  logoWrapper: { position:'relative', marginRight:12 },
  cardAvatar: { 
    width:64, 
    height:64, 
    borderRadius:32,
    backgroundColor:'#002676',
    justifyContent:'center',
    alignItems:'center'
  },
  avatarText: {
    color:'#fff',
    fontSize:16,
    fontWeight:'bold'
  },
  medalIcon: { position:'absolute', top:-6, left:-6 }
});
