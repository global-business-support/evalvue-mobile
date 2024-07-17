import { Dimensions, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';


export default function PdfRender() {
    const source = { uri : 'http://api.evalvue.com/media/Policy/privacy policy.pdf', cache : true};

    const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
                <Pdf
                    trustAllCerts={false}
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={{flex:1, width, height}}/>
            </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    }
});