import React, { useEffect, useState } from 'react';
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


const RequestModal = ({ visible, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [offer, setOffer] = useState('');
  const [address, setAddress] = useState('');
  const [formOfPayment, setFormOfPayment] = useState('tasku');

  useEffect(() => {
    SQIPCore.setSquareApplicationId(Config.SQUARE_APP_ID); // Replace with your actual App ID
  }, []);

  const handleSubmit = () => {
    const task = { title, description, offer, address, formOfPayment };
    console.log('Task accepted', task);
    // You can add validation or API calls here
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
                Make a New Task Request
              </Text>

              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter title"
                value={title}
                onChangeText={setTitle}
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
              />

              <Text style={styles.label}>Offer</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter offer amount or details"
                value={offer}
                onChangeText={setOffer}
              />

              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter address"
                value={address}
                onChangeText={setAddress}
              />

              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={defaultStyles.defaultButton}
                  onPress={handleSubmit}
                >
                  <Text style={defaultStyles.defaultButtonText}>Submit</Text>
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

export default RequestModal;

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