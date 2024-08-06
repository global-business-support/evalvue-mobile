
import React, { useState } from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ImagePreview = ({ imageUrl, visible, onClose }) => {
  console.log(imageUrl)
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    modalContainer: {
        height : 600,
        width: 400,
        borderRadius: 10,
        // padding: 10,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
      },
  image: {
    height: 600,
    width: 320,
    objectFit : 'contain'
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,1.5)',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default ImagePreview;
