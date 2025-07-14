import Mapbox, { Camera, MapView, UserLocation } from "@rnmapbox/maps";
import React, { Component } from "react";
import { Button, Modal, StyleSheet, View } from "react-native";
import RequestModal from "./RequestModal"; // Assuming you have a RequestModal component

Mapbox.setAccessToken("sk.eyJ1IjoiamFtZXNsYXNrZXktdWNiIiwiYSI6ImNtYzhucGQxbzFsdXQyaW9sYnJ1NXplbWQifQ.CvHXozUHg_RCBDuc-o7N-g");

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 700,
    width: 360,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
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
  }

});

export default class Mapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isMounted: false
    };
  }
  componentDidMount() {
    Mapbox.setTelemetryEnabled(false);
    this.setState({ isMounted: true })
  }
   toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };


  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          {this.state.isMounted && (<MapView  centerCoordinate={[-122.2540, 37.8704]} style={styles.map} >
            <Camera
            followUserLocation={true}
            followZoomLevel={14}
            zoomLevel={14}          />
          <UserLocation
            androidRenderMode={'gps'}
            showsUserHeadingIndicator={true}
          />
          </MapView>)}
        </View>
        <View   style={{ position: "absolute",   bottom: 0, paddingBottom:75, borderRadius: 5 }}>
            <Button color="#002676" title='Make Request' onPress={this.toggleModal}/>
        </View>
       
           <Modal visible={this.state.showModal} transparent={true} animationType="slide" onRequestClose={this.toggleModal}>
            <RequestModal visible={this.state.showModal}  onClose={this.toggleModal}/>
           </Modal>
      </View>
    );
  }
}