import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import defaultStyles from "../defaultStyles";
import Mapper from './MapView';

const Drawer = createDrawerNavigator();

function Sidebar({ navigation }) {
  return (
    <View style={styles.sidebar}>
      <View style={styles.sidebarContainer}>
        <Text style={styles.title}>Task-U</Text>
        <Button title="x" color='black' onPress={() => navigation.closeDrawer()} style={defaultStyles.defaultButton} /> 
      </View>
      <Pressable onPress={() => navigation.navigate('Home')} style={defaultStyles.defaultSidebarButton}><Text style={defaultStyles.defaultTitle}>Home</Text></Pressable>
      <Pressable onPress={() => navigation.navigate('Home')} style={defaultStyles.defaultSidebarButton}><Text style={defaultStyles.defaultTitle}>Profile</Text></Pressable>
      <Pressable onPress={() => navigation.navigate('Home')} style={defaultStyles.defaultSidebarButton}><Text style={defaultStyles.defaultTitle}>Settings</Text></Pressable>
      <Pressable onPress={() => navigation.navigate('Home')} style={defaultStyles.defaultSidebarButton}><Text style={defaultStyles.defaultTitle}>About</Text></Pressable>
      {/* <Button title="Profile" onPress={() => navigation.navigate('Profile')} />  
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Home" onPress={() => navigation.navigate('Home')} />   */}
    </View>
  );
}

export default function Homepage() {
  return (
      <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
        <Drawer.Screen name="Home" component={Mapper} />
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  sidebar: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  sidebarContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});