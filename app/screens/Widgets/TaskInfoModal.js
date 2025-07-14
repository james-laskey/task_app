import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import defaultStyles from '../defaultStyles';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  headerContainer: {
    flex: 1,
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333'
  },
  value: {
    fontSize: 16,
    marginTop: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee'
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default function TaskInfoModal({ visible, onClose, task }) {
  if (!task) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <View style={styles.header}>
                <Text style={defaultStyles.defaultTitle}>{task.title}</Text>
                <Image source={require("../../../assets/DefaultCallIcon.png")} style={{'width':25, 'height':25}}/>
              </View>
              
              <View style={styles.header}>
                <View style={styles.headerContainer}>
                  <Image source={require("../../../assets/defaultUser.png")} style={{'width':100, 'height':100}} />
                </View>
                <View style={styles.headerContainer}>
                  <Text style={[defaultStyles.defaultLabel,{'textAlign':'center'}]}>Offer</Text>
                  <Text style={defaultStyles.defaultCurrencyTitleModal}>{"$"+task.offer}</Text>
                </View>
              </View>              

              <Text style={defaultStyles.defaultLabel}>Description</Text>
              <Text style={defaultStyles.defaultText}>{task.description}</Text>

              
              

              <Text style={defaultStyles.defaultLabel}>Address</Text>
              <Text style={defaultStyles.defaultText}>{task.address}</Text>

              <View style={styles.buttonContainer}>
                <TouchableHighlight style={defaultStyles.defaultButtonAlt}
                  onPress={onClose} 
                >
                  <Text style={defaultStyles.defaultButtonText}>Close</Text>
                </TouchableHighlight>
                <TouchableHighlight style={defaultStyles.defaultButton}
                  onPress={() => console.log('Task accepted', task)} 
                >
                  <Text style={defaultStyles.defaultButtonText}>Accept Task</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </View>
        </View>
    </Modal>
  );
}