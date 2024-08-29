// OfferPoster.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import Video from 'react-native-video'; // Import Video component
import Icon from 'react-native-vector-icons/AntDesign'

const { width } = Dimensions.get('window');

const OfferPoster = ({ mediaUri, type, visible, onClose }) => {
  if (!visible) return null;

  const renderContent = () => {
    switch (type) {
      case 'image':
      case 'gif':
        return (
          <Image 
            source={{ uri: mediaUri }} 
            style={styles.media} 
            resizeMode="contain"
          />
        );
      case 'video':
        return (
          <Video
            source={{ uri: mediaUri }} // Ensure uri is correct
            style={styles.media}
            controls={false}
            resizeMode="stretch"
            muted={true}
            repeat={true}
          />
        );
      default:
        return <Text style={styles.errorText}>Unsupported media type</Text>;
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.promoContainer}>
          {renderContent()}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>
              <Icon name="closecircle" size={24}/>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  promoContainer: {
    width: width * 0.8,
    maxHeight: 500,
    // backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    // padding: 20,
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});

export default OfferPoster;
