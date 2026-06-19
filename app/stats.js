import React from 'react';
import StatsScreen from '../src/screens/StatsScreen';

const MOCK_MONTHLY_DATA = [
  { month: 'JAN', count: 2 },
  { month: 'FEB', count: 3 },
  { month: 'MAR', count: 1 },
  { month: 'APR', count: 2 },
  { month: 'MAY', count: 4 },
  { month: 'JUN', count: 2 },
  { month: 'JUL', count: 3 },
  { month: 'AUG', count: 4 },
  { month: 'SEP', count: 5 },
  { month: 'OCT', count: 1 },
  { month: 'NOV', count: 2 },
  { month: 'DEC', count: 1 },
];

const MOCK_READING_HISTORY = [
  {
    id: 's1',
    bookId: 'leo-africanus',
    title: 'Leo Africanus',
    author: 'Amin Maalouf',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0YDr5_opzGchV6RH8JfnDgYNBnlYUynqr4oERudRaHScnohxXbv0SuAbomcem-7LkBLNPHxbx4WRsiuMTA-Hfrse9wzdtzNA6yGBNdAxfRJiauIkZz4t4SfmabT5Qz_guIqRw6jAYDc9jolIT_DOxvLo1majtYrw4OCC-FzWVAAYTTfqeW2F7ttZ1A28TugZWfZ117wnQHmEsl3AxepuAlXKinMvEHzPARpZdOu0kt36WsMF8Mj2c4mY4NBKNYPX-RNeyN42AA',
    timestamp: '2026-06-18T10:00:00.000Z',
    durationHours: '2.0',
    totalPages: 360,
  },
  {
    id: 's2',
    bookId: 'the-muqaddimah',
    title: 'The Muqaddimah',
    author: 'Ibn Khaldun',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4zIgv22E8kVyqRJbubkSH_aoI4pxC-GG-WBZo4XHJFNauZTW4nYMYS4SasP1WcehHr9UTlrShl4QtE7lJifu72ndA1Vnf6gJ_6m-CU13_mY56bht6iVT91EQVg1yVaYk5UYik9P6xQkZi6HkMTp63e1X5B4QfcyDUeSw43VNU2Nzlmig7-x_GGE0W1nK-TUxOUqJ5QIj61PjaTSiIyWv74do8viS4L41TV7RQDlheJ4Wrx7sR9oarDMaxk-9HKlbPazVhzEEAqgo',
    timestamp: '2026-06-17T14:00:00.000Z',
    durationHours: '1.5',
    totalPages: 450,
  },
  {
    id: 's3',
    bookId: 'al-andalus-tales',
    title: 'Al-Andalus Tales',
    author: 'Sidi Ali al-Jamal',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKgYRBY9pAVpwZ72mu2lqyGHwTJHx_8AL8PbSVoYFMVsG3PDOdVVuaeTdmVrkwIe-NRYEza_I7xQtfiB7ekGOEz4nVpSMR4QbAqnHtcOoKLu18lG49zMk2lAA9ZUFc6Sd25DjcLDm8GCR0EUfSrrK3iuGRPW49vuIufDLhCsw5cX6zE1uPKe2SnlGNvdtFsnMjRbbV3Ms_zkcn19f8Cf4p3mLSh1oJP7qBXGrrEALl4X0LxKWOhPdliF0krebIT7XV3u0P2SPPFkA',
    timestamp: '2026-06-15T08:00:00.000Z',
    durationHours: '0.0',
    totalPages: 220,
  },
];

export default function StatsRoute() {
  return (
    <StatsScreen
      streakCount={12}
      finishedBooksCount={14}
      totalPagesRead={3420}
      totalReadingHours={124}
      monthlyData={MOCK_MONTHLY_DATA}
      readingHistory={MOCK_READING_HISTORY}
      profilePhoto={null}
      onDeleteHistoryItem={() => {}}
      onDeleteAllData={() => {}}
    />
  );
}
