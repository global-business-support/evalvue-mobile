import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import Check from 'react-native-vector-icons/AntDesign';
import { primary } from '../Styles/customStyle';

const CustomModal = ({ visible, onClose, obj }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.content}>
            {obj.error ?
              <View style={[styles.iconContainer, styles.redBorder]}>
                <Check name="closecircle" size={43} color={'red'} />
              </View>
              :
              <View style={[styles.iconContainer, styles.primaryBorder]}>
                <Check name="checkcircle" size={43} color={primary} />
              </View>
              
            }
            <Text style={styles.title}>{obj.title}</Text>
            <Text style={styles.subtitle}>
              {obj.description}
            </Text>
            <TouchableOpacity style={styles.button} onPress={obj.onPress}>
              <Text style={styles.buttonText}>{obj.buttonTitle}</Text>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  closeButtonText: {
    fontSize: 18,
    color: '#aaa'
  },
  content: {
    alignItems: 'center'
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryBorder: {
    borderColor: primary
  },
  redBorder: {
    borderColor: 'red'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: primary,
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
});

export default CustomModal;
