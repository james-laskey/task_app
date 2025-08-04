import { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableHighlight, UIManager, View } from 'react-native';
import Config from 'react-native-config';
import ImmersiveMode from 'react-native-immersive';
import * as Keychain from 'react-native-keychain';
import { SQIPCardEntry, SQIPCore } from 'react-native-square-in-app-payments';
import defaultStyles from '../defaultStyles';

const AcceptedOfferPage = ({ acceptedOffer, onPaymentComplete }) => {
  const [isPaying, setIsPaying] = useState(false);


  const startCardEntry = async () => {
    try {
        setIsPaying(true);

        
        const credentials = await Keychain.getGenericPassword({
          service: 'net.task-u.app.service' // Must match storage service name
        });
        if (!credentials) {
          throw new Error('No authentication token found');
        }
        await SQIPCardEntry.startCardEntryFlow(
        { collectPostalCode: false },
        async (cardDetails) => {
            const nonce = cardDetails.nonce;
            console.log('Received nonce:', nonce);
            await SQIPCardEntry.completeCardEntry();
            // Send nonce to your backend to complete the payment
            const response = await fetch('http://localhost:3000/process-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${credentials.password}` },
            body: JSON.stringify({
                nonce,
                amount: acceptedOffer.offer * 100, // Square expects cents
                currency: 'USD',
                taskId: acceptedOffer.taskId,
                userId: acceptedOffer.user,
            }),
            });
            console.log('Payment response:', response);
            const result = await response.json();
            console.log('Payment result:', result);
            if (result.success) {
            await SQIPCardEntry.completeCardEntry();
            onPaymentComplete?.(acceptedOffer);
            } else {
            console.error('Payment failed:', result.error);
            await SQIPCardEntry.cancelCardEntry();
            }

            ImmersiveMode.setImmersive(false);
            setIsPaying(false);
        },
            () => {
                console.log('Card entry canceled');
                setIsPaying(false);
            }
        );
        } catch (error) {
            console.error('Payment error:', error);
            setIsPaying(false);
        }
    };


  if (!acceptedOffer) return null;

  const componentDidMount = async () => {
    await SQIPCore.setSquareApplicationId(Config.SQUARE_APP_ID);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <View >
        <Text style={defaultStyles.defaultTitle}>Accepted Offer</Text>
      <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Image source={require("../../../assets/defaultUser.png")} style={{ width: 100, height: 100 }} />
            <Text style={styles.nameText}>{acceptedOffer.name}</Text>
          </View>
          <View style={styles.headerContainer}>
            <Text style={[defaultStyles.defaultLabel, { textAlign: 'center' }]}>Offer</Text>
            <Text style={defaultStyles.defaultCurrencyTitleModal}>{"$" + acceptedOffer.offer}</Text>
          </View>
        </View>
      
      <TouchableHighlight
        style={styles.actionButton}
        underlayColor="#bbb"
        onPress={startCardEntry}
        disabled={isPaying}
      >
        <Text style={[styles.actionText, { color: 'green' }]}>
          {isPaying ? 'Processing...' : 'Pay'}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default AcceptedOfferPage;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    elevation: 2,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center'
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
  acceptedLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2e7d32',
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
  actionButton: {
    backgroundColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    marginLeft: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});