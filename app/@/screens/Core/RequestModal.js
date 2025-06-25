import React, { Component } from 'react';
import {
    Button,
    Keyboard,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';

  const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Low-opacity background
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

export default class RequestModal extends Component {
  state = {
    description: '',
    offer: '',
    address: '',
    title: ''
  };



  render() {
    const { visible, onClose } = this.props;

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
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter title"
                  value={this.state.title}
                  onChangeText={(text) => this.setState({ title: text })}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter description"
                  value={this.state.description}
                  onChangeText={(text) => this.setState({ description: text })}
                />

                <Text style={styles.label}>Offer</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter offer amount or details"
                  value={this.state.offer}
                  onChangeText={(text) => this.setState({ offer: text })}
                />

                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter address"
                  value={this.state.address}
                  onChangeText={(text) => this.setState({ address: text })}
                />

                <View style={styles.buttonContainer}>
                  <Button title="Submit" onPress={() => console.log(this.state)} />
                  <Button title="Cancel" color="#999" onPress={onClose} />
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}