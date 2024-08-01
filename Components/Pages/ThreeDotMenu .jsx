import React, {useState, useRef, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For FiEdit
import InfoIcon from 'react-native-vector-icons/AntDesign'; // For FiEdit
import IconDelete from 'react-native-vector-icons/MaterialCommunityIcons'; // For MdOutlineDelete
import ThreeDotVertical from 'react-native-vector-icons/Entypo'; // For Entypo's dots-three-vertical
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ThreeDotMenu = ({
  onEdit,
  onDelete,
  edit,
  deleted,
  path,
  params,
  orgDetails,
  setTerminated,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({top: 0, left: 0});
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigation = useNavigation();
  // Calculate menu position after the component mounts or updates
  useLayoutEffect(() => {
    if (showMenu && buttonRef.current) {
      buttonRef.current.measure((fx, fy, buttonWidth, buttonHeight, px, py) => {
        // Define menu dimensions
        const menuWidth = 150; // Adjust the width as needed
        const menuHeight = 120; // Adjust the height as needed

        // Calculate maximum positions to stay within screen bounds
        const maxLeft = Math.min(px, width - menuWidth - 20); // Margin of 20 from the screen edge
        const maxTop = Math.min(py + buttonHeight, height - menuHeight - 20); // Margin of 20 from the screen edge

        setMenuPosition({
          top: maxTop,
          left: maxLeft,
        });
      });
    }
  }, [showMenu]);


 


  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={buttonRef}
        onPress={() => setShowMenu(!showMenu)}
        style={styles.button}>
        <ThreeDotVertical name="dots-three-vertical" size={18} color="#000" />
      </TouchableOpacity>
      {showMenu && (
        <Modal
          transparent={true}
          visible={showMenu}
          animationType="fade"
          onRequestClose={() => setShowMenu(false)}>
          <Pressable style={styles.overlay} onPress={() => setShowMenu(false)}>
            <View
              style={[
                styles.menu,
                {top: menuPosition.top, left: menuPosition.left},
              ]}
              ref={menuRef}>
               {edit?
              <TouchableOpacity
                onPress={() => {
                  onEdit();
                  setShowMenu(false);
                }}
                style={styles.menuItem}>
                <Icon name="edit" size={20} style={styles.editText} />
                <Text style={[styles.menuText, styles.editText]}>Edit</Text>
              </TouchableOpacity>
              :""}
              {deleted?
               <TouchableOpacity
                onPress={() => { onDelete(); setShowMenu(false); }}
                style={styles.menuItem}
              >
                <IconDelete name="tray-remove" size={20} style={styles.deleteText} />
                <Text style={[styles.menuText, styles.deleteText]}>Terminate</Text>
              </TouchableOpacity> 
              :""}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(path,{
                    params,
                    orgDetails
                  })
                }}
                style={[styles.menuItem, {borderBottomWidth: 0}]}>
                <InfoIcon
                  name="infocirlceo"
                  size={20}
                  style={styles.infoText}
                />
                <Text style={[styles.menuText, styles.infoText]}>Info</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    minWidth: 150,
    maxWidth: width * 0.8, // Responsive width
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  deleteText: {
    color: 'red',
  },
  editText: {
    color: 'green',
  },
  infoText: {
    color: '#d45500',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ThreeDotMenu;
