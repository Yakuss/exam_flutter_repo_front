// BookList.js
import React from 'react';
import { FlatList } from 'react-native';
import BookItem from './BookItem';

const BookList = ({ data, onPress, onDelete  }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <BookItem item={item} onPress={() => onPress(item)} onDelete={() => onDelete(item.id)}  />
    )}
    keyExtractor={(item) => item.id.toString()}
  />
);

export default BookList;
