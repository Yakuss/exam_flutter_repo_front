// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './src/images/screens/OnboardingScreen';
import BookSearch from './components/BookSearch';
import BookDetails from './components/BookDetails';
import YourMainComponent from './components/YourMainComponent';
import Start from './components/Start';
import HomeScreen from './components/Options';
import ModifyBook from './components/ModifyBook';
import Login from './components/Login';
import Register from './components/Register';
import AuthOption from './components/AuthOption';
import { UserIdProvider } from './components/UserIdContext';
import ManageBookTypes from './components/ManageBookTypes';
import ListBooksByType from './components/ListBooksByType';
import BookReviews from './components/bookReviews';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserIdProvider>
    <NavigationContainer >
      <Stack.Navigator  screenOptions={{ headerShown: false }} >
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="AuthOption" component={AuthOption} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="YourMainComponent" component={YourMainComponent} />
        <Stack.Screen name="BookSearch" component={BookSearch} />
        <Stack.Screen name="ModifyBook" component={ModifyBook} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
        <Stack.Screen name="ManageBookTypes" component={ManageBookTypes} />
        <Stack.Screen name="ListBooksByType" component={ListBooksByType} />
        <Stack.Screen name="BookReviews" component={BookReviews} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserIdProvider>
  );
};

export default App;

