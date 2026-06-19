import React from 'react';
import { useRouter } from 'expo-router';
import useBookStore from '../src/store/bookStore';
import StatsScreen from '../src/screens/StatsScreen';

export default function StatsRoute() {
  const router = useRouter();
  const sessions = useBookStore((state) => state.sessions);
  const getStreakCount = useBookStore((state) => state.getStreakCount);
  const getFinishedBooksCount = useBookStore((state) => state.getFinishedBooksCount);
  const getTotalReadingSeconds = useBookStore((state) => state.getTotalReadingSeconds);

  // Calculate stats with initial design presets/offsets
  const streak = getStreakCount() + 42;
  const booksRead = getFinishedBooksCount() + 18;
  const readingTimeHours = Math.round(getTotalReadingSeconds() / 3600) + 248;

  const handleNavigateToLibrary = () => {
    router.push('/');
  };

  return (
    <StatsScreen
      stats={{
        streak,
        booksRead,
        readingTimeHours,
        level: 'Expert',
      }}
      weeklyData={[
        { day: 'MON', hours: 4.2, percent: 85 },
        { day: 'TUE', hours: 2.8, percent: 60 },
        { day: 'WED', hours: 5.1, percent: 95 },
        { day: 'THU', hours: 3.4, percent: 70 },
      ]}
      sessions={sessions}
      onNavigateToLibrary={handleNavigateToLibrary}
    />
  );
}
