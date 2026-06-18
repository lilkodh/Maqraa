import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import StatCard from '../components/StatCard';
import { colors, typography, spacing, radii, glassMorphism, shadows } from '../utils/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AVATAR_URI = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC48zS_omS_vZ9dNPLiIPHgCvDD7mO9a14RmLKKwbc0OUt3Q1Q78-GGblj0ddqcyKpsx8YJgmzdz8X1nPqBOyT0WA-Hs1pPKEQmIMRamq24XM7AzZOsoQkiJPy-srLdEXkdS36ARtKrN8MaDMrlLI13ukyh7v0w9Z0gJ0fEtW-5nGmb1bFi77-OKunNl5jaKGwu1A4UjfObI-iCwjQp_WR3VFtgdAz_qJLCb2wDP5ephmigZroxnfIE3G6yMfDfSjkz0h2cfqu3wp-s';

const BAR_DATA = [
  { month: 'January',  books: 8,  pct: 80 },
  { month: 'February', books: 5,  pct: 50 },
  { month: 'March',    books: 12, pct: 95 },
  { month: 'April',    books: 3,  pct: 30 },
];

const ACHIEVEMENTS = [
  {
    id: 'speed',
    label: 'Speed Reader',
    iconName: 'lightning-bolt',
    iconSet: 'mci',
    unlocked: true,
    color: colors.emeraldSuccess,
  },
  {
    id: 'night',
    label: 'Night Owl',
    iconName: 'owl',
    iconSet: 'mci',
    unlocked: true,
    color: colors.tertiaryFixedDim,
  },
  {
    id: 'historian',
    label: 'Historian',
    iconName: 'lock',
    iconSet: 'ion',
    unlocked: false,
    color: colors.outline,
  },
];

/**
 * StatsScreen — Presentation layer
 * Props passed from app/stats.js route.
 */
