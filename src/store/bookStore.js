import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateStreak } from '../utils/calculations';

const SEED_BOOKS = [
  {
    id: 'al-muqaddima',
    title: 'Al-Muqaddima',
    author: 'Ibn Khaldun',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNLyIrs0FUzRRyg8gdmivMajyrI223qMpbYgfLjPOVK-NBPhl01hqLOwNZa_xkoA7K9Pg3l_emf_Qv-2wCbo1_tps-vKpMS969PCdAPj2nVJCdiTPFW2SPRVaBc5AffVTzSCIQQUYVxvolSa1qww3wR0Ic8drlU45wP4lc2fRhL0SGBh7LRkuqElZTWLWNsycAp3z9ka9qDFLsr6JueFa9_uCaOQEQ_8_AoWnxgTKQenFyqi51CGWs0qMM1Xyr7x6a_N-W-YNW92LO',
    totalPages: 450,
    readPages: 202,
    status: 'in_progress',
    rating: 5.0,
    genre: ['Philosophy', 'History'],
    language: 'Arabic',
    synopsis: 'A foundational treatise on the philosophy of history, sociology, and economics, written in the 14th century.',
  },
  {
    id: 'al-fitna',
    title: 'Al-Fitna',
    author: 'Dr. Taha Hussein',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAomg-D6O_zg_1m9x3aG_SdY7J6dsiZEutH20oxPOZNeEgUeYGYUzlCLTtPc4ybfe1kx1bNqBsFknPZMf_ZPj5ZuRzZkThK_WX5L3e4OO-Fcv73UZcgOOdCPxusyGwhzoeFUDO3b3D0r6nLpWd9rGUSuVKmpAwxpvXW9za7XwOO3orP8Zo0BVZI0oXBbRLpZUcRYH-dIX2W6heEzJYVxv1LHysuAbcnQ66YijVhBXzRE_vJaXJ4kh-z3MRRQR06jAmEzy-tnCTGzaiX',
    totalPages: 380,
    readPages: 38,
    status: 'in_progress',
    rating: 4.5,
    genre: ['History', 'Philosophy'],
    language: 'Arabic',
    synopsis: 'An in-depth analysis of the political upheavals in early Islamic history by the legendary dean of Arabic literature.',
  },
  {
    id: 'mystical-poetry',
    title: 'Mystical Poetry of Fez',
    author: 'Sidi Ali al-Jamal',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY-U1bd4ACqLOCi8NbBKeA1RG_6NjBkZfezoi82Fw80uTmgxUkbV4HX_Tu0_y0yWwdiQJ5Gchi1H2D-q35kCBSQfC0Nqw0Sw0JfJgedcKoQLndfdvWA2bFfLwAvpZ_4bLh3uL71YfVPS7Fx7wKpqsK83NJry1TIDcpXuIFt1yjw2-f6KNBEuAfZhyCaZZ87MBJotVTxjNPTGqNeApi23ajA2FZkEFy5ViES00fNKFidUHxslnegYAyrJEENouzYH4ChZ920nSw55kN',
    totalPages: 200,
    readPages: 0,
    status: 'to_read',
    rating: 4.8,
    genre: ['Poetry', 'Philosophy'],
    language: 'Arabic',
    synopsis: 'A curated anthology of Sufi poetic verses written in the spiritual capital of Morocco during the 18th century.',
  },
];

const SEED_SESSIONS = [
  {
    id: 's1',
    bookId: 'al-muqaddima',
    bookTitle: 'Al-Muqaddima',
    durationSeconds: 2700, // 45 min
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    notes: 'Deep focus immersion. Completed Chapter 4. Marked 3 insights in the Sanctuary.',
  },
  {
    id: 's2',
    bookId: 'al-fitna',
    bookTitle: 'Al-Fitna',
    durationSeconds: 4320, // 1h 12m
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
    notes: 'Reflective session. Reviewing previous annotations. Connected Zellige progress tile #14.',
  },
  {
    id: 's3',
    bookId: 'mystical-poetry',
    bookTitle: 'Mystical Poetry of Fez',
    durationSeconds: 1800, // 30 min
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    notes: 'Visual analysis. Analyzed 12 architectural plates from the 14th century Fez collection.',
  },
];

