import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAMPLE_BOOKS = [
  {
    id: '1',
    title: "The Alchemist's Shadow",
    author: 'Evelyn St. Claire',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKLqAmujkYlqrVdw23aeKNSm-imn5lUHvYiPj2nPpmp84YwcYIKzDKoeMi5Pizo10mxA7OWp4VHme1h3SQoKWlleeNCyx8k5DfY9DpYl9sKffPoHTJJzYJkkSPzZrxIDs-ocp0DX2TKr3edAnIp_o_KI5ucc3uKuHziBxonRp1D_Y_dZa-cHS7AEbvnf36gIowbUu2QVOqvT-cxxI94hCbGVkztleFMllU5z7I5AmWm5zCDprvMlUBGUlT1dBZ1XELnzBEK17aLBef',
    progress: 60,
    totalPages: 340,
    currentPage: 204,
    status: 'in_progress',
    rating: 4.5,
    genre: ['Fiction', 'Mystery'],
    language: 'English',
    startedDate: 'June 12',
    sessionTime: 1427,
    synopsis: 'A mesmerizing journey through a world where shadows hold ancient secrets, and one alchemist must uncover the truth before darkness consumes everything.',
  },
  {
    id: '2',
    title: 'تاريخ الأندلس',
    author: 'د. أحمد المنصور',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqoTcIuAB3Ek1-CUFltuEkHLjWvTHotzkK5VeKRv5ZZizhK6iJNwP4PyJqSDebrzhhrpgeXOAhkpd2GtDMny7KH3GnsHu7MdPMThm9pcSklD8Z_3Y4iiZPz8xaqGCD_7kNrcZJzXKwmwOIuB02koT6R88r5nnpFy26FbSHUKmCD8X0bkvlJ5ox3y080hjTcs_Vks06aiAesm1lkGzRsApwwo45cH1pltc5wHYCrz0a8tZluOegnZkK2mFj8v034OQoVnfeSmDsR1fe',
    progress: 45,
    totalPages: 512,
    currentPage: 230,
    status: 'in_progress',
    rating: 4.8,
    genre: ['تاريخ', 'أكاديمي'],
    language: 'Arabic',
    startedDate: 'May 28',
    sessionTime: 0,
    synopsis: 'هذا العمل المرجعي يستكشف الذروة الثقافية والعلمية لشبه الجزيرة الأيبيرية تحت الحكم الإسلامي، واصلاً بين التاريخ القديم والآفاق المعاصرة.',
  },
  {
    id: '3',
    title: 'Verdant Echoes',
    author: 'Thomas Thorne',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxv2dWvTgLKqk15Hf2DNavKrcuJRImlG2R2N3G-VwDpgQRpVeJQZYuiJFF7sGrs5lA7hdHsfFHyHBkHK1InLs-z9fRwpllUnp6aoHhx8Fe0SXVDUlzIvwYbY7XEzi_-zmMhQvRvTo2IYd4_S8LDLPQTJCrrGaJy4NX1Z_gnMLeS6w3FPI2gyVyw_Qu58CLkWL4Aci0ztmWxYmqw0f-p7WQLHXeZOwd5x5rCtcao3-OJRlws0cM_LUplkRM-uupqKcSLMNPJ4y03M4v',
    progress: 75,
    totalPages: 290,
    currentPage: 218,
    status: 'in_progress',
    rating: 4.2,
    genre: ['Nature', 'Poetry'],
    language: 'English',
    startedDate: 'June 1',
    sessionTime: 0,
    synopsis: 'A lyrical exploration of ancient forests and the living memory they carry across centuries.',
  },
  {
    id: '4',
    title: 'Empire of Dust',
    author: 'Marcus Aurel',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs9DJvrTBUjbc5mkEnLr9qcX0wEPfOpzLIx0FWoXs_cfq1UTgGYd-56RIh2PtoSHqXrDt63JZ2IcwaUFQZjhH7i2CUtbRBQQFWyMV5QtfTLKnqrL1rq376wwFKbGo-ZP41wzyKV-sdJhuF0BNhPsF4GupU3ESjzBgwPjOnuTkK-boFTDJMEeDqg7d6HH5JaaQN3BoqJ2OnlR9_n2sSoyrA0_CQ3Ut8MIloMCGecPETtQA7Lp3zF6UtQ5xxD1UQR_vWhsTHE-OAU4BV',
    progress: 0,
    totalPages: 445,
    currentPage: 0,
    status: 'to_read',
    rating: 0,
    genre: ['History', 'War'],
    language: 'English',
    startedDate: null,
    sessionTime: 0,
    synopsis: 'The rise and fall of an ancient empire told through the eyes of those who built it — and those who watched it crumble.',
  },
  {
    id: '5',
    title: 'Neon Solace',
    author: 'Zara Vance',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLeN0Xh3oP7uJRVgQ8VuVHmaRqsH7Kl4R4p0wl1BRXbXs8kAZZ4iT3Oez4bZsQ3hKsK2OHBQivUN_gOipGKaZpu5a9uH8qkskUqYw3R5_JDdTDoiESJV-H00hnV-dTAqjxYDwrYDgIwJyBmr4bZVbT25RimBoJI7F6ObLqPQLnxF1VVTrNqJe0r4uRA7hTSsOUvNr1Ll3MO0NcMNrRsnBgINf7CfPxK2vV6iY_UR3Ca20ropQiR5BuxLUEnEBJxNqebaBAZk7i6v8w',
    progress: 100,
    totalPages: 198,
    currentPage: 198,
    status: 'finished',
    rating: 4.6,
    genre: ['Sci-Fi', 'Literary'],
    language: 'English',
    startedDate: 'April 10',
    sessionTime: 0,
    synopsis: 'In a city of perpetual night, one engineer discovers that comfort lives not in the neon glow above, but in the quiet humanity below.',
  },
  {
    id: '6',
    title: 'Astral Cartography',
    author: 'Dr. Julian Ray',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsdFuqFM_hh5bfHedzhWhUe39OyoQGkVUVHYmsL-uC_PLicwuGprarLMC2XjjR5_kMhYZ2gwCnoTK3zHik7EHVqhIFpOCUGmrMXT7uvgV_mSJKIovUrn9YH0d_W8hJr4Xi2klXbqE1VpU2fBnaT6sLOwswvYEuUceZx_sjpiu6sMAaOOOE3Y1GiSePYsT6ixvzPvDhNjmRN--duiMWsu1sRQfQpcgaeOByT62fxUxJVjARYpaPrKid3zBUcB8jZ_X7YqPlxO8tzJxg',
    progress: 10,
    totalPages: 380,
    currentPage: 38,
    status: 'in_progress',
    rating: 4.0,
    genre: ['Science', 'Space'],
    language: 'English',
    startedDate: 'June 15',
    sessionTime: 0,
    synopsis: 'A star-by-star guide to the ancient art of celestial navigation, reframed for the modern deep-space age.',
  },
];

