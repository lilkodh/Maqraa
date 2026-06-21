import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useBookStore = create(
  persist(
    (set) => ({
      books: [],
      profilePhoto: null,

      timerSeconds: 0,
      isTimerRunning: false,

      setProfilePhoto: (photoUri) => set({ profilePhoto: photoUri }),

      clearBooks: () => set({ books: [] }),

      toggleFavorite: (id) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === id ? { ...b, favorite: !b.favorite } : b
          ),
        })),

      addBook: (book) =>
        set((state) => ({
          books: [...state.books, book],
        })),

      deleteBook: (id) =>
        set((state) => ({
          books: state.books.filter((b) => b.id !== id),
        })),

      updateProgress: (id, pageNumber) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === id
              ? {
                  ...b,
                  currentPage: pageNumber,
                  status: pageNumber === b.totalPages ? "completed" : pageNumber > 0 ? "reading" : "to-read",
                }
              : b
          ),
        })),

      startTimer: () => set({ isTimerRunning: true }),
      pauseTimer: () => set({ isTimerRunning: false }),
      resetTimer: () => set({ timerSeconds: 0, isTimerRunning: false }),
      incrementTimer: () => set((state) => ({ timerSeconds: state.timerSeconds + 1 })),
    }),
    {
      name: "book-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useBookStore;