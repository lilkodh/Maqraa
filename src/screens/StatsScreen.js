import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../utils/theme';

const { width } = Dimensions.get('window');

export default function StatsScreen({
  userProfile = {
    name: 'Amine Benjelloun',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjpAr4IKyJplTS54j4KCvLpahxMkvxHtoUgizC1lG3XMw4oLMVhY6o36jwGf9nn9FeXJS-YfqZbVjyPJ-EsDFIeikibwKpIgqfH9AqUxOgTG3MIegmriwcQmaLzj3FHolcpNLIrllXm_o_xa1tp2jwYczZeCl1VJ7lgD9-t2iBks_yjrdZAYQ1kX2mP0pITSLOOpXugDboDF9RJd15YmaMyAZrwUsI28HJQNZ8PyP9s1vSJByYHHEOxReravT6ujW_HzcpEdI8Yiw',
    title: 'Master Librarian • Level 42',
  },
  stats = {
    streak: 12,
    booksRead: 128,
    readingTimeHours: 456,
  },
  weeklyData = [
    { month: 'Jan', percent: 40, active: false },
    { month: 'Feb', percent: 65, active: false },
    { month: 'Mar', percent: 55, active: false },
    { month: 'Apr', percent: 85, active: false },
    { month: 'May', percent: 95, active: true },
    { month: 'Jun', percent: 70, active: false },
  ],
  sessions = [
    {
      id: 'leo-africanus',
      title: 'Leo Africanus',
      coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0YDr5_opzGchV6RH8JfnDgYNBnlYUynqr4oERudRaHScnohxXbv0SuAbomcem-7LkBLNPHxbx4WRsiuMTA-Hfrse9wzdtzNA6yGBNdAxfRPTIaauIkZz4t4SfmabT5Qz_guIqRw6jAYDc9jolIT_DOxvLo1majtYrw4OCC-FzWVAAYTTfqeW2F7ttZ1A28TugZWfZ117wnQHmEsl3AxepuAlXKinMvEHzPARpZdOu0kt36WsMF8Mj2c4mY4NBKNYPX-RNeyN42AA',
      statusText: 'Completed • 2 hours ago',
      isGold: true,
      opacity: 1,
    },
    {
      id: 'the-muqaddimah',
      title: 'The Muqaddimah',
      coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4zIgv22E8kVyqRJbubkSH_aoI4pxC-GG-WBZo4XHJFNauZTW4nYMYS4SasP1WcehHr9UTlrShl4QtE7lJifu72ndA1Vnf6gJ_6m-CU13_mY56bht6iVT91EQVg1yVaYk5UYik9P6xQkZi6HkMTp63e1X5B4QfcyDUeSw43VNU2Nzlmig7-x_GGE0W1nK-TUxOUqJ5QIj61PjaTSiIyWv74do8viS4L41TV7RQDlheJ4Wrx7sR9oarDMaxk-9HKlbPazVhzEEAqgo',
      statusText: 'Reached Page 342 • Yesterday',
      isGold: false,
      opacity: 1,
    },
    {
      id: 'al-andalus-tales',
      title: 'Al-Andalus Tales',
      coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKgYRBY9pAVpwZ72mu2lqyGHwTJHx_8AL8PbSVoYFMVsG3PDOdVVuaeTdmVrkwIe-NRYEza_I7xQtfiB7ekGOEz4nVpSMR4QbAqnHtcOoKLu18lG49zMk2lAA9ZUFc6Sd25DjcLDm8GCR0EUfSrrK3iuGRPW49vuIufDLhCsw5cX6zE1uPKe2SnlGNvdtFsnMjRbbV3Ms_zkcn19f8Cf4p3mLSh1oJP7qBXGrrEALl4X0LxKWOhPdliF0krebIT7XV3u0P2SPPFkA',
      statusText: 'Added to Library • 3 days ago',
      isGold: false,
      opacity: 0.7,
      grayscale: true,
    },
  ],
  onNavigateToLibrary = () => {},
  onBookPress = () => {},
}) {
  return (
    <View style={styles.container}>
      {/* Background Dark Void */}
      <LinearGradient
        colors={['#00142a', '#000f21']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.latticePattern} pointerEvents="none" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header Navigation */}
        <View style={styles.header}>
          <Text style={styles.logo}>Maqra</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialIcons name="search" size={22} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialIcons name="settings" size={22} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Profile Section */}
          <View style={styles.profileHero}>
            <View style={styles.avatarBorderGlow}>
              <LinearGradient
                colors={[colors.tertiary, colors.primary, colors.secondary]}
                style={styles.avatarGradientBorder}
              >
                <View style={styles.avatarInnerBorder}>
                  <Image source={{ uri: userProfile.avatarUrl }} style={styles.avatar} />
                </View>
              </LinearGradient>
              <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={16} color={colors.primary} />
              </View>
            </View>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileTitle}>{userProfile.title}</Text>
          </View>

          {/* Performance Bento Grid - 3 Columns */}
          <View style={styles.matrixSection}>
            <View style={styles.matrixRow}>
              {/* Streak Card */}
              <View style={[styles.matrixCard, styles.streakCard]}>
                <MaterialIcons name="local-fire-department" size={24} color={colors.tertiary} style={styles.cardIcon} />
                <Text style={styles.cardValue}>{stats.streak} DAYS</Text>
                <Text style={styles.cardTitle}>Streak</Text>
              </View>
              
              {/* Books Card */}
              <View style={styles.matrixCard}>
                <MaterialIcons name="menu-book" size={24} color={colors.primary} style={styles.cardIcon} />
                <Text style={styles.cardValue}>{stats.booksRead}</Text>
                <Text style={styles.cardTitle}>Books</Text>
              </View>

              {/* Read Hours Card */}
              <View style={styles.matrixCard}>
                <MaterialIcons name="hourglass-empty" size={24} color={colors.secondary} style={styles.cardIcon} />
                <Text style={styles.cardValue}>{stats.readingTimeHours}h</Text>
                <Text style={styles.cardTitle}>Read</Text>
              </View>
            </View>
          </View>

          {/* Reading Flow monthly bar chart */}
          <View style={styles.graphCard}>
            <View style={styles.graphHeader}>
              <View>
                <Text style={styles.graphTitle}>Reading Flow</Text>
                <Text style={styles.graphSubtitle}>Pages consumed per month</Text>
              </View>
              <Text style={styles.graphGrowth}>+24%</Text>
            </View>
            
            <View style={styles.graphContainer}>
              {weeklyData.map((item) => (
                <View key={item.month} style={styles.graphBarColumn}>
                  <View style={styles.barBg}>
                    <LinearGradient
                      colors={item.active ? ['rgba(175, 202, 219, 0.2)', colors.secondary] : ['rgba(175, 202, 219, 0.1)', 'rgba(175, 202, 219, 0.5)']}
                      style={[styles.barFill, { height: `${item.percent}%` }]}
                    />
                  </View>
                  <Text style={[styles.barMonth, item.active && styles.barMonthActive]}>
                    {item.month}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Session Ledger timeline */}
          <View style={styles.ledgerSection}>
            <Text style={styles.ledgerTitle}>Reading Ledger</Text>
            <View style={styles.ledgerTimeline}>
              {/* Vertical line indicator */}
              <View style={styles.timelineLine} />

              {sessions.map((session, index) => (
                <View key={session.id || index} style={[styles.ledgerItem, { opacity: session.opacity }]}>
                  {/* Timeline Node dot */}
                  <View style={styles.timelineNode}>
                    <View style={[styles.timelineDotBorder, session.isGold && styles.timelineDotBorderGold]}>
                      <View style={[styles.timelineDotInner, session.isGold && styles.timelineDotInnerGold]} />
                    </View>
                  </View>
                  
                  {/* Ledger content card */}
                  <TouchableOpacity
                    style={[styles.ledgerContentCard, session.grayscale && styles.grayscaleCard]}
                    activeOpacity={0.8}
                    onPress={() => onBookPress(session.id)}
                  >
                    <Image source={{ uri: session.coverUrl }} style={styles.ledgerCover} />
                    <View style={styles.ledgerDetails}>
                      <Text style={styles.ledgerBookTitle}>{session.title}</Text>
                      <Text style={styles.ledgerStatusText}>{session.statusText}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Floating Glass Bottom Tab Nav Bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.glassNav}>
          <TouchableOpacity style={styles.navItem} onPress={onNavigateToLibrary}>
            <MaterialIcons name="local-library" size={24} color="rgba(255, 255, 255, 0.4)" />
            <Text style={styles.navText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => onNavigateToLibrary()}>
            <MaterialIcons name="auto-stories" size={24} color="rgba(255, 255, 255, 0.4)" />
            <Text style={styles.navText}>Reading</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <MaterialIcons name="person" size={24} color={colors.secondary} style={styles.navIconActive} />
            <Text style={[styles.navText, styles.navTextActive]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00142a',
  },
  safeArea: {
    flex: 1,
  },
  latticePattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.02,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  logo: {
    fontFamily: typography.headlineLg.fontFamily,
    fontSize: 22,
    fontWeight: '800',
    fontStyle: 'italic',
    color: colors.tertiary,
    textShadowColor: 'rgba(255, 185, 95, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionBtn: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  profileHero: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
  },
  avatarBorderGlow: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarGradientBorder: {
    width: 120,
    height: 120,
    borderRadius: radii.full,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInnerBorder: {
    width: '100%',
    height: '100%',
    borderRadius: radii.full,
    borderWidth: 3,
    borderColor: '#00142a',
    overflow: 'hidden',
    backgroundColor: '#00142a',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 32,
    height: 32,
    borderRadius: radii.full,
    backgroundColor: '#00142a',
    borderWidth: 3,
    borderColor: '#00142a',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  profileName: {
    fontFamily: typography.headlineLg.fontFamily,
    fontSize: 26,
    color: colors.onSurface,
    marginBottom: 4,
  },
  profileTitle: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  matrixSection: {
    paddingHorizontal: spacing.marginMobile,
    marginTop: 8,
    marginBottom: 24,
  },
  matrixRow: {
    flexDirection: 'row',
    gap: spacing.gutter,
  },
  matrixCard: {
    flex: 1,
    backgroundColor: 'rgba(29, 54, 83, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: radii.default,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 4,
  },
  streakCard: {
    borderTopWidth: 4,
    borderTopColor: colors.tertiary,
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardValue: {
    fontFamily: typography.timerMono.fontFamily,
    fontSize: 15,
    color: colors.onSurface,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardTitle: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  graphCard: {
    backgroundColor: 'rgba(29, 54, 83, 0.4)',
    borderRadius: radii.default,
    borderWidth: 1,
    borderColor: 'rgba(78, 222, 163, 0.1)',
    marginHorizontal: spacing.marginMobile,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 4,
    marginBottom: 24,
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  graphTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 20,
    color: colors.onSurface,
  },
  graphSubtitle: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  graphGrowth: {
    fontFamily: typography.timerMono.fontFamily,
    fontSize: 22,
    color: colors.primary,
    fontWeight: '700',
  },
  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingTop: 10,
  },
  graphBarColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barBg: {
    width: 24,
    height: 120,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: radii.full,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: radii.full,
  },
  barMonth: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 8,
  },
  barMonthActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  ledgerSection: {
    paddingHorizontal: spacing.marginMobile,
    marginTop: 8,
  },
  ledgerTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 20,
    color: colors.onSurface,
    marginBottom: 20,
    paddingLeft: 4,
  },
  ledgerTimeline: {
    position: 'relative',
    paddingLeft: 8,
  },
  timelineLine: {
    position: 'absolute',
    left: 20,
    top: 10,
    bottom: 10,
    width: 1,
    backgroundColor: colors.tertiary,
    opacity: 0.3,
  },
  ledgerItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  timelineNode: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotBorder: {
    width: 20,
    height: 20,
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: colors.outline,
    backgroundColor: '#00142a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotBorderGold: {
    borderColor: colors.tertiary,
  },
  timelineDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.outline,
  },
  timelineDotInnerGold: {
    backgroundColor: colors.tertiary,
  },
  ledgerContentCard: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
    backgroundColor: 'rgba(29, 54, 83, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(78, 222, 163, 0.15)',
    borderRadius: radii.default,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  grayscaleCard: {
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  ledgerCover: {
    width: 44,
    height: 60,
    borderRadius: radii.sm,
    resizeMode: 'cover',
  },
  ledgerDetails: {
    flex: 1,
    marginLeft: 16,
  },
  ledgerBookTitle: {
    fontFamily: typography.bodyLg.fontFamily,
    fontSize: 16,
    color: colors.onSurface,
    fontWeight: '600',
  },
  ledgerStatusText: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 500,
  },
  glassNav: {
    width: '95%',
    maxWidth: 360,
    height: 72,
    backgroundColor: 'rgba(0, 15, 33, 0.85)',
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  navItemActive: {
    shadowColor: 'rgba(175, 202, 219, 0.4)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  navIconActive: {
    color: colors.secondary,
  },
  navText: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 4,
  },
  navTextActive: {
    color: colors.secondary,
    fontWeight: '700',
  },
});