const useBookStore = create(
  persist(
    (set, get) => ({
      books: SAMPLE_BOOKS,
      activeFilter: 'all', // 'all' | 'to_read' | 'in_progress' | 'finished'
      readingGoal: 20,
      profile: {
        name: 'Amir Al-Hassan',
        title: 'Scholar of the Lunar Archives',
        booksRead: 42,
        currentStreak: 15,
        pagesThisMonth: 1280,
        readingTimeHours: 54,
        monthlyData: [
          { month: 'Jan', books: 8 },
          { month: 'Feb', books: 5 },
          { month: 'Mar', books: 12 },
          { month: 'Apr', books: 3 },
          { month: 'May', books: 7 },
          { month: 'Jun', books: 7 },
        ],
      },

      setFilter: (filter) => set({ activeFilter: filter }),

      getFilteredBooks: () => {
        const { books, activeFilter } = get();
        if (activeFilter === 'all') return books;
        if (activeFilter === 'to_read') return books.filter(b => b.status === 'to_read');
        if (activeFilter === 'in_progress') return books.filter(b => b.status === 'in_progress');
        if (activeFilter === 'finished') return books.filter(b => b.status === 'finished');
        return books;
      },

      getCurrentlyReading: () => {
        const { books } = get();
        return books.find(b => b.status === 'in_progress') || null;
      },

      getBookById: (id) => {
        return get().books.find(b => b.id === id) || null;
      },

      getBooksFinishedCount: () => {
        return get().books.filter(b => b.status === 'finished').length;
      },

      markCompleted: (id) => set((state) => ({
        books: state.books.map(b =>
          b.id === id ? { ...b, status: 'finished', progress: 100, currentPage: b.totalPages } : b
        ),
      })),

      updateProgress: (id, currentPage) => set((state) => ({
        books: state.books.map(b => {
          if (b.id !== id) return b;
          const progress = Math.round((currentPage / b.totalPages) * 100);
          return { ...b, currentPage, progress };
        }),
      })),

      updateSessionTime: (id, seconds) => set((state) => ({
        books: state.books.map(b =>
          b.id === id ? { ...b, sessionTime: b.sessionTime + seconds } : b
        ),
      })),
    }),
    {
      name: 'maqra-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useBookStore;
