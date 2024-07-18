import React from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/AntDesign';

const DownloadPDF = ({uri}) => {
  const downloadPDF = async () => {
    const url = 'http://api.evalvue.com/media/Refund/Refund Policy.pdf'; // URL of the PDF file
    const localFile = `${RNFS.DownloadDirectoryPath}/Refund_Policy.pdf`;

    // Check for permissions on Android
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Needed',
          message: 'App needs access to your storage to download the file',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
        return;
      }
    }

    RNFS.downloadFile({
      fromUrl: url,
      toFile: localFile,
    })
      .promise.then(result => {
        console.log(result);
        console.log(localFile);
        if (result.statusCode === 200) {
          Alert.alert('Download Successful', `File saved to ${localFile}`);
        } else {
          Alert.alert('Download Failed', `Status code: ${result.statusCode}`);
        }
      })
      .catch(error => {
        Alert.alert('Download Error', error.message);
      });
  };

  return (
    <View style={styles.downloadcontainer}>
      <TouchableOpacity>
        <Icon name="download" style={styles.icon} onPress={downloadPDF} />
      </TouchableOpacity>
    </View>
  );
};

export default DownloadPDF;

const styles = StyleSheet.create({
  downloadcontainer: {
    width: '100%',
    height: 40,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#212128',
  },
  icon: {
    fontSize: 25,
    color: 'white',
    paddingRight: 20,
  },
});
