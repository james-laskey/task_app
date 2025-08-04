import { useEffect, useState } from 'react';
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Config from 'react-native-config';
import { SQIPCore } from 'react-native-square-in-app-payments';
import defaultStyles from '../defaultStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    elevation: 2,
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  offerText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    marginLeft: 5,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  acceptedLabel: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#2e7d32',
},
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default function TaskOffersPage({ navigation, route, task }) {
  
  const [uid, setUid] = useState(null);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [acceptedOffer, setAcceptedOffer] = useState(null);

  useEffect(() => {
    SQIPCore.setSquareApplicationId(Config.SQUARE_APP_ID); // Replace with your actual App ID\
    
    }, []);


  useEffect(() => {
    
  }, [task]);

  const handleCardPress = (userId) => {
    navigation.navigate('UserProfile', { userId });
  };

  const confirmRemoveOffer = (offer) => {
    setSelectedOffer(offer);
    setShowDeleteModal(true);
  };

  const confirmAcceptOffer = (offer) => {
    //add api logic to accept offer
    setSelectedOffer(offer);
    setShowAcceptModal(true);
  };

  const handleRemoveConfirmed = () => {
    setOffers((prevOffers) => prevOffers.filter((o) => o.id !== selectedOffer.id));
    setShowDeleteModal(false);
    setSelectedOffer(null);
  };

  const handleAcceptConfirmed = () => {
    console.log('Accepted offer:', selectedOffer);
    // Add server logic here
    setShowAcceptModal(false);
    setSelectedOffer(null);
  };



  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={defaultStyles.defaultTitle}>Offers</Text>

      {task.offers?.map((offer) => (
        <View key={`${offer.user}-${offer.datetimestamp}`} style={styles.card}>
            <TouchableHighlight
            underlayColor="#ddd"
            onPress={() => handleCardPress(offer.user)}
            style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
            >
            <>
                <Image
                source={offer.profileImage || require('../../../assets/defaultUser.png')}
                style={styles.profileImage}
                />
                <View style={styles.cardTextContainer}>
                <Text style={styles.nameText}>{offer.name}</Text>
                <Text style={styles.offerText}>Offer: ${offer.offer}</Text>
                </View>
            </>
            </TouchableHighlight>

            <View style={styles.actionButtons}>
            <TouchableHighlight
                style={styles.actionButton}
                underlayColor="#bbb"
                onPress={() => confirmRemoveOffer(offer)}
            >
                <Text style={[styles.actionText, { color: 'red' }]}>✕</Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.actionButton}
                underlayColor="#bbb"
                onPress={() => confirmAcceptOffer(offer)}
            >
                <Text style={[styles.actionText, { color: 'green' }]}>✓</Text>
            </TouchableHighlight>
            </View>
        </View>
        ))}

      {/* Delete Confirmation Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to remove this offer from {selectedOffer?.name}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableHighlight
                style={defaultStyles.defaultButtonAlt}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={defaultStyles.defaultButtonText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={defaultStyles.defaultButton}
                onPress={handleRemoveConfirmed}
              >
                <Text style={defaultStyles.defaultButtonText}>Remove</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      {/* Accept Confirmation Modal */}
      <Modal visible={showAcceptModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Accept offer of ${selectedOffer?.offer} from {selectedOffer?.name}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableHighlight
                style={defaultStyles.defaultButtonAlt}
                onPress={() => setShowAcceptModal(false)}
              >
                <Text style={defaultStyles.defaultButtonText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={defaultStyles.defaultButton}
                onPress={handleAcceptConfirmed}
              >
                <Text style={defaultStyles.defaultButtonText}>Accept</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}