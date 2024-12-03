import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Pressable, Share, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import * as OpenAnyThing from 'react-native-openanything';

//import Share from 'react-native-share';
//import RNFS from 'react-native-fs';



const BookItem = ({ item, onDelete, onPress }) => {
  const navigation = useNavigation();
  console.log(item);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);

  const handleDeletePress = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(item.id);
    setDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleItemPress = () => {
    setDetailsModalVisible(true);
  };

  const handleDetailsModalClose = () => {
    setDetailsModalVisible(false);
  };

  const sharePdf = async () => {
    try {
      await Share.share({
        message: `Check out this PDF: ${item.pdfUrl}`,
      });
    } catch (error) {
      console.error('Error sharing PDF link:', error.message);
    }
  };

  const downloadPdf = () => {OpenAnyThing.Pdf(item.pdfUrl)}


  

  return (
    <TouchableOpacity onPress={handleItemPress}>
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Author : {item.author}</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleDeletePress}>
            <Icon name="trash" size={25} color="#e74c3c" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ModifyBook', { book: item })}>
            <Icon name="edit" size={25} color="#3498db" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={sharePdf}>
            <Icon name="share" size={25} color="#2ecc71" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={downloadPdf} >
            <Icon name="download" size={25} color="#1abc9c" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* Delete Confirmation Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteModalVisible}
          onRequestClose={() => {
            setDeleteModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you want to delete this book?</Text>
              <View style={styles.buttonContainer}>
                <Pressable style={[styles.buttonConfirm,{height:30}]} onPress={handleDeleteConfirm}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Text> </Text>
                <Pressable style={[styles.buttonCancel,{width:80 , height:30}]} onPress={handleDeleteCancel}>
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Details Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDetailsModalVisible}
          onRequestClose={handleDetailsModalClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image source={{ uri: item.imageUrl }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{item.title}</Text>
              <Text style={styles.modalAuthor}>Author: {item.author}</Text>
              <Text style={styles.modalDescription}>{item.title}</Text>
              <View style={{flexDirection:'row'}}> 
                <Pressable style={[styles.buttonCancel,{paddingTop:5}]} onPress={handleDetailsModalClose}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
                <Pressable style={[styles.buttonCancel,{backgroundColor:'red', height:30 , paddingTop:5, marginLeft:5}]} 
                    onPress={() => {setDetailsModalVisible(false);
                    navigation.navigate('BookDetails', { book: item })
                    }}>

                  <Text style={styles.textStyle}>Read it</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    padding: 12,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8,
    marginLeft: 15,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: '#444',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    width: 80, // Adjust as needed
    marginLeft: -190,
  },
  icon: {
    marginLeft: 20,
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonConfirm: {
    backgroundColor: '#e74c3c',
    width: 80,
    borderRadius: 8,
    marginTop: 9,
  },
  buttonCancel: {
    backgroundColor: '#3498db',
    marginTop: 10,
    width: 80,
    borderRadius: 8,
    marginTop: 9,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  // Additional styles for the details modal
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalAuthor: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  // Additional styles for the details modal
modalImage: {
  width: 200,
  height: 200,
  resizeMode: 'cover',
  borderRadius: 8,
  marginBottom: 10,
},

modalTitle: {
  fontSize: 20, // Adjust the font size
  fontWeight: 'bold',
  marginBottom: 5,
  color: '#333', // Change the text color
},

modalAuthor: {
  fontSize: 18, // Adjust the font size
  color: '#555', // Change the text color
  marginBottom: 5,
},

modalDescription: {
  fontSize: 16, // Adjust the font size
  color: '#666', // Change the text color
  marginBottom: 10,
},

buttonCancel: {
  backgroundColor: '#3498db',
  marginTop: 10,
  width: 120, // Adjust the width
  borderRadius: 8,
  marginTop: 9,
},

});

export default BookItem;
