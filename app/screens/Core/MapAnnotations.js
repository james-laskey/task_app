import { Callout, Camera, MapView, PointAnnotation, UserLocation } from '@rnmapbox/maps';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import defaultStyles from '../defaultStyles';
import Bubble from '../Widgets/Bubble';
import TaskInfoModal from '../Widgets/TaskInfoModal'; // Assuming you have a TaskInfoModal component
import RequestModal from './RequestModal'; // Assuming you have a RequestModal component

const ApiMapAnnotations = ({
  apiEndpoint= "http://localhost:3000/getUncompletedTasks?school=University%20of%20California%3A%20Berkeley",
  annotationSize = 30,
}) => {
  // State management
  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [error, setError] = useState(null);
  

  const fetchTasks = async () => {
    try {
      // Get token from secure storage (example using react-native-keychain)
      const credentials = await Keychain.getGenericPassword({
        service: 'net.task-u.app.service' // Must match storage service name
      });
      if (!credentials) {
        throw new Error('No authentication token found');
      }

      console.log('Using API endpoint:', apiEndpoint);
      const response = await fetch(
        apiEndpoint, 
        {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credentials.password}`
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched tasks:', data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Re-throw for error handling upstream
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleTaskModal = (annotation) => {
    setSelectedAnnotation(annotation); // Optional: Clear selection when deselected
    setShowTaskModal(!showTaskModal);
  };


  // Fetch annotations from API
  useEffect(() => {
    const fetchData = async () => {
  try {
    setIsLoading(true);
    setError(null);
    fetchTasks()
    .then(data => {
      // Assuming data is an array of task objects
      setAnnotations(data["tasks"].map(item => ({
        id: item.taskid.toString(),
        coordinate: item.coordinates,
        offer: item.offer,
        title: item.title,
        description: item.description,
        address: item.address,
        user: item.user
      })));
    })
    .catch(error => console.error('Failed to fetch tasks:', error));
  } catch (err) {
    setError(err.message || 'Unknown error occurred');
  } finally {
    setIsLoading(false);
  }
};

    fetchData();
  }, [apiEndpoint]);

  // Dynamic styles based on props
  const dynamicStyles = {
    annotationContainer: {
      width: annotationSize,
      height: annotationSize,
      borderRadius: annotationSize / 2,
    },
    annotationImage: {
      width: annotationSize - 2,
      height: annotationSize - 2,
      borderRadius: (annotationSize - 2) / 2,
    },
    defaultAnnotation: {
      width: annotationSize - 10,
      height: annotationSize - 10,
      borderRadius: (annotationSize - 10) / 2,
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error loading annotations: {error}</Text>
        <Button 
          title="Retry" 
          onPress={() => {
            setError(null);
            setIsLoading(true);
          }} 
        />
      </View>
    );
  }

  // Main render
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Camera
          followUserLocation={true}
          followZoomLevel={14}
          zoomLevel={14}
        />
        <UserLocation
          androidRenderMode={'gps'}
          showsUserHeadingIndicator={true}
        />
        {annotations.map((annotation) => (
          <PointAnnotation
            key={annotation.id}
            id={annotation.id}
            coordinate={annotation.coordinate}
            title={annotation.title}
            onSelected={() => {
            console.log('Annotation selected:', annotation);
            setSelectedAnnotation(annotation); // Update the selected annotation
            }}
            onDeselected={() => {
              console.log('Annotation deselected');
              setSelectedAnnotation(null); // Optional: Clear selection when deselected
            }}
          >
            <View style={[styles.annotationContainer, dynamicStyles.annotationContainer]}>
              <Image 
                  source={require('../../../assets/mapAnnotation.png')}
                  style={dynamicStyles.annotationImage}
                  resizeMode="cover"
                />
            </View>
            
            <Callout>   
                <View style={defaultStyles.defaultCalloutContainer}>
                  <Text style={defaultStyles.defaultCurrencyTitle}>
                    {'$'+annotation.offer}
                  </Text>
                  <Text style={defaultStyles.defaultLabel}>{annotation.title}</Text>
                </View>
            </Callout>
          </PointAnnotation>
        ))}
      </MapView>

      <Modal visible={showModal} transparent={true} animationType="slide" onRequestClose={toggleModal}>
        <RequestModal visible={showModal}  onClose={toggleModal}/>
      </Modal>

      <Modal visible={showTaskModal} transparent={true} animationType="slide" onRequestClose={toggleTaskModal}>
        <TaskInfoModal task={selectedAnnotation} visible={showTaskModal}  onClose={()=>toggleTaskModal(selectedAnnotation)}/>
      </Modal>

      <TouchableHighlight onPress={toggleModal} style={defaultStyles.defaultCircleButton}>
        <Text style={defaultStyles.defaultCircleButtonText}>+$</Text>  
      </TouchableHighlight>
      
      <Bubble>
        {selectedAnnotation ? (
          <TouchableHighlight
            style={defaultStyles.defaultButton}
            onPress={()=>toggleTaskModal(selectedAnnotation)}>
            <Text style={defaultStyles.defaultButtonText}>View Task</Text>
          </TouchableHighlight>
        ) : (
          <Text style={[defaultStyles.defaultText, {'textAlign': 'center'}]}>
            {annotations.length} {annotations.length === 1 ? 'task' : 'tasks'} available
          </Text>
        )}
        
      </Bubble>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  annotationContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultAnnotation: {
    backgroundColor: '#3F51B5',
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
  },
  calloutDescription: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666',
  },
  coordinateText: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'monospace',
  },
  countText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: '#ff4444',
  },
});

export default ApiMapAnnotations;