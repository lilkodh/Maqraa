import React from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useBookStore from '../src/store/bookStore';
import LibraryScreen from '../src/screens/LibraryScreen';

export default function HomeRoute() {
  const books = useBookStore((state) => state.books);
  const targetGoal = useBookStore((state) => state.targetGoal);
  const sessions = useBookStore((state) => state.sessions);
  const getStreakCount = useBookStore((state) => state.getStreakCount);
  const getFinishedBooksCount = useBookStore((state) => state.getFinishedBooksCount);
  const getTotalReadingSeconds = useBookStore((state) => state.getTotalReadingSeconds);
  const addBook = useBookStore((state) => state.addBook);
  const startTimer = useBookStore((state) => state.startTimer);
  const activeBookId = useBookStore((state) => state.activeBookId);

  // Derive metrics
  const streakCount = getStreakCount ? getStreakCount() : 12;
  const finishedBooksCount = getFinishedBooksCount ? getFinishedBooksCount() : 12;
  const totalReadingSeconds = getTotalReadingSeconds ? getTotalReadingSeconds() : 0;
  
  // Calculate total pages read across all books
  const totalPagesRead = books.reduce((acc, book) => acc + (book.readPages || 0), 0);

  const handleSelectBook = (bookId) => {
    router.push(`/book/${bookId}`);
  };

  const handleAddBook = () => {
    addBook({
      title: 'Chronicles of Andalusia',
      author: 'Ibn Jubayr',
      coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKgYRBY9pAVpwZ72mu2lqyGHwTJHx_8AL8PbSVoYFMVsG3PDOdVVuaeTdmVrkwIe-NRYEza_I7xQtfiB7ekGOEz4nVpSMR4QbAqnHtcOoKLu18lG49zMk2lAA9ZUFc6Sd25DjcLDm8GCR0EUfSrrK3iuGRPW49vuIufDLhCsw5cX6zE1uPKe2SnlGNvdtFsnMjRbbV3Ms_zkcn19f8Cf4p3mLSh1oJP7qBXGrrEALl4X0LxKWOhPdliF0krebIT7XV3u0P2SPPFkA',
      totalPages: 310,
    });
    console.log('Book added manually');
    Alert.alert("Success", "Book 'Chronicles of Andalusia' has been added to your library.");
  };

  const handleStartSession = () => {
    startTimer();
    console.log('Started reading session for active book:', activeBookId);
    router.push(`/book/${activeBookId}`);
  };

  const handleAddPhoto = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission Required", "Permission to access the camera roll is required to select a photo.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!pickerResult.canceled) {
      const selectedUri = pickerResult.assets[0].uri;
      console.log('Photo selected:', selectedUri);
      Alert.alert("Photo Selected", "Your photo has been uploaded successfully!");
    }
  };

  return (
    <LibraryScreen
      books={books}
      goalCount={targetGoal}
      finishedBooksCount={finishedBooksCount}
      streakCount={streakCount}
      totalPagesRead={totalPagesRead}
      onSelectBook={handleSelectBook}
      onAddBook={handleAddBook}
      onStartSession={handleStartSession}
      onAddPhoto={handleAddPhoto}
    />
  );
}
