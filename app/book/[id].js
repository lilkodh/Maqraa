import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useBookStore from '../../src/store/bookStore';
import BookDetailScreen from '../../src/screens/BookDetailScreen';

export default function BookDetailRoute() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const books = useBookStore((state) => state.books);
  const activeBookId = useBookStore((state) => state.activeBookId);
  const setActiveBookId = useBookStore((state) => state.setActiveBookId);
  
  const timerState = useBookStore((state) => state.timerState);
  const startTimer = useBookStore((state) => state.startTimer);
  const pauseTimer = useBookStore((state) => state.pauseTimer);
  const stopTimer = useBookStore((state) => state.stopTimer);
  const toggleBookCompletion = useBookStore((state) => state.toggleBookCompletion);

  const book = books.find((b) => b.id === id) || null;

  // Local seconds tracking for rendering and store syncing
  const [localSeconds, setLocalSeconds] = useState(timerState.seconds);

  // Sync active book ID when entering this detail screen
  useEffect(() => {
    if (book && activeBookId !== book.id) {
      setActiveBookId(book.id);
    }
  }, [book, activeBookId]);

  // Keep localSeconds in sync with store timerState
  useEffect(() => {
    setLocalSeconds(timerState.seconds);
  }, [timerState.seconds]);

  // Active ticking effect when running
  useEffect(() => {
    let interval = null;
    if (timerState.isRunning && timerState.startTime) {
      const updateSeconds = () => {
        const elapsed = Math.round((Date.now() - timerState.startTime) / 1000);
        setLocalSeconds(timerState.seconds + elapsed);
      };
      
      updateSeconds();
      interval = setInterval(updateSeconds, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isRunning, timerState.startTime, timerState.seconds]);

  const handleStart = () => {
    startTimer();
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleStop = (notes) => {
    stopTimer(notes);
  };

  const handleToggleCompletion = () => {
    if (book) {
      toggleBookCompletion(book.id);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleNavigateToLibrary = (tab) => {
    if (tab === 'Collections') {
      router.push('/?tab=collections');
    } else {
      router.push('/');
    }
  };

  const handleNavigateToStats = () => {
    router.push('/stats');
  };

  return (
    <BookDetailScreen
      book={book}
      timerSeconds={localSeconds}
      timerRunning={timerState.isRunning}
      onStartTimer={handleStart}
      onPauseTimer={handlePause}
      onStopTimer={handleStop}
      onToggleCompletion={handleToggleCompletion}
      onBackPress={handleBack}
      onNavigateToLibrary={handleNavigateToLibrary}
      onNavigateToStats={handleNavigateToStats}
    />
  );
}
