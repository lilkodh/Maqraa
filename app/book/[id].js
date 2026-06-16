import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert } from "react-native";
import BookDetailScreen from "../../src/screens/BookDetailScreen";
import { useBookStore } from "../../src/store/bookStore";

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const {
    books,
    timerSession,
    startTimer,
    pauseTimer,
    stopTimer,
    markAsCompleted,
  } = useBookStore();

  const book = books.find((b) => b.id === id);

  if (!book) {
    return null;
  }

  const handleMarkCompleted = () => {
    markAsCompleted(book.id);
    Alert.alert("Félicitations !", `"${book.title}" a été marqué comme terminé.`, [
      { text: "OK", onPress: () => router.push("/") }
    ]);
  };

  return (
    <BookDetailScreen
      book={book}
      timerSession={timerSession}
      onStartTimer={startTimer}
      onPauseTimer={pauseTimer}
      onStopTimer={stopTimer}
      onMarkCompleted={handleMarkCompleted}
      onBackPress={() => router.back()}
    />
  );
}