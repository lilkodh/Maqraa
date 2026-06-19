import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import useBookStore from '../../src/store/bookStore';
import BookDetailScreen from '../../src/screens/BookDetailScreen';

export default function BookDetailRoute() {
  const { id } = useLocalSearchParams();
  
  const books = useBookStore((state) => state.books);
  const timerState = useBookStore((state) => state.timerState);
  
  const updateProgress = useBookStore((state) => state.updateProgress);
  const toggleBookCompletion = useBookStore((state) => state.toggleBookCompletion);
  const startTimer = useBookStore((state) => state.startTimer);
  const pauseTimer = useBookStore((state) => state.pauseTimer);
  const stopTimer = useBookStore((state) => state.stopTimer);
  const setActiveBookId = useBookStore((state) => state.setActiveBookId);

  // Find active book
  const book = books.find((b) => b.id === id) || books[0];

  const handleUpdateProgress = (pages) => {
    if (book) {
      updateProgress(book.id, pages);
    }
  };

  const handleToggleCompletion = () => {
    if (book) {
      toggleBookCompletion(book.id);
    }
  };

  const handleStartTimer = () => {
    if (book) {
      setActiveBookId(book.id);
      startTimer();
    }
  };

  const handlePauseTimer = () => {
    pauseTimer();
  };

  const handleStopTimer = (notes) => {
    stopTimer(notes);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <BookDetailScreen
      book={book}
      timerState={timerState}
      onUpdateProgress={handleUpdateProgress}
      onToggleCompletion={handleToggleCompletion}
      onStartTimer={handleStartTimer}
      onPauseTimer={handlePauseTimer}
      onStopTimer={handleStopTimer}
      onBack={handleBack}
    />
  );
}
