import { create } from "zustand";

let timerInterval = null;

const formatTime = (totalSeconds) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [
    hrs.toString().padStart(2, "0"),
    mins.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
};

export const useBookStore = create((set, get) => ({
  userProfile: {
    name: "Malek El-Mansour",
    streak: 14,
    booksRead: 28,
    totalPages: 8420,
    annualGoalProgress: 0.68,
    level: "Savant",
  },
  books: [
    {
      id: "wisdom",
      title: "Le Jardin des Savoirs",
      author: "Ibn Hazm",
      coverUrl: require("../../assets/book_cover_wisdom.png"),
      progress: 0.45,
      pagesRead: 145,
      totalPages: 320,
      rating: 5,
      languageTags: ["AR", "FR", "AMAZIGH"],
    },
    {
      id: "architecture",
      title: "Moorish Architecture",
      author: "Malek Mansour",
      coverUrl: require("../../assets/book_cover_architecture.png"),
      progress: 1.0,
      pagesRead: 280,
      totalPages: 280,
      rating: 4,
      languageTags: ["FR"],
    },
    {
      id: "meditation",
      title: "Midnight Meditation",
      author: "Fez Library",
      coverUrl: require("../../assets/book_cover_meditation.png"),
      progress: 0.12,
      pagesRead: 36,
      totalPages: 300,
      rating: 5,
      languageTags: ["AR", "FR", "AMAZIGH"],
    },
  ],
  activeBookId: "wisdom",
  activeCategory: "Tous",
  timerSession: {
    formattedTime: "00:26:48",
    isRunning: false,
    seconds: 1608,
  },
  trendData: [4, 6, 3, 8, 5, 7],
  trendLabels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
  historyLogs: [
    {
      id: "log1",
      bookTitle: "Le Jardin des Savoirs",
      date: "15 juin",
      durationText: "26 min",
      pagesText: "+14 pages",
      progressChangeText: "45%",
    },
    {
      id: "log2",
      bookTitle: "Moorish Architecture",
      date: "12 juin",
      durationText: "42 min",
      pagesText: "+28 pages",
      progressChangeText: "100%",
    },
    {
      id: "log3",
      bookTitle: "Midnight Meditation",
      date: "10 juin",
      durationText: "15 min",
      pagesText: "+8 pages",
      progressChangeText: "12%",
    },
  ],

  setActiveCategory: (category) => set({ activeCategory: category }),
  setActiveBookId: (id) => set({ activeBookId: id }),

  startTimer: () => {
    if (get().timerSession.isRunning) return;
    set((state) => ({
      timerSession: { ...state.timerSession, isRunning: true },
    }));
    timerInterval = setInterval(() => {
      set((state) => {
        const nextSeconds = state.timerSession.seconds + 1;
        return {
          timerSession: {
            seconds: nextSeconds,
            isRunning: true,
            formattedTime: formatTime(nextSeconds),
          },
        };
      });
    }, 1000);
  },

  pauseTimer: () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    set((state) => ({
      timerSession: { ...state.timerSession, isRunning: false },
    }));
  },

  stopTimer: () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    set((state) => ({
      timerSession: {
        seconds: 0,
        isRunning: false,
        formattedTime: "00:00:00",
      },
    }));
  },

  markAsCompleted: (id) => {
    set((state) => {
      const updatedBooks = state.books.map((b) => {
        if (b.id === id) {
          return { ...b, progress: 1.0, pagesRead: b.totalPages };
        }
        return b;
      });

      // Add a log entry
      const completedBook = state.books.find((b) => b.id === id);
      const newLog = {
        id: `log_${Date.now()}`,
        bookTitle: completedBook ? completedBook.title : "Livre",
        date: "Aujourd'hui",
        durationText: "Terminé",
        pagesText: "Livre lu entièrement",
        progressChangeText: "100%",
      };

      return {
        books: updatedBooks,
        historyLogs: [newLog, ...state.historyLogs],
        userProfile: {
          ...state.userProfile,
          booksRead: state.userProfile.booksRead + 1,
        },
      };
    });
  },
}));
