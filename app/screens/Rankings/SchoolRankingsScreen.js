// app/screens/Rankings/SchoolRankingsScreen.js

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import defaultStyles from '../defaultStyles';

// Change from localhost to your computer's IP address
const API_URL = 'http://10.0.0.67:3000/rankings';

export default function SchoolRankingsScreen({ navigation }) {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}?limit=10`)
      .then(r => r.json())
      .then(json => setRankings(json.rankings))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const total = rankings.reduce((sum, row) => sum + parseFloat(row.total_earned), 0);
  const medalColor = idx =>
    idx === 0 ? '#FAD867' :
    idx === 1 ? '#C0C0C0' :
    idx === 2 ? '#CD7F32' : 'transparent';

  const renderCard = ({ item, index }) => (
    <View style={styles.cardContainer}>
      <View style={styles.logoWrapper}>
        <Image
          source={{ uri: `https://your-logo-service/${item.school}.png` }}
          style={styles.cardAvatar}
        />
        {index < 3 && (
          <MaterialIcons
            name="emoji-events"
            size={24}
            color={medalColor(index)}
            style={styles.medalIcon}
          />
        )}
      </View>
      <View style={defaultStyles.cardTextContainer}>
        <Text style={defaultStyles.cardTitle}>{item.school}</Text>
        <Text style={defaultStyles.cardSubtitle}>Total earned</Text>
      </View>
      <Text style={defaultStyles.cardPrice}>{item.total_earned}$</Text>
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
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.goBack()} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color="#002676" />
        </Pressable>
        <Text style={styles.headerTitle}>Task‑U School Rankings</Text>
        <Text style={styles.headerTotal}>Total Payments: {total}$</Text>
      </View>

      <View style={styles.tabs}>
        <Pressable style={[styles.tab, styles.tabInactive]}>
          <Ionicons name="information-circle-outline" size={24} color="#888" />
        </Pressable>
        <Pressable style={[styles.tab, styles.tabActive]}>
          <Ionicons name="time-outline" size={24} color="#fff" />
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Top School</Text>
      {rankings.length>0 && (
        <View style={styles.highlight}>
          <Text style={styles.highlightRank}>#1</Text>
          <Image
            source={{ uri: `https://your-logo-service/${rankings[0].school}.png` }}
            style={styles.highlightLogo}
          />
          <MaterialIcons name="emoji-events" size={48} color="#FAD867" />
        </View>
      )}

      <FlatList
        data={rankings}
        keyExtractor={r=>r.school}
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
  back: { position:'absolute', left:16, top:16 },
  headerTitle:{
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold',
    color:'#002676'
  },
  headerTotal:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'600',
    marginTop:4
  },
  tabs:{ flexDirection:'row', height:48 },
  tab:{ flex:1, alignItems:'center', justifyContent:'center' },
  tabActive:{ backgroundColor:'#002676' },
  tabInactive:{ backgroundColor:'#D0D0D0' },
  sectionTitle:{
    textAlign:'center',
    fontSize:20,
    color:'#FAD867',
    marginVertical:12
  },
  highlight:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    paddingVertical:16,
    backgroundColor:'#f9f9f9'
  },
  highlightRank:{ fontSize:32, fontWeight:'bold' },
  highlightLogo:{ width:64, height:64, borderRadius:32 },
  cardContainer:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#F7F8FA',
    borderRadius:12,
    padding:12,
    marginBottom:16,
    shadowColor:'#000',
    shadowOffset:{ width:0, height:2 },
    shadowOpacity:0.05,
    shadowRadius:6,
    elevation:3
  },
  logoWrapper:{ position:'relative', marginRight:12 },
  cardAvatar:{ width:64, height:64, borderRadius:32 },
  medalIcon:{ position:'absolute', top:-6, left:-6 }
});
