import React from 'react';
import { router } from 'expo-router';
import useBookStore from '../src/store/bookStore';
import LibraryScreen from '../src/screens/LibraryScreen';

export default function HomeRoute() {
  const books = useBookStore((state) => state.books);
  const targetGoal = useBookStore((state) => state.targetGoal);
  const sessions = useBookStore((state) => state.sessions);
  const getStreakCount = useBookStore((state) => state.getStreakCount);
  const getFinishedBooksCount = useBookStore((state) => state.getFinishedBooksCount);
  const getTotalReadingSeconds = useBookStore((state) => state.getTotalReadingSeconds);

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
    // Navigate or trigger action (pure presentational trigger)
    console.log('FAB add book pressed');
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
    />
  );
}
