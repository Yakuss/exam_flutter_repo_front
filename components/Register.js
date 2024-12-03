import React, { useState } from 'react';
import { View, Text, Alert, ImageBackground, StyleSheet , TouchableOpacity} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const Register = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onRegister = async () => {
    // Basic validation checks
    if (!formData.username.match(/^[a-zA-Z]+$/)) {
      Alert.alert('Invalid Username', 'Username must contain only alphabetic characters.');
      return;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert('Invalid Password', 'Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:8081/users/register', formData);

      if (response.status === 200) {
        Alert.alert('Registration Successful', 'You can now login.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration Failed', response.data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'An error occurred during registration.');
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
        <TouchableOpacity onPress={goBack} style={styles.arrow}>
                <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.titleText}>REGISTER HERE PLEASE</Text>
        <TextInput
          label="Username"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          style={styles.textInput}
        />
        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          style={styles.textInput}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          style={styles.textInput}
        />
        <Button
          mode="contained"
          onPress={onRegister}
          style={{ marginTop: 16, backgroundColor: 'rgba(128, 111, 165, 1)', borderColor: 'black', borderWidth: 0.5 }}
        >
          Register Now
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
    marginBottom:10,
    marginTop:40,
    width:40
  },
});

export default Register;
