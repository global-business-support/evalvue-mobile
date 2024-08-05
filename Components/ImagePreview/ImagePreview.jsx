
import React, { useState } from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ImagePreview = ({ imageUrl, visible, onClose }) => {
  return (
    <Modal
    transparent={true} 
    isVisible={visible} 
    onBackdropPress={onClose}>
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
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
    },
    modalContainer: {
        height : 800,
        width: 400,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
  image: {
    width: '100%',
    height: '80%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ImagePreview;
