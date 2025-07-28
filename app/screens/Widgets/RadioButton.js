// RadioButton.js
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RadioButton = ({ options, selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.option}
          onPress={() => onSelect(option.value)}
        >
          <View style={styles.outerCircle}>
            {selected === option.value && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#555',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});