import React from 'react';
import { router } from 'expo-router';
import useBookStore from '../src/store/bookStore';
import AddScreen from '../src/screens/AddScreen';

export default function AddRoute() {
  const addBook = useBookStore((state) => state.addBook);

  const handleAddManual = () => {
    // Add a mock new book to show the state addition is working
    addBook({
      title: 'Chronicles of Andalusia',
      author: 'Ibn Jubayr',
      coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKgYRBY9pAVpwZ72mu2lqyGHwTJHx_8AL8PbSVoYFMVsG3PDOdVVuaeTdmVrkwIe-NRYEza_I7xQtfiB7ekGOEz4nVpSMR4QbAqnHtcOoKLu18lG49zMk2lAA9ZUFc6Sd25DjcLDm8GCR0EUfSrrK3iuGRPW49vuIufDLhCsw5cX6zE1uPKe2SnlGNvdtFsnMjRbbV3Ms_zkcn19f8Cf4p3mLSh1oJP7qBXGrrEALl4X0LxKWOhPdliF0krebIT7XV3u0P2SPPFkA',
      totalPages: 310,
    });
    console.log('Book added manually');
  };

  const handleScanBarcode = () => {
    console.log('Barcode scan initiated');
  };

  const handleSearchBook = () => {
    console.log('Book search initiated');
  };

  return (
    <AddScreen
      onAddManual={handleAddManual}
      onScanBarcode={handleScanBarcode}
      onSearchBook={handleSearchBook}
      onBack={() => router.back()}
    />
  );
}
