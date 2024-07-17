
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import Check from 'react-native-vector-icons/AntDesign'
import { primary } from "../Styles/customStyle";
const CustomModal = ({visible, onClose}) => {
  return (
    <Modal
      // animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}><Check name="checkcircle" size={43}/></Text>
            </View>
            <Text style={styles.title}>Modal Title</Text>
            <Text style={styles.subtitle}>
              This is the modal subtitle. It can span multiple lines and is
              centered.
            </Text>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {position: 'absolute', top: 10, right: 10},
  closeButtonText: {fontSize: 18, color: '#aaa'},
  content: {alignItems: 'center'},
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#8e44ad',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {fontSize: 24, color: primary},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {color: 'white', fontSize: 16},
});

export default CustomModal;