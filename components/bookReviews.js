import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, FlatList, Text, ImageBackground, Modal, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';

const BookReviews = ({ route }) => {
  const { book } = route.params;
  const [reviews, setReviews] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState('');
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8081/reviews/book/${book.id}`);
      setReviews(response.data);
      calculateAverageRating(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Alert.alert('Error', 'An error occurred while fetching reviews.');
    }
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = totalRating / reviews.length;
    setAverageRating(avgRating.toFixed(1)); // Round to one decimal place
  };

  const handleAddReview = () => {
    setModalVisible(true);
  };

  const handleSubmitReview = async () => {
    if (!reviewContent || !reviewRating) {
      Alert.alert('Validation Error', 'Please provide both content and rating for the review.');
      return;
    }

    try {
      await axios.post(`http://10.0.2.2:8081/reviews/?bookId=${book.id}`, {
        content: reviewContent,
        rating: reviewRating,
      });
      Alert.alert('Success', 'Review added successfully!');
      setModalVisible(false);
      setReviewContent('');
      setReviewRating('');
      fetchReviews(); // Refresh the reviews list
    } catch (error) {
      console.error('Error adding review:', error);
      Alert.alert('Error', 'An error occurred while adding the review.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://10.0.2.2:8081/reviews/${reviewId}`);
      Alert.alert('Success', 'Review deleted successfully!');
      fetchReviews(); // Refresh the reviews list
    } catch (error) {
      console.error('Error deleting review:', error);
      Alert.alert('Error', 'An error occurred while deleting the review.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/6867728/pexels-photo-6867728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
      resizeMode="cover"
      blurRadius={80}
    >
      <View style={styles.container}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.averageRating}>Average Rating: {averageRating}</Text>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id?.toString() || item.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
              <Text style={styles.reviewContent}>{item.content}</Text>
              <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
              <TouchableOpacity onPress={() => handleDeleteReview(item.id)} style={styles.deleteButton}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
        <Button mode="contained" onPress={handleAddReview} style={styles.addButton}>
          Add Review
        </Button>
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
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  averageRating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  reviewItem: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewContent: {
    fontSize: 16,
    flex: 1,
  },
  reviewRating: {
    fontSize: 14,
    color: 'gray',
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  addButton: {
    marginTop: 20,
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

export default BookReviews;