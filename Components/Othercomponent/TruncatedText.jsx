import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { listStyle } from '../Styles/listStyle';
const TruncatedText = ({ text, maxLength ,dot}) => {
  text=text.toString();
  if (text.length <= maxLength) {
    return <Text>{text}</Text>;
  }
  
  // truncate text and add ellipsis
  var truncatedText = `${text.substring(0, maxLength)}`;
  if(dot)
  {
     truncatedText+=`...`;
  }

  return (
      <Text  numberOfLines={1}>{truncatedText}</Text>
  );
};

const styles = StyleSheet.create({
  container: {
//     width: 300, // Example width, adjust as needed
    // Other styling as per your requirements
  },
});

export default TruncatedText;
