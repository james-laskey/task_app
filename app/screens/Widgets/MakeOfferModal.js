import { useEffect, useState } from 'react';
import {
    Keyboard,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Config from 'react-native-config';
import { SQIPCore } from 'react-native-square-in-app-payments';
import defaultStyles from '../defaultStyles';

const MakeOfferModal = ({ visible, onClose, task }) => {
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    SQIPCore.setSquareApplicationId(Config.SQUARE_APP_ID);
  }, []);

  const handleSubmitOffer = async () => {
    const offerData = {
      taskId: task.id,
      offer: parseFloat(offerAmount),
      message,
    };
    console.log('Submitting offer:', offerData);
    const API_URL = 'http://localhost:3000/makeOffer'
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offerData })
      });

      if (!response.ok) {
        throw new Error(`Making offer failed with response status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        console.log('Offer submitted successfully:', data);
      }

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <Text style={[defaultStyles.defaultTitle, { textAlign: 'center' }]}>
                Make an Offer for "{task?.title}"
              </Text>

              <Text style={styles.label}>Offer Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your offer (e.g. 50)"
                keyboardType="numeric"
                value={offerAmount}
                onChangeText={setOfferAmount}
              />

              <Text style={styles.label}>Message (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Add a message to the task poster"
                value={message}
                onChangeText={setMessage}
              />

              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={defaultStyles.defaultButton}
                  onPress={handleSubmitOffer}
                >
                  <Text style={defaultStyles.defaultButtonText}>Submit Offer</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={defaultStyles.defaultButtonAlt}
                  onPress={onClose}
                >
                  <Text style={defaultStyles.defaultButtonText}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MakeOfferModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 5
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5
  },
  buttonContainer: {
    marginTop: 20
  }
});