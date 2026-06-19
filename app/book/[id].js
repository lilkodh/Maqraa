import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import BookDetailScreen from '../../src/screens/BookDetailScreen';

const MOCK_BOOKS = [
  {
    id: 'alchemists-shadow',
    title: "The Alchemist's Shadow",
    author: 'Malik Al-Hassan',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWIoalPueGRINd-zOYRqde1tl-aEzFlQCL_bevCnuYbEDR1poXUITAk00agBMs4gxOd8LJqHGSJiUGlDQ6WHrfkZ4orRXXUCoW2mC0UwSK63crQIhIk7hzmYNoBUcb4JrAp2yHrg_NGSzl23V6Yw3IZ8qWo8bjjJCwAl6oKu0mpSER-KXNGu7XG2DrC5k6d5Ufp0LciosCOO6Ec7ijnhHBPEATW_E7y8w3GsdZ0t0GzeQAkfIi32mx-sN24X9phmO51ZqDy7k0jsU',
    totalPages: 320,
    readPages: 145,
    status: 'in_progress',
    rating: 4.8,
    genre: ['Classical Arabic', 'Poetry'],
    language: 'Arabic',
    synopsis: 'A transformative journey through the shifting sands of the Andalusian desert, where every word is a tile in a vast philosophical mosaic.',
  },
  {
    id: 'book-1',
    title: 'Mysteries of the Desert',
    author: 'Sidi Ali al-Jamal',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1U7nRKL3C7AboucHXh5CdliAXJMwblTntkq1ayUIqpKDNvv8cDy5eXpDqiBUBEfFUva2opaqEKuQX3XhEzn7POBjc6bGm7YOPJ13VlusDFftgam-5ua5y6td2VlkksStF_KDbiLHwJeHVjLtBu8XPAMWK1Jo51TmmGgz-FAXs0xH6a_A2Ea8z7ACNos1IHP7Cy10bjoxuWLoGJci6fqjkddBOuS4DuFyYazQW7F3UFb24F0cOaJf6sfLX1g8eaHjhHPxl6kl_kaI',
    totalPages: 250,
    readPages: 45,
    status: 'in_progress',
    rating: 4.6,
    genre: ['History', 'Philosophy'],
    language: 'Arabic',
    synopsis: 'Curated collection of insights and manuscripts.',
  },
  {
    id: 'book-2',
    title: 'Lantern Shadows',
    author: 'Sidi Ali al-Jamal',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbTCw6V6dbnzXB6scpVf6KvJKiq9EhfaLQFXPvXeap8dmbITgxtbdcEL0qysmah4ci80toiaAE6HnZkYGbIxhzrgItLzv_qVwglQXuOutZTkSURr4iHwP9-chygxaQHHU9ljUfjlDV2RICQvGeSDKFw8X61DwO_hutnbG4XWZMBT4DVPkRi4gJFQbcwksOHY69ofUnt-P4xFZaPMP6FvtrCluXfnADVj64FTl3FumoUHDFkbKiOxZvMXJQEDxSn-BV0oCwpvD_Lz4',
    totalPages: 300,
    readPages: 220,
    status: 'in_progress',
    rating: 4.9,
    genre: ['Poetry', 'Philosophy'],
    language: 'Arabic',
    synopsis: 'Mystical shadows.',
  },
  {
    id: 'book-3',
    title: "The Traveler's Path",
    author: 'Malik Al-Mughis',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnupx6CBNe-ira8Gcz50EYTnRc3IV_1Fq9sV_Obwkg8Pxtsu1IMMacsN4ExEKcBh7Whg0SrdbQnVp9G-kljpx03obMtPW37xWp-oMXSISZvKBnPIvBjicN4KsK-9rz7ZHoHelp_l_Pag_hSLlH7_KbRuhqEH5xxB5y6h9LHxtzpXsjtzEXm62XRDwbRQRobHUTigFBZPPlXLIav1sKVYAVau4__aSB75XFUXqQcuJEv0E7BNR6KANDSDV-tBAWA4fmspkmsHC7BDU',
    totalPages: 180,
    readPages: 18,
    status: 'in_progress',
    rating: 4.4,
    genre: ['Science', 'Philosophy'],
    language: 'Arabic',
    synopsis: 'Path of the traveler.',
  },
  {
    id: 'leo-africanus',
    title: 'Leo Africanus',
    author: 'Amin Maalouf',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0YDr5_opzGchV6RH8JfnDgYNBnlYUynqr4oERudRaHScnohxXbv0SuAbomcem-7LkBLNPHxbx4WRsiuMTA-Hfrse9wzdtzNA6yGBNdAxfRJiauIkZz4t4SfmabT5Qz_guIqRw6jAYDc9jolIT_DOxvLo1majtYrw4OCC-FzWVAAYTTfqeW2F7ttZ1A28TugZWfZ117wnQHmEsl3AxepuAlXKinMvEHzPARpZdOu0kt36WsMF8Mj2c4mY4NBKNYPX-RNeyN42AA',
    totalPages: 360,
    readPages: 360,
    status: 'completed',
    rating: 4.9,
    genre: ['History', 'Biography'],
    language: 'English',
    synopsis: 'A beautiful historical novel following the life of Leo Africanus.',
  },
  {
    id: 'the-muqaddimah',
    title: 'The Muqaddimah',
    author: 'Ibn Khaldun',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4zIgv22E8kVyqRJbubkSH_aoI4pxC-GG-WBZo4XHJFNauZTW4nYMYS4SasP1WcehHr9UTlrShl4QtE7lJifu72ndA1Vnf6gJ_6m-CU13_mY56bht6iVT91EQVg1yVaYk5UYik9P6xQkZi6HkMTp63e1X5B4QfcyDUeSw43VNU2Nzlmig7-x_GGE0W1nK-TUxOUqJ5QIj61PjaTSiIyWv74do8viS4L41TV7RQDlheJ4Wrx7sR9oarDMaxk-9HKlbPazVhzEEAqgo',
    totalPages: 450,
    readPages: 342,
    status: 'in_progress',
    rating: 5.0,
    genre: ['Philosophy', 'History'],
    language: 'Arabic',
    synopsis: 'Introduction to history and sociology.',
  },
  {
    id: 'al-andalus-tales',
    title: 'Al-Andalus Tales',
    author: 'Sidi Ali al-Jamal',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKgYRBY9pAVpwZ72mu2lqyGHwTJHx_8AL8PbSVoYFMVsG3PDOdVVuaeTdmVrkwIe-NRYEza_I7xQtfiB7ekGOEz4nVpSMR4QbAqnHtcOoKLu18lG49zMk2lAA9ZUFc6Sd25DjcLDm8GCR0EUfSrrK3iuGRPW49vuIufDLhCsw5cX6zE1uPKe2SnlGNvdtFsnMjRbbV3Ms_zkcn19f8Cf4p3mLSh1oJP7qBXGrrEALl4X0LxKWOhPdliF0krebIT7XV3u0P2SPPFkA',
    totalPages: 220,
    readPages: 0,
    status: 'to_read',
    rating: 4.7,
    genre: ['Philosophy'],
    language: 'Arabic',
    synopsis: 'Stories from Al-Andalus.',
  },
];

const STATIC_TIMER = { isRunning: false, seconds: 0, startTime: null };

export default function BookDetailRoute() {
  const { id } = useLocalSearchParams();
  const book = MOCK_BOOKS.find((b) => b.id === id) || MOCK_BOOKS[0];

  return (
    <BookDetailScreen
      book={book}
      timerState={STATIC_TIMER}
      onUpdateProgress={() => {}}
      onToggleCompletion={() => {}}
      onStartTimer={() => {}}
      onPauseTimer={() => {}}
      onStopTimer={() => {}}
      onBack={() => router.back()}
    />
  );
}
