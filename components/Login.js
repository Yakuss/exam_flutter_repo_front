import React, { useState } from 'react';
import { View, Text, Alert, ImageBackground, StyleSheet ,TouchableOpacity } from 'react-native';
import { TextInput, Button , Checkbox} from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';


const Login = () => {
  const navigation = useNavigation();
  //const { setUserId } = useUserId(); // Use setUserId from context
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const onLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8081/users/login', formData);

      if (response.status === 200) {
       
        Alert.alert('Login Successful', 'Welcome back!');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Login Failed', response.data || 'Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  const onNavigateToRegister = () => {
    navigation.navigate('Register');
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
        <Text style={styles.titleText}>LOGIN HERE PLEASE</Text>
        <TextInput
          label="Username"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
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
          onPress={onLogin}
          style={{ marginTop: 16, backgroundColor: 'rgba(128, 111, 165, 1)', borderColor: 'black', borderWidth: 0.5 }}
        >
          Login
        </Button>

        <Button
          mode="outlined"
          onPress={onNavigateToRegister}
          style={{ marginTop: 16, borderColor: 'white', borderWidth: 0.5 }}
        >
          Register now
        </Button>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Checkbox
    status={checked ? 'checked' : 'unchecked'}
    onPress={() => {
      setChecked(!checked);
    }}
  />
  <Text>set this account with fingerPrint</Text>
</View>

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

export default Login;
