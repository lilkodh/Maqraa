import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import BookCard from '../components/BookCard';
import ProgressRing from '../components/ProgressRing';
import EmptyState from '../components/Emptystate';
import { colors, typography, spacing, radii, glassMorphism, shadows } from '../utils/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const FILTERS = [
  { key: 'all',         label: 'All' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'to_read',    label: 'To Read' },
  { key: 'finished',   label: 'Finished' },
];

/**
 * LibraryScreen — Presentation layer
 * Props passed from app/index.js route.
 */
const LibraryScreen = ({
  books,
  filteredBooks,
  activeFilter,
  currentlyReading,
  booksFinished,
  readingGoal,
  onFilterChange,
  onBookPress,
  onResumeReading,
}) => {
  const insets = useSafeAreaInsets();
  const goalProgress = Math.round((booksFinished / readingGoal) * 100);
  const isArabicFeatured = currentlyReading?.language === 'Arabic';
  const featuredTextAlign = isArabicFeatured ? { textAlign: 'right', writingDirection: 'rtl' } : {};

  const renderBookCard = useCallback(({ item }) => (
    <View style={styles.bookCardWrapper}>
      <BookCard book={item} onPress={() => onBookPress(item.id)} />
    </View>
  ), [onBookPress]);

  return (
    <View style={styles.root}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 72, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Filter tabs ─────────────────────────── */}
        <Animated.View entering={FadeInDown.duration(500)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
            style={styles.filterScroll}
          >
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.key;
              return (
                <TouchableOpacity
                  key={f.key}
                  onPress={() => onFilterChange(f.key)}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.filterLabel, isActive && styles.filterLabelActive]}>
                    {f.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* ── Curved divider ──────────────────────── */}
        <View style={styles.dividerWrapper}>
          <LinearGradient
            colors={[colors.primaryContainer, colors.tertiaryFixedDim]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.divider}
          />
        </View>

        {/* ── Currently Reading feature card ──────── */}
        {currentlyReading && (
          <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Currently Reading</Text>
              <View style={styles.goalRingWrapper}>
                <ProgressRing
                  size={56}
                  progress={goalProgress}
                  strokeWidth={4}
                  label={`${booksFinished}/${readingGoal}`}
                />
              </View>
            </View>

            {/* Featured card — liquid glass */}
            <View style={styles.featuredCard}>
              <View style={[glassMorphism.cardLiquid, styles.featuredInner, isArabicFeatured && { flexDirection: 'row-reverse' }]}>

                {/* Cover */}
                <View style={styles.featuredCoverWrapper}>
                  <Image
                    source={{ uri: currentlyReading.cover }}
                    style={styles.featuredCover}
                    resizeMode="cover"
                  />
                  <View style={[styles.featuredSpine, isArabicFeatured && { left: undefined, right: 0 }]} />
                </View>

                {/* Info */}
                <View style={[styles.featuredInfo, isArabicFeatured && { alignItems: 'flex-end' }]}>
                  <Text style={[styles.featuredSince, featuredTextAlign]}>
                    {isArabicFeatured ? `قراءة منذ ${currentlyReading.startedDate}` : `Reading Since ${currentlyReading.startedDate}`}
                  </Text>
                  <Text style={[styles.featuredTitle, featuredTextAlign]} numberOfLines={2}>
                    {currentlyReading.title}
                  </Text>
                  <Text style={[styles.featuredAuthor, featuredTextAlign]}>
                    {isArabicFeatured ? 'بقلم ' : 'By '}{currentlyReading.author}
                  </Text>

                  {/* Progress ring + page count */}
                  <View style={[styles.featuredProgressRow, isArabicFeatured && { flexDirection: 'row-reverse' }]}>
                    <ProgressRing
                      size={48}
                      progress={currentlyReading.progress}
                      strokeWidth={4}
                      label={`${currentlyReading.progress}%`}
                    />
                    <Text style={styles.featuredPages}>
                      {isArabicFeatured ? `صفحة ${currentlyReading.currentPage} / ${currentlyReading.totalPages}` : `${currentlyReading.currentPage} / ${currentlyReading.totalPages} pages`}
                    </Text>
                  </View>

                  {/* CTA */}
                  <TouchableOpacity
                    style={[styles.resumeBtn, isArabicFeatured && { alignSelf: 'flex-end' }]}
                    onPress={() => onResumeReading(currentlyReading.id)}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={[colors.primaryContainer, colors.secondaryContainer]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.resumeBtnGradient, isArabicFeatured && { flexDirection: 'row-reverse' }]}
                    >
                      <MaterialCommunityIcons
                        name="book-open-variant"
                        size={14}
                        color={colors.onPrimaryFixed}
                        style={isArabicFeatured ? { marginLeft: 6 } : { marginRight: 6 }}
                      />
                      <Text style={styles.resumeBtnText}>
                        {isArabicFeatured ? 'متابعة القراءة' : 'Resume Reading'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {/* ── Your Collection grid ────────────────── */}
        <Animated.View entering={FadeInDown.duration(600).delay(150)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitleMd}>Your Collection</Text>
            <Text style={styles.viewAll}>View All →</Text>
          </View>

          {filteredBooks.length === 0 ? (
            <EmptyState
              title="No books here"
              message="Try a different filter or add some books to your library."
            />
          ) : (
            <View style={styles.bookGrid}>
              {filteredBooks.map((book, index) => (
                <Animated.View
                  key={book.id}
                  entering={FadeInDown.duration(500).delay(200 + index * 60)}
                  style={styles.bookCardWrapper}
                >
                  <BookCard book={book} onPress={() => onBookPress(book.id)} />
                </Animated.View>
              ))}
            </View>
          )}
        </Animated.View>

        {/* ── Quick stats strip ───────────────────── */}
        <Animated.View entering={FadeInDown.duration(600).delay(350)} style={styles.statsStrip}>
          <View style={[glassMorphism.cardLiquid, styles.statPill]}>
            <MaterialCommunityIcons name="timer-outline" size={18} color={colors.primaryFixedDim} style={{ marginBottom: 4 }} />
            <Text style={styles.statPillValue}>148.5</Text>
            <Text style={styles.statPillLabel}>hrs read</Text>
          </View>
          <View style={[glassMorphism.cardStreak, styles.statPill]}>
            <MaterialCommunityIcons name="fire" size={18} color={colors.tertiaryFixedDim} style={{ marginBottom: 4 }} />
            <Text style={[styles.statPillValue, { color: colors.tertiaryFixedDim }]}>
              {currentlyReading ? '12' : '—'}
            </Text>
            <Text style={styles.statPillLabel}>day streak</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.containerPadding,
  },

  // Filter tabs
  filterScroll: { marginBottom: 4 },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: spacing.containerPadding,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: radii.full,
    ...glassMorphism.cardLiquid,
    borderRadius: radii.full,
  },
  filterPillActive: {
    backgroundColor: '#0c2a39',
    borderColor: colors.primaryFixedDim,
    shadowColor: '#00daf3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  filterLabel: {
    ...typography.labelMd,
    color: colors.cyanGrey,
  },
  filterLabelActive: {
    color: colors.primaryFixedDim,
  },

  // Divider
  dividerWrapper: { marginVertical: 16 },
  divider: {
    height: 2,
    borderRadius: 1,
    opacity: 0.9,
    shadowColor: '#00daf3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
  },

  // Section
  section: { marginBottom: spacing.sectionGap },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.headlineLgMobile,
    color: colors.onSurface,
  },
  sectionTitleMd: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  goalRingWrapper: {},
  viewAll: {
    ...typography.labelMd,
    color: colors.primaryFixedDim,
  },

  // Featured card (liquid glass)
  featuredCard: {
    position: 'relative',
  },
  featuredInner: {
    borderRadius: radii.lg,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  featuredCoverWrapper: {
    width: 100,
    height: 150,
    borderRadius: radii.sm,
    overflow: 'hidden',
    flexShrink: 0,
    ...shadows.card,
  },
  featuredCover: { width: '100%', height: '100%' },
  featuredSpine: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0,
    width: 5,
    backgroundColor: '#000000',
  },
  featuredInfo: { flex: 1 },
  featuredSince: {
    ...typography.dataMono,
    fontSize: 10,
    color: colors.primaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  featuredTitle: {
    ...typography.headlineMd,
    color: colors.ivoryWhite,
    marginBottom: 4,
  },
  featuredAuthor: {
    ...typography.bodyMd,
    color: colors.cyanGrey,
    marginBottom: 12,
  },
  featuredProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  featuredPages: {
    ...typography.dataMono,
    fontSize: 11,
    color: colors.cyanGrey,
  },
  resumeBtn: {
    borderRadius: radii.full,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  resumeBtnGradient: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resumeBtnText: {
    ...typography.labelMd,
    color: colors.onPrimaryFixed,
    fontFamily: 'Inter_600SemiBold',
  },

  // Book grid
  bookGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  bookCardWrapper: {
    width: (SCREEN_WIDTH - spacing.containerPadding * 2 - 16) / 2,
  },

  // Stats strip
  statsStrip: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  statPill: {
    flex: 1,
    borderRadius: radii.md,
    padding: 16,
    alignItems: 'center',
  },
  statPillValue: {
    ...typography.headlineMd,
    color: colors.primaryFixedDim,
    marginBottom: 2,
  },
  statPillLabel: {
    ...typography.labelMd,
    fontSize: 11,
    color: colors.cyanGrey,
  },
});

export default LibraryScreen;
