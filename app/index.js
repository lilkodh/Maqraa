import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import useBookStore from '../src/store/bookStore';
import LibraryScreen from '../src/screens/LibraryScreen';

export default function HomeRoute() {
  const router = useRouter();
  const books = useBookStore((state) => state.books);
  const activeBookId = useBookStore((state) => state.activeBookId);
  const targetGoal = useBookStore((state) => state.targetGoal);
  const getFinishedBooksCount = useBookStore((state) => state.getFinishedBooksCount);
  
  const [activeFilter, setActiveFilter] = useState('All');
  
  const activeBook = books.find((b) => b.id === activeBookId) || null;
  const finishedBooksCount = getFinishedBooksCount();

  const handleBookPress = (id) => {
    router.push(`/book/${id}`);
  };

  const handleNavigateToStats = () => {
    router.push('/stats');
  };

  return (
    <LibraryScreen
      books={books}
      activeBook={activeBook}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      onBookPress={handleBookPress}
      goal={{ current: finishedBooksCount + 12, target: targetGoal }}
      onNavigateToStats={handleNavigateToStats}
    />
  );
}
