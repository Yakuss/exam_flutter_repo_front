import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToAddBook = () => {
    navigation.navigate('YourMainComponent'); // Adjust this to the correct screen name if needed
  };

  const navigateToListBooks = () => {
    navigation.navigate('BookSearch');
  };

  const navigateToManageBookTypes = () => {
    navigation.navigate('ManageBookTypes');
  };

  const navigateToListBooksByType = () => {
    navigation.navigate('ListBooksByType');
  };

  const LogOut = () => {
    navigation.navigate('AuthOption');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/6867728/pexels-photo-6867728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
      blurRadius={80}
    >
      <Button
        onPress={LogOut} 
        style={styles.logoutButton}
        labelStyle={styles.logoutButtonText}
      >
        Log Out
      </Button>

      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255, 255, 255, 0.77)'  , borderBottomLeftRadius:200 , borderTopLeftRadius:200 , marginTop:50}]}
          onPress={navigateToAddBook}
        >
          <Text style={styles.buttonText}>Add Book</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255, 255, 255, 0.71)' , borderTopRightRadius:200 , borderBottomRightRadius:200 , marginBottom:100  }]}
          onPress={navigateToListBooks}
        >
          <Text style={styles.buttonText}>List Books</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255, 255, 255, 0.65)', borderRadius: 200, marginBottom: 100 }]}
          onPress={navigateToManageBookTypes}
        >
          <Text style={styles.buttonText}>Manage Book Types</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255, 255, 255, 0.59)', borderRadius: 200, marginBottom: 100 }]}
          onPress={navigateToListBooksByType}
        >
          <Text style={styles.buttonText}>List Books by Type</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Set flexDirection to row for horizontal layout
    flexWrap: 'wrap', 
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 450,
    margin:9,
    borderRadius: 10,
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    marginLeft: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#444',
    marginTop: 50,
    width: '25%',
    alignSelf: 'center',
    borderRadius: 20,
    marginLeft:250
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
