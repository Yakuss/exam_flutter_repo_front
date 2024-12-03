import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, FlatList, TouchableOpacity, Modal, Text, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';

const ManageBookTypes = () => {
  const [bookTypes, setBookTypes] = useState([]);
  const [selectedBookType, setSelectedBookType] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchBookTypes();
  }, []);

  const fetchBookTypes = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8081/bookTypes/Types');
      setBookTypes(response.data);
    } catch (error) {
      console.error('Error fetching book types:', error);
      Alert.alert('Error', 'An error occurred while fetching book types.');
    }
  };

  const handleAddOrUpdate = async () => {
    if (!formData.name) {
      Alert.alert('Validation Error', 'Book Type Name is required');
      return;
    }

    try {
      if (selectedBookType) {
        // Update existing book type
        await axios.put(`http://10.0.2.2:8081/bookTypes/${selectedBookType.id}`, formData);
        Alert.alert('Success', 'Book Type updated successfully!');
      } else {
        // Create new book type
        await axios.post('http://10.0.2.2:8081/bookTypes/', formData);
        Alert.alert('Success', 'Book Type created successfully!');
      }
      fetchBookTypes();
      setModalVisible(false);
      setFormData({ name: '', description: '' });
      setSelectedBookType(null);
    } catch (error) {
      console.error('Error saving book type:', error);
      Alert.alert('Error', 'An error occurred while saving the book type.');
    }
  };

  const handleEdit = (bookType) => {
    setSelectedBookType(bookType);
    setFormData({ name: bookType.name, description: bookType.description });
    setModalVisible(true);
  };

  const handleDelete = async (bookTypeId) => {
    try {
      await axios.delete(`http://10.0.2.2:8081/bookTypes/${bookTypeId}`);
      Alert.alert('Success', 'Book Type deleted successfully!');
      fetchBookTypes();
    } catch (error) {
      console.error('Error deleting book type:', error);
      Alert.alert('Error', 'An error occurred while deleting the book type.');
    }
  };

  const handleAddNew = () => {
    setSelectedBookType(null);
    setFormData({ name: '', description: '' });
    setModalVisible(true);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/6867728/pexels-photo-6867728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
      resizeMode="cover"
      blurRadius={80}
    >
      <View style={styles.container}>
        <Button mode="contained" onPress={handleAddNew} style={styles.addButton}>
          Add New Book Type
        </Button>
        <FlatList
          data={bookTypes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookTypeItem}>
              <Text style={styles.bookTypeName}>{item.name}</Text>
              <Text style={styles.bookTypeDescription}>{item.description}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                  <Icon name="edit" size={20} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                  <Icon name="trash" size={20} color="red" />
                </TouchableOpacity>
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
                label="Name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                style={styles.textInput}
              />
              <TextInput
                label="Description"
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                style={styles.textInput}
              />
              <Button mode="contained" onPress={handleAddOrUpdate} style={styles.saveButton}>
                {selectedBookType ? 'Update' : 'Add'}
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
    marginTop: 50, // Added marginTop
  },
  addButton: {
    marginBottom: 20,
  },
  bookTypeItem: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: 10,
  },
  bookTypeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookTypeDescription: {
    fontSize: 14,
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {},
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
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ManageBookTypes;