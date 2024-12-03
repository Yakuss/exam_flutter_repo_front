import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const AuthOption = () => {
  const navigation = useNavigation();

  const ACCOUNT = () => {
    navigation.navigate('Login');
  };

  const Biometrics = () => {
    navigation.navigate('Start');
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
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.arrow}>
          <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleText}>AUTHENTICATION </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgba(255,255,255,0.3)', borderColor: 'rgba(251, 255, 255, 0.77)' , marginRight:270 , borderBottomRightRadius:200 , borderTopRightRadius:200}]}
          onPress={Biometrics}
        >
          <Text style={[styles.buttonText,{marginLeft:150}]}>BIOMETRIC</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255, 255, 255, 0.71)' , marginLeft:270, borderBottomLeftRadius:200 , borderTopLeftRadius:200 }]}
          onPress={ACCOUNT}
        >
          <Text style={[styles.buttonText,{marginRight:150}]}>ACCOUNT</Text>
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
    flexDirection: 'column',
    marginTop: 35,
    marginBottom: 50,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: -100,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    width: 450,
  },
  buttonText: {
    color: '#rgba(64, 53, 87, 1)',
    fontSize: 25,
    fontWeight: 'bold',
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
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginBottom:10,
    marginTop:10,
    width:40
  },
});

export default AuthOption;
