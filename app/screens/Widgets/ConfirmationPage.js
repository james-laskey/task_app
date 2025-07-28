import { useNavigation, useRoute } from '@react-navigation/native';
import { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const ConfirmationPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { acceptedOffer, transactionId } = route.params;

  const confettiRef = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Payment Successful!</Text>

      <Image source={acceptedOffer.profileImage} style={styles.profileImage} />

      <Text style={styles.nameText}>{acceptedOffer.name}</Text>
      <Text style={styles.offerText}>Amount Paid: ${acceptedOffer.offer}</Text>

      {transactionId && (
        <Text style={styles.transactionText}>Transaction ID: {transactionId}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

      {/* 🎊 Confetti Animation */}
      <ConfettiCannon
        count={150}
        origin={{ x: -10, y: 0 }}
        fadeOut
        autoStart
        explosionSpeed={350}
        fallSpeed={3000}
        ref={confettiRef}
      />
    </View>
  );
};

export default ConfirmationPage;