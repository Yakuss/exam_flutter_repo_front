import React from 'react';
import { View, Text, StyleSheet, Button  , TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const BookDetails = ({ route }) => {
  const { book } = route.params;
  const navigation = useNavigation();
  const pdfUrl = book.pdfUrl;
  const goBack = () => {
    navigation.goBack();
  };
  console.log(pdfUrl);
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
      <TouchableOpacity onPress={goBack} style={styles.arrow}>
              <Icon name="arrow-left" size={30} color="black" />
      </TouchableOpacity>
        {book.Name}</Text>

      <View style={styles.pdfContainer}>
        <WebView
          source={{ uri: `https://docs.google.com/gview?embedded=true&url=${pdfUrl}` }}
          style={styles.pdf}
          startInLoadingState={true}
          renderLoading={() => (
            <Text style={styles.loadingText}>Loading PDF...</Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    textAlign:'center',
    marginBottom: 10,
    marginTop:20,
  },
  pdfContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 9,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
  },
  arrow: {
    marginRight:50,
  },
  
});

export default BookDetails;
