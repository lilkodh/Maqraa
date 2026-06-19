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
  const profilePhoto = useBookStore((state) => state.profilePhoto);
  const setProfilePhoto = useBookStore((state) => state.setProfilePhoto);
  const deleteBook = useBookStore((state) => state.deleteBook);
  const setBottomSheetOpen = useBookStore((state) => state.setBottomSheetOpen);

  // Derive metrics
  const streakCount = getStreakCount ? getStreakCount() : 12;
  const finishedBooksCount = getFinishedBooksCount ? getFinishedBooksCount() : 12;
  const totalReadingSeconds = getTotalReadingSeconds ? getTotalReadingSeconds() : 0;
  
  // Calculate total pages read across all books
  const totalPagesRead = books.reduce((acc, book) => acc + (book.readPages || 0), 0);

  const handleSelectBook = (bookId) => {
    router.push(`/book/${bookId}`);
  };

  const handleAddBook = (bookDetails) => {
    addBook(bookDetails);
    console.log('Book added manually:', bookDetails.title);
  };

  const handleDeleteBook = (bookId) => {
    deleteBook(bookId);
    console.log('Book removed manually:', bookId);
  };

  const handleStartSession = () => {
    if (books.length === 0 || !activeBookId) {
      Alert.alert(
        "No Books Added",
        "Please add a book to your library first to start a reading session.",
        [{ text: "OK" }]
      );
      return;
    }
    startTimer();
    console.log('Started reading session for active book:', activeBookId);
    router.push(`/book/${activeBookId}`);
  };

  const handlePickCoverImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission Required", "Permission to access the camera roll is required to select a photo.");
      return null;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!pickerResult.canceled) {
      return pickerResult.assets[0].uri;
    }
    return null;
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
      setProfilePhoto(selectedUri);
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
      profilePhoto={profilePhoto}
      onSelectBook={handleSelectBook}
      onAddBook={handleAddBook}
      onStartSession={handleStartSession}
      onAddPhoto={handleAddPhoto}
      onPickCoverImage={handlePickCoverImage}
      onDeleteBook={handleDeleteBook}
      onBottomSheetVisibilityChange={setBottomSheetOpen}
    />
  );
}
