import React, { useState, useEffect } from 'react';
import { View, Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import BookList from './BookList';

const BookSearch = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8081/book/books');
      setAllData(response.data);
      console.log(response.data[0]);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'An error occurred while fetching books.');
    }
  };

  const handleSearch = (text) => {
    setSearchValue(text);

    const filteredBooks = allData.filter((book) =>
      book.title.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredData(filteredBooks);
  };

  const goToDetails = (book) => {
    navigation.navigate('BookDetails', { book });
  };

 const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://10.0.2.2:8081/book/books/${bookId}`);

      setAllData((prevData) => prevData.filter((book) => book.id !== bookId));
      setFilteredData((prevData) => prevData.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
      Alert.alert('Error', 'An error occurred while deleting the book.');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/6867728/pexels-photo-6867728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
      resizeMode="cover"
      blurRadius={80}
    >
      <TouchableOpacity onPress={goBack} style={styles.arrow}>
        <Icon name="arrow-left" size={30} color="black" />
      </TouchableOpacity>

      <View style={{ flex: 1, shadowColor: '#000', margin: 9, marginTop: 0.1, marginBottom: -100 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ marginBottom: 100, marginTop: 20 }}>
            <View style={styles.bigTitleContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Search books..."
                onChangeText={handleSearch}
                value={searchValue}
              />
              <TouchableOpacity>
                <Icon name="search" size={25} color="#2e6c71" style={{ marginLeft: 3, marginBottom: 6 }} />
              </TouchableOpacity>
            </View>
            <BookList data={filteredData} onPress={goToDetails} onDelete={handleDelete} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#333',
    borderRadius: 9,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '93%',
  },
  bigTitleContainer: {
    marginBottom: 20,
    borderBottomWidth: 5,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 15,
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    marginLeft: 20,
    alignSelf: 'flex-start',
    marginBottom: -10,
    marginTop: 40,
    width: 40,
  },
});

export default BookSearch;
