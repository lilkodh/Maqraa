import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import LibraryScreen from '../src/screens/LibraryScreen';
import useBookStore from '../src/store/bookStore';
import { colors, typography, spacing } from '../src/utils/theme';

export default function IndexRoute() {
  const router = useRouter();

  // ── Store reads ──────────────────────────────────────────────
  const activeFilter        = useBookStore(s => s.activeFilter);
  const readingGoal         = useBookStore(s => s.readingGoal);
  const setFilter           = useBookStore(s => s.setFilter);
  const getFilteredBooks    = useBookStore(s => s.getFilteredBooks);
  const getCurrentlyReading = useBookStore(s => s.getCurrentlyReading);
  const getBooksFinishedCount = useBookStore(s => s.getBooksFinishedCount);

  const filteredBooks    = getFilteredBooks();
  const currentlyReading = getCurrentlyReading();
  const booksFinished    = getBooksFinishedCount();
  const allBooks         = useBookStore(s => s.books);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {/* ── Shared top bar ──────────────────────── */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="menu" size={24} color={colors.cyanGrey} />
        </TouchableOpacity>

        <Text style={styles.logo}>Maqra</Text>

        <View style={styles.topActions}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="search-outline" size={22} color={colors.cyanGrey} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="add-circle-outline" size={24} color={colors.primaryFixedDim} />
          </TouchableOpacity>
        </View>
      </View>

      <LibraryScreen
        books={allBooks}
        filteredBooks={filteredBooks}
        activeFilter={activeFilter}
        currentlyReading={currentlyReading}
        booksFinished={booksFinished}
        readingGoal={readingGoal}
        onFilterChange={setFilter}
        onBookPress={(id) => router.push(`/book/${id}`)}
        onResumeReading={(id) => router.push(`/book/${id}`)}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.containerPadding,
    paddingTop: 52,
    paddingBottom: 12,
    backgroundColor: '#061422',
    borderBottomWidth: 1,
    borderBottomColor: '#1c2d3d',
  },
  logo: {
    ...typography.headlineMd,
    color: colors.tertiary,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  topActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
