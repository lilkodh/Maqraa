import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import LibraryScreen from "../src/screens/LibraryScreen";
import { useBookStore } from "../src/store/bookStore";

export default function Index() {
  const router = useRouter();
  const {
    userProfile,
    books,
    activeBookId,
    activeCategory,
    setActiveCategory,
  } = useBookStore();

  const activeBook = books.find((b) => b.id === activeBookId);

  // Filter books based on selected category
  const filteredBooks = books.filter((book) => {
    if (activeCategory === "En cours") {
      return book.progress < 1;
    }
    if (activeCategory === "Terminés") {
      return book.progress >= 1;
    }
    return true; // "Tous"
  });

  const handleBookSelect = (id) => {
    router.push(`/book/${id}`);
  };

  const handleNavPress = (tab) => {
    if (tab === "stats") {
      router.push("/stats");
    } else {
      router.push("/");
    }
  };

  const handleSearchPress = () => {
    Alert.alert("Recherche", "Fonctionnalité de recherche (Maquette).");
  };

  const handleAddBookPress = () => {
    Alert.alert("Ajouter un livre", "Ajout d'un nouveau livre (Maquette).");
  };

  return (
    <LibraryScreen
      userProfile={userProfile}
      activeBook={activeBook}
      books={filteredBooks}
      activeCategory={activeCategory}
      onCategorySelect={setActiveCategory}
      onBookSelect={handleBookSelect}
      onSearchPress={handleSearchPress}
      onAddBookPress={handleAddBookPress}
      onNavPress={handleNavPress}
      activeTab="library"
    />
  );
}