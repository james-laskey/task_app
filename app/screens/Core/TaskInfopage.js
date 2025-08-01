import { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import { useUser } from '../../UserContext';
import defaultStyles from '../defaultStyles';
import MakeOfferModal from '../Widgets/MakeOfferModal';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  contentBox: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000',
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


export default function TaskInfoPage({ navigation, route }) {
    const { user } = useUser();
    const { task } = route.params;
    const [uid, setUid] = useState(null);
    const [tasker, setTasker] = useState(false);
    const [showMakeOfferModal, setShowMakeOfferModal] = useState(false);

  const handleMakeOffer = () => {
  }

  if (!task) return null;

  const handleClose = () => {
    navigation.goBack();
  };

  const handleAccept = () => {
    console.log('Task accepted', task);
    //send request to server to accept task and cahnge button to pending
    //get cc data from keychain or secure storage
    //
  };
  useEffect(() => {
    if (user.uid == task.user.uid) {
        setTasker(false);
    } else {
        setTasker(true);
        setUid(user.uid);
    }
  

    }, [user]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
        <View style={styles.header}>
          <Text style={defaultStyles.defaultTitle}>{task.title}</Text>
          <Image source={require("../../../assets/DefaultCallIcon.png")} style={{ width: 25, height: 25 }} />
        </View>

        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Image source={require("../../../assets/defaultUser.png")} style={{ width: 100, height: 100 }} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={[defaultStyles.defaultLabel, { textAlign: 'center' }]}>Offer</Text>
            <Text style={defaultStyles.defaultCurrencyTitleModal}>{"$" + task.offer}</Text>
          </View>
        </View>

        <Text style={defaultStyles.defaultLabel}>Description</Text>
        <Text style={defaultStyles.defaultText}>{task.description}</Text>

        <Text style={defaultStyles.defaultLabel}>Address</Text>
        <Text style={defaultStyles.defaultText}>{task.address}</Text>

        <View style={styles.buttonContainer}>
          <TouchableHighlight style={defaultStyles.defaultButtonAlt} onPress={handleClose}>
            <Text style={defaultStyles.defaultButtonText}>Close</Text>
          </TouchableHighlight>
            {tasker ? (
                <TouchableHighlight style={defaultStyles.defaultButton} onPress={() => setShowMakeOfferModal(true)}>
                <Text style={defaultStyles.defaultButtonText}>Make Offer</Text>
                </TouchableHighlight>
            ) : (
                <TouchableHighlight style={defaultStyles.defaultButton} onPress={() => navigation.navigate('TaskOffers', { task })}>
                <Text style={defaultStyles.defaultButtonText}>View Offers</Text>
                </TouchableHighlight>
            )}
        </View>
        {showMakeOfferModal && (
          <MakeOfferModal
            visible={showMakeOfferModal}
            onClose={() => setShowMakeOfferModal(false)}
            task={task}
          />
        )}
    </ScrollView>
  );
}