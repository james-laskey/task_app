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
import * as Keychain from 'react-native-keychain';
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

export default function TaskOffersPage({ navigation, route }) {
  const { task } = route.params;
  const [uid, setUid] = useState(null);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [acceptedOffer, setAcceptedOffer] = useState(null);

  useEffect(() => {
    SQIPCore.setSquareApplicationId(Config.SQUARE_APP_ID); // Replace with your actual App ID
    }, []);

  useEffect(() => {
  const fetchAcceptedOffer = async () => {
    if (task.accepted) {
      try {
        // Replace this with your actual API call
        const accepted = {
          id: '2',
          name: 'Bob Smith',
          offer: 80,
          profileImage: require('../../../assets/defaultUser.png'),
          userId: 'user_2',
        };
        setAcceptedOffer(accepted);
      } catch (error) {
        console.error('Error fetching accepted offer:', error);
      }
    }
  };

  fetchAcceptedOffer();
}, [task.accepted]);

  useEffect(() => {
    const fetchUIDAndOffers = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const storedUid = credentials.uid;
          setUid(storedUid);
          console.log('Retrieved UID from Keychain:', storedUid);

          const mockOffers = [
            {
              id: '1',
              name: 'Alice Johnson',
              offer: 75,
              profileImage: require('../../../assets/defaultUser.png'),
              userId: 'user_1',
            },
            {
              id: '2',
              name: 'Bob Smith',
              offer: 80,
              profileImage: require('../../../assets/defaultUser.png'),
              userId: 'user_2',
            },
            {
              id: '3',
              name: 'Charlie Lee',
              offer: 70,
              profileImage: require('../../../assets/defaultUser.png'),
              userId: 'user_3',
            },
          ];

          setOffers(mockOffers);
        } else {
          console.warn('No credentials stored');
        }
      } catch (error) {
        console.error('Keychain error:', error);
      }
    };

    fetchUIDAndOffers();
  }, []);

  const handleCardPress = (userId) => {
    navigation.navigate('UserProfile', { userId });
  };

  const confirmRemoveOffer = (offer) => {
    setSelectedOffer(offer);
    setShowDeleteModal(true);
  };

  const confirmAcceptOffer = (offer) => {
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

  const startCardEntry = async () => {
    try {
        await SQIPCardEntry.startCardEntryFlow(
        { collectPostalCode: false },
        async (cardDetails) => {
            const nonce = cardDetails.nonce;
            console.log('Card nonce:', nonce);

            // Send nonce and amount to your backend
            await fetch('https://your-server.com/process-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nonce,
                amount: acceptedOffer.offer * 100, // Square expects cents
                currency: 'USD',
                taskId: task.id,
                userId: uid,
            }),
            });

            await SQIPCardEntry.completeCardEntry();
        },
        () => {
            console.log('Card entry canceled');
        }
            );
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={defaultStyles.defaultTitle}>Offers for: {task.title}</Text>

        {acceptedOffer && (
        <View style={[styles.card, { backgroundColor: '#e8f5e9' }]}>
            <Image source={acceptedOffer.profileImage} style={styles.profileImage} />
            <View style={styles.cardTextContainer}>
            <Text style={styles.acceptedLabel}>Accepted Offer</Text>
            <Text style={styles.nameText}>{acceptedOffer.name}</Text>
            <Text style={styles.offerText}>Offer: ${acceptedOffer.offer}</Text>
            </View>
            <TouchableHighlight
            style={styles.actionButton}
            underlayColor="#bbb"
            onPress={startCardEntry}
            >
            <Text style={[styles.actionText, { color: 'green' }]}>Pay</Text>
            </TouchableHighlight>
        </View>
        )}

      {offers.map((offer) => (
        <View key={offer.id} style={styles.card}>
          <TouchableHighlight
            underlayColor="#ddd"
            onPress={() => handleCardPress(offer.userId)}
            style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
          >
            <>
              <Image source={offer.profileImage} style={styles.profileImage} />
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