const StatsScreen = ({ profile }) => {
  const insets = useSafeAreaInsets();

  if (!profile) return null;

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
        {/* ── Profile section ─────────────────────── */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.profileSection}>
          {/* Avatar ring */}
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: AVATAR_URI }}
              style={styles.avatar}
              resizeMode="cover"
            />
            {/* Badge */}
            <View style={styles.avatarBadge}>
              <MaterialCommunityIcons name="book-open-variant" size={14} color={colors.onTertiaryFixed} />
            </View>
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileTitle}>{profile.title}</Text>
        </Animated.View>

        {/* ── Curved divider ──────────────────────── */}
        <Animated.View entering={FadeInDown.duration(500).delay(100)} style={styles.dividerWrapper}>
          <LinearGradient
            colors={['transparent', colors.primaryFixedDim, colors.secondaryContainer, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.divider}
          />
        </Animated.View>

        {/* ── Stats 2×2 grid ──────────────────────── */}
        <View style={styles.statsGrid}>
          <Animated.View entering={FadeInDown.duration(500).delay(150)}>
            <StatCard
              label="Books Read"
              value={profile.booksRead.toString()}
              icon={<MaterialCommunityIcons name="book-multiple" size={22} color={colors.primaryFixedDim} />}
              style={styles.statCardItem}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            <StatCard
              label="Current Streak"
              value={profile.currentStreak.toString()}
              unit="Days"
              icon={<MaterialCommunityIcons name="fire" size={22} color={colors.tertiaryFixedDim} />}
              highlight
              style={styles.statCardItem}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(250)}>
            <StatCard
              label="Pages This Month"
              value={profile.pagesThisMonth.toLocaleString()}
              icon={<MaterialCommunityIcons name="file-document-multiple-outline" size={22} color={colors.primaryFixedDim} />}
              style={styles.statCardItem}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(300)}>
            <StatCard
              label="Reading Time"
              value={profile.readingTimeHours.toString()}
              unit="hrs"
              icon={<MaterialCommunityIcons name="timer-outline" size={22} color={colors.primaryFixedDim} />}
              style={styles.statCardItem}
            />
          </Animated.View>
        </View>

        {/* ── Bar chart card ──────────────────────── */}
        <Animated.View entering={FadeInDown.duration(600).delay(350)} style={[glassMorphism.cardLiquid, styles.chartCard]}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Books per Month</Text>
            <View style={styles.chartBadge}>
              <Text style={styles.chartBadgeText}>Yearly Recap</Text>
            </View>
          </View>

          <View style={styles.barsWrapper}>
            {BAR_DATA.map((d) => (
              <View key={d.month} style={styles.barItem}>
                <View style={styles.barLabelRow}>
                  <Text style={styles.barMonth}>{d.month}</Text>
                  <Text style={styles.barValue}>{d.books} Books</Text>
                </View>
                <View style={styles.barTrack}>
                  <LinearGradient
                    colors={[colors.primaryFixedDim, colors.secondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.barFill, { width: `${d.pct}%` }]}
                  />
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ── Achievements ────────────────────────── */}
        <View style={styles.achievementsSection}>
          <Animated.View entering={FadeInDown.duration(500).delay(400)}>
            <Text style={styles.achievementsTitle}>Mastery Badges</Text>
          </Animated.View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsScroll}
          >
            {ACHIEVEMENTS.map((a, index) => (
              <Animated.View
                key={a.id}
                entering={FadeInDown.duration(500).delay(450 + index * 60)}
                style={[
                  glassMorphism.cardLiquid,
                  styles.achievementCard,
                  !a.unlocked && styles.achievementLocked,
                ]}
              >
                <View
                  style={[
                    styles.achievementIcon,
                    { borderColor: a.color + '60', backgroundColor: a.color + '18' },
                  ]}
                >
                  {a.iconSet === 'ion' ? (
                    <Ionicons name={a.iconName} size={28} color={a.unlocked ? a.color : colors.outline} />
                  ) : (
                    <MaterialCommunityIcons name={a.iconName} size={28} color={a.unlocked ? a.color : colors.outline} />
                  )}
                </View>
                <Text
                  style={[
                    styles.achievementLabel,
                    { color: a.unlocked ? colors.ivoryWhite : colors.outline },
                  ]}
                >
                  {a.label}
                </Text>
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.containerPadding,
  },

  // Profile
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    marginBottom: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 2,
    borderColor: '#1c2d3d',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.tertiaryFixedDim,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  profileName: {
    ...typography.headlineLgMobile,
    color: colors.tertiaryFixedDim,
    marginBottom: 4,
  },
  profileTitle: {
    ...typography.labelMd,
    color: colors.cyanGrey,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  // Divider
  dividerWrapper: { marginBottom: 24 },
  divider: { height: 1.5, borderRadius: 1 },

  // Stats grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCardItem: {
    width: (SCREEN_WIDTH - spacing.containerPadding * 2 - 12) / 2,
  },

  // Chart
  chartCard: {
    borderRadius: radii.md,
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },

  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  chartTitle: {
    ...typography.headlineMd,
    color: colors.ivoryWhite,
  },
  chartBadge: {
    backgroundColor: '#0d2f3c',
    borderWidth: 1,
    borderColor: colors.primaryFixedDim,
    borderRadius: radii.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  chartBadgeText: {
    ...typography.dataMono,
    fontSize: 11,
    color: colors.primaryFixedDim,
  },
  barsWrapper: { gap: 16 },
  barItem: { gap: 6 },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barValue: {
    ...typography.dataMono,
    fontSize: 11,
    color: colors.cyanGrey,
  },
  barTrack: {
    height: 12,
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: radii.full,
    minWidth: 4,
  },
  barMonth: {
    ...typography.labelMd,
    fontSize: 13,
    color: colors.cyanGrey,
  },

  // Achievements
  achievementsSection: { marginBottom: 8 },
  achievementsTitle: {
    ...typography.headlineMd,
    color: colors.ivoryWhite,
    marginBottom: 14,
  },
  achievementsScroll: {
    gap: 12,
    paddingRight: spacing.containerPadding,
  },
  achievementCard: {
    width: 130,
    borderRadius: radii.md,
    padding: 16,
    alignItems: 'center',
    gap: 10,
  },
  achievementLocked: {
    opacity: 0.4,
  },
  achievementIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  achievementLabel: {
    ...typography.labelMd,
    textAlign: 'center',
  },
});

export default StatsScreen;
