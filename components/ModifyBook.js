import React, { useState, useEffect } from 'react';
import { View, Alert, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const ModifyBook = ({ route }) => {
  const { book } = route.params;
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    publicationDate: book.publicationDate,
    pdfUrl: book.pdfUrl,
    favorite: book.favorite,
    imageUrl: book.imageUrl,
    bookTypeId: book.bookType.id, // Assuming bookType is an object with an ID
  });
  const [bookTypes, setBookTypes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBookTypes();
  }, []);

  const fetchBookTypes = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8081/bookTypes/Types');
      setBookTypes(response.data.map((type) => ({ label: type.name, value: type.id })));
    } catch (error) {
      console.error('Error fetching book types:', error);
      Alert.alert('Error', 'An error occurred while fetching book types.');
    }
  };

  const onFormSubmit = async () => {
    // Basic form validation
    if (!formData.title) {
      Alert.alert('Validation Error', 'Book Title is required');
      return;
    }
    if (!formData.author) {
      Alert.alert('Validation Error', 'Author is required');
      return;
    }
    if (!formData.publicationDate) {
      Alert.alert('Validation Error', 'Publication Date is required');
      return;
    }
    if (!formData.pdfUrl) {
      Alert.alert('Validation Error', 'PDF Link is required');
      return;
    }
    if (!formData.imageUrl) {
      Alert.alert('Validation Error', 'Image Link is required');
      return;
    }
    if (!formData.bookTypeId) {
      Alert.alert('Validation Error', 'Book Type is required');
      return;
    }

    console.log('Form Data:', formData);

    try {
      const response = await axios.put(`http://10.0.2.2:8081/book/books/${book.id}`, {
        ...formData,
        bookType: { id: formData.bookTypeId } // Ensure bookType is sent as an object with an ID
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Book updated successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to update book. Please try again.');
      }
    } catch (error) {
      console.error('Error updating book:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/6867728/pexels-photo-6867728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
      resizeMode="cover"
      blurRadius={80}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
        <Icon name="arrow-left" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <TextInput
          label="Title"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          style={styles.textInput}
        />
        <TextInput
          label="Author"
          value={formData.author}
          onChangeText={(text) => setFormData({ ...formData, author: text })}
          style={styles.textInput}
        />
        <TextInput
          label="Publication Date"
          value={formData.publicationDate}
          onChangeText={(text) => setFormData({ ...formData, publicationDate: text })}
          style={styles.textInput}
        />
        <TextInput
          label="PDF URL"
          value={formData.pdfUrl}
          onChangeText={(text) => setFormData({ ...formData, pdfUrl: text })}
          style={styles.textInput}
        />
        <TextInput
          label="Image URL"
          value={formData.imageUrl}
          onChangeText={(text) => setFormData({ ...formData, imageUrl: text })}
          style={styles.textInput}
        />
        <DropDownPicker
          open={open}
          value={formData.bookTypeId}
          items={bookTypes}
          setOpen={setOpen}
          setValue={(callback) => setFormData({ ...formData, bookTypeId: callback(formData.bookTypeId) })}
          setItems={setBookTypes}
          placeholder="Select Book Type"
          style={styles.dropdown}
        />
        <Button mode="contained" onPress={onFormSubmit} style={styles.button}>
          Update Book
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    margin: 16,
    width: 300,
  },
  textInput: {
    height: 50,
    marginBottom: 10,
    borderRadius: 6,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  arrow: {
    marginLeft: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 40,
    width: 40,
  },
  dropdown: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default ModifyBook;
