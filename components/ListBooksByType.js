import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, FlatList, Text, ImageBackground, Image, TouchableOpacity, Modal } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

const ListBooksByType = () => {
  const [bookTypes, setBookTypes] = useState([]);
  const [selectedBookType, setSelectedBookType] = useState(null);
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState('');
  const navigation = useNavigation();

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

  const fetchBooksByType = async (typeId) => {
    try {
      const response = await axios.get(`http://10.0.2.2:8081/book/books/searchByType?bookTypeId=${typeId}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      Alert.alert('Error', 'An error occurred while fetching books.');
    }
  };

  const handleTypeChange = (typeId) => {
    setSelectedBookType(typeId);
    fetchBooksByType(typeId);
  };

  const handleAddReview = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const handleSubmitReview = async () => {
    if (!reviewContent || !reviewRating) {
      Alert.alert('Validation Error', 'Please provide both content and rating for the review.');
      return;
    }

    try {
      await axios.post(`http://10.0.2.2:8081/reviews/?bookId=${selectedBook.id}`, {
        content: reviewContent,
        rating: reviewRating,
      });
      Alert.alert('Success', 'Review added successfully!');
      setModalVisible(false);
      setReviewContent('');
      setReviewRating('');
    } catch (error) {
      console.error('Error adding review:', error);
      Alert.alert('Error', 'An error occurred while adding the review.');
    }
  };

  const navigateToReviews = (book) => {
    navigation.navigate('BookReviews', { book });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/6867728/pexels-photo-6867728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
      resizeMode="cover"
      blurRadius={80}
    >
      <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={selectedBookType}
          items={bookTypes}
          setOpen={setOpen}
          setValue={setSelectedBookType}
          onChangeValue={handleTypeChange}
          setItems={setBookTypes}
          placeholder="Select Book Type"
          style={styles.dropdown}
        />
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>
                <Text style={styles.bookPublicationDate}>{item.publicationDate}</Text>
                <Button mode="contained" onPress={() => handleAddReview(item)} style={styles.reviewButton}>
                  Add Review
                </Button>
                <Button mode="contained" onPress={() => navigateToReviews(item)} style={styles.reviewButton}>
                  View Reviews
                </Button>
              </View>
            </View>
          )}
        />
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                label="Review Content"
                value={reviewContent}
                onChangeText={setReviewContent}
                style={styles.textInput}
              />
              <TextInput
                label="Rating"
                value={reviewRating}
                onChangeText={setReviewRating}
                style={styles.textInput}
                keyboardType="numeric"
              />
              <Button mode="contained" onPress={handleSubmitReview} style={styles.saveButton}>
                Submit Review
              </Button>
              <Button mode="text" onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                Cancel
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    margin: 16,
    marginTop: 50,
  },
  dropdown: {
    marginBottom: 20,
  },
  bookItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: 10,
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 16,
    borderRadius: 5,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: 'gray',
  },
  bookPublicationDate: {
    fontSize: 12,
    color: 'gray',
  },
  reviewButton: {
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  textInput: {
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
});

export default ListBooksByType;