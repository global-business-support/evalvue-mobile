import React from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/AntDesign';

const DownloadPDF = ({url}) => {
  async function downloadPdf() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (!granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission not granted');
      }
      const {config, fs} = RNFetchBlob;
      const downloads = fs.dirs.DownloadDir;
      const response = await fetch(
        'https://api.evalvue.com/media/Refund/Refund%20Policy.pdf',
      );
      const blob = await response.blob();
      const filePath = `${RNFS.DocumentDirectoryPath}/RefundPolicy.pdf`;
      const exists = await fs.exists(filePath);
      console.log(filePath);
      // if (exists) {
      //   await fs.unlink(filePath);
      // }
      const result = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading PDF document',
          mediaScannable: true,
        },
      }).fetch('GET', blob.uri);
      console.log('PDF document downloaded successfully', result.path());
    } catch (err) {
      console.warn(err);
    }
  }

  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <View style={styles.downloadcontainer}>
      <TouchableOpacity>
        <Icon name="download" style={styles.icon} onPress={downloadPdf} />
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
