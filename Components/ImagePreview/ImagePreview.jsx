
import React, { useState } from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ImagePreview = ({ imageUrl, visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType='fade'
      
      >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.content}>
            <Image source={{uri : imageUrl}} style={styles.image}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  modalContainer: {
      height : '100%',
      width: 400,
      borderRadius: 10,
      // padding: 10,
      alignItems: 'center',
      shadowOffset: { width: 0, height: 2 },
  },
  image: {
    height: 600,
    width: 330,
    objectFit : 'contain',
  },
  closeButton: {
    padding: 5,
    paddingHorizontal : 11,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignSelf : 'flex-end',
    marginTop : 20,
    marginRight : 50
  },
  closeButtonText: {
    color: '#333',
    fontSize: 25,
  },
});

export default ImagePreview;
