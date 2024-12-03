import React, { useState, useEffect } from 'react';
import { View, Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, Keyboard } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const AddBookForm = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publicationDate: '',
    pdfUrl: '',
    favorite: false,
    imageUrl: '',
    bookType: { id: '' }, // Store bookType as an object with an ID
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
    if (!formData.bookType.id) {
      Alert.alert('Validation Error', 'Book Type is required');
      return;
    }

    console.log('Form Data:', formData);

    try {
      const response = await fetch('http://10.0.2.2:8081/book/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Book added successfully!');
        navigation.goBack();
      } else {
        const responseData = await response.json();
        Alert.alert('Error', responseData || 'Failed to add book. Please try again.');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/5074816/pexels-photo-5074816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
      blurRadius={80}
    >
      <TouchableOpacity onPress={() => { Keyboard.dismiss() }}>
        <TouchableOpacity onPress={goBack} style={styles.arrow}>
          <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.titleText}>ADD YOUR BOOK HERE</Text>
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
            value={formData.bookType.id}
            items={bookTypes}
            setOpen={setOpen}
            setValue={(callback) => setFormData({ ...formData, bookType: { id: callback(formData.bookType.id) } })}
            setItems={setBookTypes}
            placeholder="Select Book Type"
          />
          <Button
            mode="contained"
            onPress={onFormSubmit}
            style={{ marginTop: 16, backgroundColor: 'rgba(128, 111, 165, 1)', borderColor: 'black', borderWidth: .5 }}
          >
            Add Book
          </Button>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const YourMainComponent = ({ route }) => {
  return (
    <View style={{ flex: 1 }}>
      <AddBookForm route={route} />
    </View>
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
    textAlign: 'center'
  },
  arrow: {
    marginLeft: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 40,
    width: 40
  },
});

export default YourMainComponent;
