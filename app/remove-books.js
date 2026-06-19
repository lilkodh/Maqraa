import React from 'react';
import { router } from 'expo-router';
import useBookStore from '../src/store/bookStore';
import RemoveBooksScreen from '../src/screens/RemoveBooksScreen';

export default function RemoveBooksRoute() {
  const books = useBookStore((state) => state.books);
  const deleteBook = useBookStore((state) => state.deleteBook);

  const handleDeleteBook = (bookId) => {
    deleteBook(bookId);
    console.log('Book removed manually via dedicated screen:', bookId);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <RemoveBooksScreen
      books={books}
      onDeleteBook={handleDeleteBook}
      onBack={handleBack}
    />
  );
}
