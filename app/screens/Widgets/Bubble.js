// Example Bubble.js implementation
import { StyleSheet, View } from 'react-native';

const Bubble = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    borderRadius: 10,
    padding: 5,
    
  }
});

export default Bubble;