import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';

const DownloadPDF = ({ url }) => {
  if (!url) {
    console.error('URL is not provided');
    return null;
  }

  const fileName = url.split('/').pop();

  async function downloadPdf() {
    try {
      // Check storage permission (Android only)
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission denied');
          return;
        }
      }

      const { config, fs } = RNFetchBlob;
      const downloads = fs.dirs.DownloadDir;
      const filePath = `${downloads}/${fileName}`;

      // Using RNFetchBlob to download the PDF
      config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading PDF document',
          mediaScannable: true,
        },
      })
        .fetch('GET', url)
        .then(res => {
          console.log('PDF downloaded successfully:', res.path());
          Alert.alert('Success', 'PDF downloaded successfully');
        })
        .catch(error => {
          console.error('Download error:', error);
          Alert.alert('Error', 'Failed to download PDF');
        });
    } catch (err) {
      console.error('Download error:', err);
      Alert.alert('Error', 'Failed to download PDF');
    }
  }

  return (
    <View style={styles.downloadcontainer}>
      <TouchableOpacity onPress={downloadPdf}>
        <Icon name="download" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

DownloadPDF.propTypes = {
  url: PropTypes.string.isRequired,
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