const useBookStore = create(
  persist(
    (set, get) => ({
      books: SEED_BOOKS,
      sessions: SEED_SESSIONS,
      activeBookId: 'al-muqaddima',
      targetGoal: 20,
      
      // Timer state
      timerState: {
        isRunning: false,
        seconds: 0,
        startTime: null,
      },
      
      // Actions
      addBook: (book) => set((state) => ({
        books: [...state.books, {
          id: String(Date.now()),
          readPages: 0,
          status: 'to_read',
          rating: 0,
          genre: [],
          language: 'Arabic',
          synopsis: '',
          ...book,
        }],
      })),
      
      updateProgress: (bookId, readPages) => set((state) => {
        const books = state.books.map((b) => {
          if (b.id === bookId) {
            const pages = Math.min(b.totalPages, Math.max(0, readPages));
            const status = pages === b.totalPages ? 'completed' : pages > 0 ? 'in_progress' : 'to_read';
            return { ...b, readPages: pages, status };
          }
          return b;
        });
        return { books };
      }),
      
      toggleBookCompletion: (bookId) => set((state) => {
        const books = state.books.map((b) => {
          if (b.id === bookId) {
            const isCompleted = b.status === 'completed';
            const status = isCompleted ? 'in_progress' : 'completed';
            const readPages = isCompleted ? Math.round(b.totalPages * 0.9) : b.totalPages;
            return { ...b, readPages, status };
          }
          return b;
        });
        return { books };
      }),
      
      setActiveBookId: (bookId) => set({ activeBookId: bookId }),
      
      // Timer controls
      startTimer: () => set((state) => {
        if (state.timerState.isRunning) return {};
        return {
          timerState: {
            isRunning: true,
            seconds: state.timerState.seconds,
            startTime: Date.now(),
          },
        };
      }),
      
      pauseTimer: () => set((state) => {
        if (!state.timerState.isRunning) return {};
        const elapsed = Math.round((Date.now() - state.timerState.startTime) / 1000);
        return {
          timerState: {
            isRunning: false,
            seconds: state.timerState.seconds + elapsed,
            startTime: null,
          },
        };
      }),
      
      stopTimer: (notes = '') => set((state) => {
        let totalElapsed = state.timerState.seconds;
        if (state.timerState.isRunning && state.timerState.startTime) {
          totalElapsed += Math.round((Date.now() - state.timerState.startTime) / 1000);
        }
        
        if (totalElapsed <= 0) {
          return {
            timerState: { isRunning: false, seconds: 0, startTime: null }
          };
        }
        
        const activeBook = state.books.find(b => b.id === state.activeBookId);
        const newSession = {
          id: String(Date.now()),
          bookId: state.activeBookId,
          bookTitle: activeBook ? activeBook.title : 'Unknown Book',
          durationSeconds: totalElapsed,
          timestamp: new Date().toISOString(),
          notes: notes || 'Completed reading session.',
        };
        
        return {
          sessions: [newSession, ...state.sessions],
          timerState: {
            isRunning: false,
            seconds: 0,
            startTime: null,
          },
        };
      }),
      
      setTimerSeconds: (seconds) => set((state) => ({
        timerState: {
          ...state.timerState,
          seconds,
        }
      })),

      // Streak & metrics helper functions
      getStreakCount: () => {
        return calculateStreak(get().sessions);
      },
      
      getFinishedBooksCount: () => {
        return get().books.filter(b => b.status === 'completed').length;
      },
      
      getTotalReadingSeconds: () => {
        return get().sessions.reduce((acc, s) => acc + s.durationSeconds, 0);
      },
    }),
    {
      name: 'maqra-book-store-v2',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        books: state.books,
        sessions: state.sessions,
        activeBookId: state.activeBookId,
        targetGoal: state.targetGoal,
      }),
    }
  )
);

export default useBookStore;
