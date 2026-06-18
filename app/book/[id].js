import { useState, useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import BookDetailScreen from '../../src/screens/BookDetailScreen';
import useBookStore from '../../src/store/bookStore';

export default function BookDetailRoute() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // ── Store reads / writes ─────────────────────────────────────
  const getBookById      = useBookStore(s => s.getBookById);
  const markCompleted    = useBookStore(s => s.markCompleted);
  const updateSessionTime = useBookStore(s => s.updateSessionTime);

  const book = getBookById(id);

  // ── Local timer state (belongs in route, not screen) ────────
  const [timerSeconds, setTimerSeconds] = useState(book?.sessionTime ?? 0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef(null);
  const timerSecondsRef = useRef(timerSeconds);

  // Sync ref with state
  useEffect(() => {
    timerSecondsRef.current = timerSeconds;
  }, [timerSeconds]);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerRunning]);

  // Persist on unmount
  useEffect(() => {
    return () => {
      const currentSeconds = timerSecondsRef.current;
      const initialSeconds = book?.sessionTime ?? 0;
      if (id && currentSeconds > initialSeconds) {
        updateSessionTime(id, currentSeconds - initialSeconds);
      }
    };
  }, [id, book?.sessionTime]);

  if (!book) {
    router.back();
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <BookDetailScreen
        book={book}
        timerSeconds={timerSeconds}
        timerRunning={timerRunning}
        onBack={() => router.back()}
        onMarkCompleted={() => {
          setTimerRunning(false);
          markCompleted(id);
          router.back();
        }}
        onStartTimer={() => setTimerRunning(true)}
        onPauseTimer={() => setTimerRunning(false)}
        onStopTimer={() => {
          setTimerRunning(false);
          setTimerSeconds(0);
        }}
      />
    </SafeAreaProvider>
  );
}
