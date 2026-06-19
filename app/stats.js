import React from 'react';
import { useRouter } from 'expo-router';
import useBookStore from '../src/store/bookStore';
import StatsScreen from '../src/screens/StatsScreen';

export default function StatsRoute() {
  const router = useRouter();
  const getStreakCount = useBookStore((state) => state.getStreakCount);
  const getFinishedBooksCount = useBookStore((state) => state.getFinishedBooksCount);
  const getTotalReadingSeconds = useBookStore((state) => state.getTotalReadingSeconds);

  // Calculate stats with initial design presets/offsets
  const streak = getStreakCount() + 12;
  const booksRead = getFinishedBooksCount() + 127; // Leo Africanus is completed in seed, so 1 + 127 = 128
  const readingTimeHours = Math.round(getTotalReadingSeconds() / 3600) + 452; // 3.5h seed + 452 = 456h

  const handleNavigateToLibrary = (tab) => {
    if (tab === 'Collections') {
      router.push('/?tab=collections');
    } else {
      router.push('/');
    }
  };

  const handleBookPress = (id) => {
    if (id === 'leo-africanus' || id === 'the-muqaddimah' || id === 'al-andalus-tales') {
      router.push(`/book/${id}`);
    } else {
      router.push('/');
    }
  };

  return (
    <StatsScreen
      stats={{
        streak,
        booksRead,
        readingTimeHours,
      }}
      onNavigateToLibrary={handleNavigateToLibrary}
      onBookPress={handleBookPress}
    />
  );
}
