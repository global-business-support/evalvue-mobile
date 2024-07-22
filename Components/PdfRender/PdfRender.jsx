import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import DownloadPDF from '../DownloadPDF/DownloadPDF';

export default function PdfRender({pdfUrl}) {
  const url = pdfUrl;
  const source = {
    uri: url,
    cache: true,
  };

  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <DownloadPDF url={url} />
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          // console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          // console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          // console.log(`Link pressed: ${uri}`);
        }}
        style={{flex: 1, width, height}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  downloadcontainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: 50,
    marginBottom: 10,
  },
  icon: {
    fontSize: 25,
  },
});
