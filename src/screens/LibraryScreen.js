import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { colors, radii, spacing, typography, shadows } from '../utils/theme';
import BookCard from '../components/BookCard';
import ProgressRing from '../components/ProgressRing';
import { StatCard } from '../components/StatCard';

export default function LibraryScreen({
  books = [],
  goalCount = 20,
  finishedBooksCount = 12,
  streakCount = 12,
  totalPagesRead = 1200,
  onSelectBook,
  onAddBook,
}) {
  const goalProgress = goalCount > 0 ? finishedBooksCount / goalCount : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHzrnCzrjwiROv4PgItFRGi_VHtq8llyf5FvHi7lnD5c8IPzpKhVNCIyVosynMT0wUrjgEd-BIUKidJzTCpiIxT6tcMjSbDghw6khyZYiTEcf4mNw7Rdb1ziSYiqlmjyADoNYl2guZvJWLVWO4WpjTjBsgKqeIaY88ZTrAj0TzEh3hiw8JIKH5H6jVUFs8JWoy2XldrZ7tHpj5RJyn_3cfbFFtW62BP4MRPL3Z8MypK1elrpJzmf-ErSpdkFtGBNv9nRwH_T0plQI',
              }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.welcomeText}>Good morning,</Text>
            <Text style={styles.userName}>Youssef</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerSearchButton} activeOpacity={0.7}>
          <MaterialIcons name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Categories Tab Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {['General', 'History', 'Literature', 'Magazine', 'Diary'].map((cat, idx) => {
            const isActive = idx === 0; // General active
            return (
              <View key={cat} style={styles.categoryWrapper}>
                <TouchableOpacity
                  style={[styles.categoryCard, isActive && styles.categoryCardActive, shadows.card]}
                  activeOpacity={0.8}
                >
                  <MaterialIcons
                    name={idx === 0 ? 'auto-stories' : idx === 1 ? 'history' : idx === 2 ? 'self-improvement' : idx === 3 ? 'article' : 'menu-book'}
                    size={20}
                    color={isActive ? colors.secondary : colors.textSecondary}
                  />
                </TouchableOpacity>
                <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>{cat}</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Search Pill */}
        <View style={styles.searchContainer}>
          <View style={styles.searchPill}>
            <MaterialIcons name="search" size={22} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              placeholder="Search your library..."
              placeholderTextColor={colors.textSecondary}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Goal Card */}
        <View style={[styles.goalCard, shadows.card]}>
          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>2026 Goal</Text>
            <Text style={styles.goalSubtitle}>{finishedBooksCount} of {goalCount} books completed</Text>
            <View style={styles.onTrackBadge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>On Track</Text>
            </View>
          </View>
          <ProgressRing progress={goalProgress} size={88} strokeWidth={8} />
        </View>

        {/* All Books Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Books</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.showMoreButton}>Show More</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.booksCarousel}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} onPress={() => onSelectBook(book.id)} />
          ))}
        </ScrollView>

        {/* Section Divider (Wavy Line) */}
        <View style={styles.dividerContainer}>
          <Svg height="12" width="100%" viewBox="0 0 100 12" preserveAspectRatio="none">
            <Path d="M0 10C25 10 25 2 50 2C75 2 75 10 100 10" stroke="#bdc9c1" strokeWidth="1.5" fill="none" />
          </Svg>
        </View>

        {/* Statistics Section */}
        <Text style={styles.sectionTitleStats}>Statistics</Text>
        <View style={styles.statsGrid}>
          <StatCard title="Total Books" value={books.length} iconName="library-books" iconColor={colors.secondary} />
          <StatCard title="Pages Read" value={totalPagesRead >= 1000 ? `${(totalPagesRead / 1000).toFixed(1)}k` : totalPagesRead} iconName="auto-stories" iconColor={colors.primary} />
          <StatCard title="This Month" value={finishedBooksCount} iconName="verified" iconColor={colors.tertiary} />
          <StatCard title="Day Streak" value={streakCount} iconName="whatshot" iconColor={colors.secondary} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginEdge,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(250, 246, 240, 0.8)',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.surfaceContainerHighest,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileText: {
    marginLeft: 12,
  },
  welcomeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
  userName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  headerSearchButton: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0d0d0d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scrollContent: {
    paddingBottom: 120, // space for bottom nav
  },
  categoriesContainer: {
    marginVertical: spacing.sm,
  },
  categoriesContent: {
    paddingHorizontal: spacing.marginEdge,
    paddingRight: spacing.marginEdge + 12,
  },
  categoryWrapper: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryCard: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  categoryCardActive: {
    width: 56,
    height: 56,
    borderRadius: radii.xl,
    opacity: 1,
    backgroundColor: colors.white,
  },
  categoryLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  categoryLabelActive: {
    fontFamily: 'Inter_600SemiBold',
    color: colors.secondary,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: spacing.marginEdge,
    marginVertical: spacing.md,
  },
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2EEE8',
    borderRadius: radii.full,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_300Light',
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
  },
  goalCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.marginEdge,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  goalSubtitle: {
    fontFamily: 'Inter_300Light',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  onTrackBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(156, 68, 15, 0.1)',
    borderRadius: radii.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.tertiary,
    marginRight: 6,
  },
  badgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: colors.tertiary,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginEdge,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 22,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  showMoreButton: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: colors.secondary,
  },
  booksCarousel: {
    paddingLeft: spacing.marginEdge,
    paddingRight: spacing.marginEdge - 16,
    paddingVertical: 8,
  },
  dividerContainer: {
    paddingHorizontal: spacing.marginEdge,
    marginVertical: spacing.lg,
    opacity: 0.4,
  },
  sectionTitleStats: {
    fontFamily: 'Inter_500Medium',
    fontSize: 22,
    color: colors.textPrimary,
    fontWeight: '500',
    paddingHorizontal: spacing.marginEdge,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginEdge,
  },
});
