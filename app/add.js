import React from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useBookStore from '../src/store/bookStore';
import AddScreen from '../src/screens/AddScreen';

export default function AddRoute() {
  const addBook = useBookStore((state) => state.addBook);
  const activeBookId = useBookStore((state) => state.activeBookId);
  const startTimer = useBookStore((state) => state.startTimer);

  const handleAddBook = () => {
    // Add a mock new book to show the state addition is working
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
    // Start reading session
    startTimer();
    console.log('Started reading session for active book:', activeBookId);
    // Replace current modal view with the book detail screen containing the active timer
    router.replace(`/book/${activeBookId}`);
  };

  const handleAddPhoto = async () => {
    // Request permission to access the media library
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission Required", "Permission to access the camera roll is required to select a photo.");
      return;
    }

    // Launch the system image picker
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
    <AddScreen
      onAddBook={handleAddBook}
      onStartSession={handleStartSession}
      onAddPhoto={handleAddPhoto}
      onBack={() => router.back()}
    />
  );
}
