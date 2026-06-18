import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProgressRing from '../components/ProgressRing';
import { colors, typography, spacing, radii, glassMorphism, shadows } from '../utils/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Star rating ──────────────────────────────────────────────
const StarIcon = ({ filled }) => (
  <MaterialCommunityIcons
    name={filled === 'half' ? 'star-half-full' : filled ? 'star' : 'star-outline'}
    size={16}
    color={colors.tertiaryFixedDim}
  />
);

const RatingRow = ({ rating, isArabic }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i)         stars.push(<StarIcon key={i} filled />);
    else if (rating >= i - 0.5) stars.push(<StarIcon key={i} filled="half" />);
    else                     stars.push(<StarIcon key={i} />);
  }
  return (
    <View style={{ flexDirection: isArabic ? 'row-reverse' : 'row', alignItems: 'center', gap: 2 }}>
      {stars}
      <Text style={styles.ratingValue}>{rating > 0 ? ` ${rating}` : ''}</Text>
    </View>
  );
};

/**
 * BookDetailScreen — Presentation layer
 * Props passed from app/book/[id].js route.
 */
const BookDetailScreen = ({
  book,
  onBack,
  onMarkCompleted,
  onStartTimer,
  onPauseTimer,
  onStopTimer,
  timerSeconds,
  timerRunning,
}) => {
  const insets = useSafeAreaInsets();

  if (!book) return null;

  const isArabic = book.language === 'Arabic';

  const formatTimer = (s) => {
    const h   = Math.floor(s / 3600).toString().padStart(2, '0');
    const m   = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const pagesLeft = book.totalPages - book.currentPage;
  const sessionMinutes = Math.floor(timerSeconds / 60);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero / Floating Cover ──────────────── */}
        <View style={styles.heroWrapper}>

          {/* Back button */}
          <Animated.View entering={FadeInDown.duration(500)} style={[styles.backBtn, { top: insets.top + 8 }]}>
            <TouchableOpacity
              onPress={onBack}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
              activeOpacity={0.8}
            >
              <Ionicons name={isArabic ? "arrow-forward" : "arrow-back"} size={18} color={colors.onSurface} />
              <Text style={styles.backBtnText}>{isArabic ? 'رجوع' : 'Back'}</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Floating cover */}
          <Animated.View entering={FadeInDown.duration(600).delay(80)} style={styles.floatingCoverWrapper}>
            <Image
              source={{ uri: book.cover }}
              style={styles.floatingCover}
              resizeMode="cover"
            />
            <View style={[styles.coverSpine, isArabic && { left: undefined, right: 0 }]} />
          </Animated.View>
        </View>

        {/* ── Content area ────────────────────────── */}
        <View style={styles.content}>

          {/* Identity + progress ring */}
          <Animated.View entering={FadeInDown.duration(600).delay(150)} style={[styles.identityRow, isArabic && { flexDirection: 'row-reverse' }]}>
            <ProgressRing
              size={100}
              progress={book.progress}
              strokeWidth={6}
              label={`${book.progress}%`}
              labelStyle={{ fontSize: 16 }}
            />
            <View style={[styles.identityText, isArabic && { alignItems: 'flex-end' }]}>
              <Text style={[styles.bookTitle, isArabic && { textAlign: 'right', writingDirection: 'rtl' }]} numberOfLines={2}>{book.title}</Text>
              <Text style={[styles.bookAuthor, isArabic && { textAlign: 'right', writingDirection: 'rtl' }]}>{isArabic ? 'بقلم ' : 'By '}{book.author}</Text>
              <RatingRow rating={book.rating} isArabic={isArabic} />
              <View style={[styles.tagsRow, isArabic && { flexDirection: 'row-reverse' }]}>
                {book.language && (
                  <View style={styles.tag}><Text style={styles.tagText}>{isArabic && book.language === 'Arabic' ? 'العربية' : book.language}</Text></View>
                )}
                {book.genre?.map((g) => (
                  <View key={g} style={styles.tag}><Text style={styles.tagText}>{g}</Text></View>
                ))}
              </View>
            </View>
          </Animated.View>

          {/* ══════════════════════════════════════════════════════
               BIG READING TIMER CARD
          ══════════════════════════════════════════════════════ */}
          <Animated.View entering={FadeInDown.duration(600).delay(220)} style={styles.timerCardOuter}>
            <View style={[glassMorphism.cardLiquid, styles.timerCard]}>
              {/* Top row: label + running status */}
              <View style={styles.timerHeaderRow}>
                <View style={styles.timerLabelGroup}>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={16}
                    color={colors.primaryFixedDim}
                  />
                  <Text style={styles.timerLabel}>SESSION TIMER</Text>
                </View>
                <View style={[
                  styles.timerStatusPill,
                  timerRunning ? styles.timerStatusActive : styles.timerStatusIdle,
                ]}>
                  <View style={[
                    styles.timerStatusDot,
                    { backgroundColor: timerRunning ? colors.emeraldSuccess : colors.outline },
                  ]} />
                  <Text style={[
                    styles.timerStatusText,
                    { color: timerRunning ? colors.emeraldSuccess : colors.outline },
                  ]}>
                    {timerRunning ? 'Running' : 'Paused'}
                  </Text>
                </View>
              </View>

              {/* BIG timer display */}
              <Text style={styles.timerDisplay}>{formatTimer(timerSeconds)}</Text>

              {/* Session info sub-row */}
              <View style={styles.timerInfoRow}>
                <View style={styles.timerInfoChip}>
                  <MaterialCommunityIcons name="clock-fast" size={13} color={colors.cyanGrey} />
                  <Text style={styles.timerInfoText}>{sessionMinutes}m this session</Text>
                </View>
                <View style={styles.timerInfoChip}>
                  <MaterialCommunityIcons name="book-open-page-variant" size={13} color={colors.cyanGrey} />
                  <Text style={styles.timerInfoText}>{pagesLeft} pages left</Text>
                </View>
              </View>

              {/* Divider */}
              <View style={styles.timerDivider} />

              {/* Controls row — centered, larger buttons */}
              <View style={styles.timerControls}>
                {/* Stop */}
                <TouchableOpacity
                  onPress={onStopTimer}
                  style={[styles.timerBtnSecondary]}
                  activeOpacity={0.8}
                >
                  <Ionicons name="stop" size={22} color={colors.cyanGrey} />
                  <Text style={styles.timerBtnSecondaryLabel}>Stop</Text>
                </TouchableOpacity>

                 <TouchableOpacity
                  onPress={onStartTimer}
                  style={styles.timerBtnPlay}
                  activeOpacity={0.85}
                >
                  <View style={styles.timerBtnPlaySolid}>
                    <Ionicons name="play" size={28} color={colors.onPrimary} />
                  </View>
                </TouchableOpacity>

                {/* Pause */}
                <TouchableOpacity
                  onPress={onPauseTimer}
                  style={[styles.timerBtnSecondary]}
                  activeOpacity={0.8}
                >
                  <Ionicons name="pause" size={22} color={colors.cyanGrey} />
                  <Text style={styles.timerBtnSecondaryLabel}>Pause</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          {/* ── Meta stats 2×2 ──────────────────────── */}
          <View style={styles.metaGrid}>
            {[
              { label: isArabic ? 'الصفحات المتبقية' : 'Pages Left',  value: pagesLeft.toString(), icon: 'book-open-page-variant' },
              { label: isArabic ? 'معدل السرعة' : 'Avg. Speed',  value: isArabic ? '٢.٥ د/ص' : '2.5m/p',             icon: 'speedometer' },
              { label: isArabic ? 'بدأت في' : 'Started',     value: isArabic && book.startedDate === 'May 28' ? '٢٨ مايو' : (book.startedDate || '—'), icon: 'calendar-start' },
              { label: isArabic ? 'الهدف التالي' : 'Next Goal',   value: isArabic ? 'الفصل ٨' : 'Ch. 8',              icon: 'flag-outline' },
            ].map((item, index) => (
              <Animated.View
                key={item.label}
                entering={FadeInDown.duration(500).delay(280 + index * 60)}
                style={[glassMorphism.cardLiquid, styles.metaCard, isArabic && { alignItems: 'flex-end' }]}
              >
                <MaterialCommunityIcons name={item.icon} size={16} color={colors.primaryFixedDim} style={{ marginBottom: 6 }} />
                <Text style={[styles.metaLabel, isArabic && { textAlign: 'right', writingDirection: 'rtl' }]}>{item.label}</Text>
                <Text style={[styles.metaValue, isArabic && { textAlign: 'right', writingDirection: 'rtl' }]}>{item.value}</Text>
              </Animated.View>
            ))}
          </View>

          {/* ── Synopsis ────────────────────────────── */}
          {book.synopsis && (
            <Animated.View entering={FadeInDown.duration(600).delay(450)} style={[styles.synopsisSection, isArabic && { alignItems: 'flex-end' }]}>
              <Text style={[styles.synopsisTitle, isArabic && { textAlign: 'right', writingDirection: 'rtl' }]}>
                {isArabic ? 'نبذة عن الطبعة' : 'About this edition'}
              </Text>
              <Text style={[styles.synopsisText, isArabic && { textAlign: 'right', writingDirection: 'rtl' }]}>{book.synopsis}</Text>
            </Animated.View>
          )}
        </View>
      </ScrollView>

      {/* ── Pinned CTA ──────────────────────────── */}
      {book.status !== 'finished' && (
        <Animated.View entering={FadeInDown.duration(600).delay(500)} style={[styles.ctaWrapper, { paddingBottom: insets.bottom + 16, backgroundColor: colors.background }]}>
          <TouchableOpacity
            onPress={onMarkCompleted}
            style={styles.completedBtn}
            activeOpacity={0.85}
          >
            <View style={[styles.completedBtnSolid, isArabic && { flexDirection: 'row-reverse' }]}>
              <Ionicons name="checkmark-circle-outline" size={20} color={colors.ivoryWhite} style={isArabic ? { marginLeft: 8 } : { marginRight: 8 }} />
              <Text style={styles.completedBtnText}>{isArabic ? 'تحديد كمقروء' : 'Mark as Completed'}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: {},

  // ── Hero ──────────────────────────────────────────────────
  heroWrapper: {
    height: 320,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0e1d2a',
  },
  backBtn: {
    position: 'absolute',
    left: spacing.containerPadding,
    zIndex: 10,
    backgroundColor: '#13212e',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: '#1c2d3d',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backBtnText: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  floatingCoverWrapper: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    width: 130,
    height: 195,
    borderRadius: radii.sm,
    overflow: 'hidden',
    ...shadows.card,
    transform: [{ rotate: '-1deg' }],
  },
  floatingCover: { width: '100%', height: '100%' },
  coverSpine: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0,
    width: 5,
    backgroundColor: '#000000',
  },

  curveDivider: {
    height: 2,
    marginHorizontal: spacing.containerPadding,
    borderRadius: 1,
  },

  // ── Content ───────────────────────────────────────────────
  content: {
    paddingHorizontal: spacing.containerPadding,
    paddingTop: 20,
    gap: 20,
  },

  // ── Identity ─────────────────────────────────────────────
  identityRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  identityText: { flex: 1 },
  bookTitle: {
    ...typography.headlineLgMobile,
    color: colors.ivoryWhite,
    marginBottom: 4,
  },
  bookAuthor: {
    ...typography.bodyLg,
    color: colors.cyanGrey,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  ratingValue: {
    ...typography.labelMd,
    color: colors.outline,
    marginLeft: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  tag: {
    ...glassMorphism.cardLiquid,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: radii.full,
  },
  tagText: {
    ...typography.labelMd,
    fontSize: 12,
    color: colors.primaryFixed,
  },

  // ══════════════════════════════════════════════════════════
  // BIG TIMER CARD
  // ══════════════════════════════════════════════════════════
  timerCardOuter: {
    position: 'relative',
    marginVertical: 4,
  },

  timerCard: {
    borderRadius: radii.xl,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    overflow: 'hidden',
    gap: 0,
  },

  // Header row
  timerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timerLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: colors.primaryFixedDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  timerStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    borderWidth: 1,
  },
  timerStatusActive: {
    backgroundColor: '#0f3a2c',
    borderColor: '#10B981',
  },
  timerStatusIdle: {
    backgroundColor: '#1c2d3d',
    borderColor: '#3b494c',
  },
  timerStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  timerStatusText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
  },

  // ── THE BIG DISPLAY ───────────────────────────────────────
  timerDisplay: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 64,
    color: colors.onSurface,
    letterSpacing: -2,
    textAlign: 'center',
    marginBottom: 12,
  },

  // Info row
  timerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  timerInfoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timerInfoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: colors.cyanGrey,
  },

  timerDivider: {
    height: 1,
    backgroundColor: '#1c2d3d',
    marginBottom: 20,
  },

  // ── Controls ──────────────────────────────────────────────
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
  },
  timerBtnPlay: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
  },
  timerBtnPlaySolid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryFixedDim,
  },
  timerBtnSecondary: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    ...glassMorphism.cardLiquid,
  },
  timerBtnSecondaryLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: colors.cyanGrey,
    letterSpacing: 0.3,
  },

  // ── Meta grid ─────────────────────────────────────────────
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaCard: {
    width: (SCREEN_WIDTH - spacing.containerPadding * 2 - 10) / 2 - 5,
    borderRadius: radii.md,
    padding: 14,
  },
  metaLabel: {
    ...typography.labelMd,
    fontSize: 11,
    color: colors.cyanGrey,
    marginBottom: 4,
  },
  metaValue: {
    ...typography.headlineMd,
    fontSize: 20,
    color: colors.onSurface,
  },

  // ── Synopsis ──────────────────────────────────────────────
  synopsisSection: { gap: 8 },
  synopsisTitle: {
    ...typography.headlineMd,
    color: colors.ivoryWhite,
  },
  synopsisText: {
    ...typography.bodyLg,
    color: colors.outline,
    lineHeight: 26,
  },

  // ── Pinned CTA ────────────────────────────────────────────
  ctaWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 32,
    paddingHorizontal: spacing.containerPadding,
  },
  completedBtn: {
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  completedBtnSolid: {
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.emeraldSuccess,
  },
  completedBtnText: {
    ...typography.headlineMd,
    fontSize: 18,
    color: colors.ivoryWhite,
  },
});

export default BookDetailScreen;
