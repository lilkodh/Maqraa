import React from 'react';
import { router } from 'expo-router';
import useBookStore from '../src/store/bookStore';
import StatsScreen from '../src/screens/StatsScreen';

export default function StatsRoute() {
  const books = useBookStore((state) => state.books);
  const sessions = useBookStore((state) => state.sessions);
  const getStreakCount = useBookStore((state) => state.getStreakCount);
  const getFinishedBooksCount = useBookStore((state) => state.getFinishedBooksCount);
  const getTotalReadingSeconds = useBookStore((state) => state.getTotalReadingSeconds);
  const profilePhoto = useBookStore((state) => state.profilePhoto);

  // Derive metrics
  const streakCount = getStreakCount ? getStreakCount() : 12;
  const finishedBooksCount = getFinishedBooksCount ? getFinishedBooksCount() : 14;
  const totalPagesRead = books.reduce((acc, book) => acc + (book.readPages || 0), 0);
  const totalReadingSeconds = getTotalReadingSeconds ? getTotalReadingSeconds() : 0;
  const totalReadingHours = Math.round(totalReadingSeconds / 3600) || 124;

  // Derive monthly completed books count (mock/derive from sessions)
  // For the chart: 12 months. Let's make a mock array representing finished books per month
  const monthlyData = [
    { month: 'JAN', count: 2 },
    { month: 'FEB', count: 3 },
    { month: 'MAR', count: 1 },
    { month: 'APR', count: 2 },
    { month: 'MAY', count: 4 },
    { month: 'JUN', count: 2 },
    { month: 'JUL', count: 3 },
    { month: 'AUG', count: 4 },
    { month: 'SEP', count: 5 }, // current month is highest/active
    { month: 'OCT', count: 1 },
    { month: 'NOV', count: 2 },
    { month: 'DEC', count: 1 },
  ];

  // Map sessions to reading history list display format
  const readingHistory = sessions.map(session => {
    const book = books.find(b => b.id === session.bookId) || {};
    return {
      id: session.id,
      bookId: session.bookId,
      title: book.title || session.bookTitle || 'Unknown Book',
      author: book.author || 'Unknown Author',
      coverUrl: book.coverUrl,
      timestamp: session.timestamp,
      durationHours: (session.durationSeconds / 3600).toFixed(1),
      totalPages: book.totalPages || 200,
    };
  });

  const handleDeleteHistoryItem = (sessionId) => {
    console.log('Delete history item pressed for session:', sessionId);
  };

  const handleDeleteAllData = () => {
    console.log('Delete all data pressed');
  };

  return (
    <StatsScreen
      streakCount={streakCount}
      finishedBooksCount={finishedBooksCount}
      totalPagesRead={totalPagesRead}
      totalReadingHours={totalReadingHours}
      monthlyData={monthlyData}
      readingHistory={readingHistory}
      profilePhoto={profilePhoto}
      onDeleteHistoryItem={handleDeleteHistoryItem}
      onDeleteAllData={handleDeleteAllData}
    />
  );
}
