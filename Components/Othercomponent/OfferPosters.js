// OfferPoster.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import Video from 'react-native-video'; // Import Video component

const { width } = Dimensions.get('window');

const OfferPoster = ({ mediaUri, type, visible, onClose }) => {
  if (!visible) return null;

  const renderContent = () => {
    switch (type) {
      case 'image':
      case 'gif': // Treat GIFs as images
        return (
          <Image 
            source={{ uri: mediaUri }} 
            style={styles.media} 
            resizeMode="contain" // Ensures GIF scales properly
          />
        );
      case 'video':
        return (
          <Video
            source={mediaUri} // Use mediaUri directly if it's a local require
            style={styles.media}
            controls={false} // Hide controls
            resizeMode="cover" // Ensures video scales properly
            muted={true} // Mute the video
            repeat={true} // Loop the video
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
            <Text style={styles.closeButtonText}>✕</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  promoContainer: {
    width: width * 0.9,
    maxHeight: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center', // Center align items
    justifyContent: 'center', // Center align items
  },
  media: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ensure proper scaling
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#d9c6f7',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: '#5e3aeb', // Replace with your primary color
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    padding: 20,
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});

export default OfferPoster;
