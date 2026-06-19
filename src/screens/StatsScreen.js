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
import { colors, radii, spacing, typography } from '../utils/theme';
import StatCard from '../components/StatCard';
import { formatDurationFriendly } from '../utils/calculations';

const { width } = Dimensions.get('window');

export default function StatsScreen({
  userProfile = {
    name: 'Omar Al-Khayyam',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9csWBJMtYUDUTyoW4Suq3RqXkksGEC2iUNEN_UOP62SDHzO7AwzFrEcVqDUqQhQOSu6ZOdR83bAWiZEL6D-falIWR-bAmS054VAPiALtNNYR6kWHZVjtn7ha0_eIZjoP42GGeUMaXf-Jovg_cjOzsmQnS5wdlan0MyFeKPQo_LSe0zmXSC7EPn7TJXF7I50HcD5X36wVN9xtkUYkpH0b26d_PNiqaUQFQnXt19glKgZ1YRGw_5_TGqezByEDN2VaaLdVTXq2xOZbh',
    title: 'Sage of the Seventh Circle',
  },
  stats = {
    streak: 42,
    booksRead: 18,
    readingTimeHours: 248,
    level: 'Expert',
  },
  weeklyData = [
    { day: 'MON', hours: 4.2, percent: 85 },
    { day: 'TUE', hours: 2.8, percent: 60 },
    { day: 'WED', hours: 5.1, percent: 95 },
    { day: 'THU', hours: 3.4, percent: 70 },
  ],
  sessions = [],
  onNavigateToLibrary = () => {},
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
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.logo}>Maqra</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Profile Section */}
          <View style={styles.profileHero}>
            <View style={styles.avatarBorderGlow}>
              <View style={styles.avatarInnerBorder}>
                <Image source={{ uri: userProfile.avatarUrl }} style={styles.avatar} />
              </View>
            </View>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileTitle}>{userProfile.title}</Text>
            
            {/* Custom S-curve Fold mask simulation */}
            <View style={styles.sCurveHinge} />
          </View>

          {/* Performance Bento Grid */}
          <View style={styles.matrixSection}>
            <View style={styles.matrixRow}>
              <StatCard
                title="Current Streak"
                value={`${stats.streak} days`}
                icon="🔥"
                style={styles.cardElevated}
              />
              <StatCard
                title="Books Finished"
                value={String(stats.booksRead)}
                icon="📖"
              />
            </View>
            <View style={styles.matrixRow}>
              <StatCard
                title="Reading Time"
                value={`${stats.readingTimeHours}h`}
                icon="⏱️"
              />
              <StatCard
                title="Insight Level"
                value={stats.level}
                icon="🏆"
              />
            </View>
          </View>

          {/* Zellige Graph weekly bar chart */}
          <View style={styles.graphCard}>
            <Text style={styles.graphTitle}>Scholarly Cadence</Text>
            <View style={styles.graphContainer}>
              {weeklyData.map((item) => (
                <View key={item.day} style={styles.graphBarRow}>
                  <View style={styles.barHeader}>
                    <Text style={styles.barDay}>{item.day}</Text>
                    <Text style={styles.barHours}>{item.hours} hrs</Text>
                  </View>
                  <View style={styles.barBg}>
                    <LinearGradient
                      colors={['#4E8EA2', '#7BBDE8']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.barFill, { width: `${item.percent}%` }]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Session Ledger timeline */}
          <View style={styles.ledgerSection}>
            <Text style={styles.ledgerTitle}>Reading Records</Text>
            <View style={styles.ledgerTimeline}>
              {/* Vertical line indicator */}
              <View style={styles.timelineLine} />

              {sessions.length > 0 ? (
                sessions.map((session, index) => (
                  <View key={session.id || index} style={styles.ledgerItem}>
                    {/* Timeline Node dot */}
                    <View style={styles.timelineNode}>
                      <View style={styles.timelineDot} />
                    </View>
                    
                    <View style={styles.ledgerContent}>
                      <View style={styles.ledgerHeaderRow}>
                        <Text style={styles.ledgerBookTitle}>{session.bookTitle}</Text>
                        <Text style={styles.ledgerTime}>
                          {new Date(session.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Text>
                      </View>
                      
                      <Text style={styles.ledgerNotes}>
                        {session.notes || 'Focused reading session.'}
                      </Text>
                      
                      <View style={styles.ledgerMetaRow}>
                        <View style={styles.metaBadge}>
                          <Text style={styles.metaBadgeText}>
                            ⏱️ {formatDurationFriendly(session.durationSeconds)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyTimelineText}>No session logs recorded yet.</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Floating Glass Bottom Tab Nav Bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.glassNav}>
          <TouchableOpacity style={styles.navItem} onPress={onNavigateToLibrary}>
            <Text style={styles.navIcon}>📖</Text>
            <Text style={styles.navText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <Text style={[styles.navIcon, styles.navIconActive]}>📊</Text>
            <Text style={[styles.navText, styles.navTextActive]}>Stats</Text>
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
    fontFamily: typography.headlineLgMobile.fontFamily,
    fontSize: 22,
    fontWeight: '800',
    color: colors.secondaryContainer,
    textShadowColor: 'rgba(238,152,0,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 22,
    color: colors.secondary,
  },
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 20,
    color: colors.secondary,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  profileHero: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 48,
    backgroundColor: '#001D39',
    position: 'relative',
  },
  avatarBorderGlow: {
    padding: 3,
    borderRadius: radii.full,
    backgroundColor: colors.secondaryContainer,
    shadowColor: 'rgba(238, 152, 0, 0.4)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    marginBottom: 20,
  },
  avatarInnerBorder: {
    width: 120,
    height: 120,
    borderRadius: radii.full,
    borderWidth: 4,
    borderColor: '#001D39',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileName: {
    fontFamily: typography.headlineLg.fontFamily,
    fontSize: 24,
    color: colors.secondary,
    marginBottom: 4,
  },
  profileTitle: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  sCurveHinge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#00142a',
    borderTopLeftRadius: radii.md,
    borderTopRightRadius: radii.md,
  },
  matrixSection: {
    paddingHorizontal: spacing.marginMobile,
    marginTop: -20,
    gap: spacing.gutter,
  },
  matrixRow: {
    flexDirection: 'row',
    gap: spacing.gutter,
  },
  cardElevated: {
    shadowColor: 'rgba(238, 152, 0, 0.3)',
    shadowRadius: 15,
  },
  graphCard: {
    backgroundColor: 'rgba(29, 54, 83, 0.3)',
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: spacing.marginMobile,
    marginTop: spacing.gutter,
    padding: 24,
  },
  graphTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 20,
  },
  graphContainer: {
    gap: 16,
  },
  graphBarRow: {
    gap: 6,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barDay: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  barHours: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 10,
    color: colors.primary,
  },
  barBg: {
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: radii.full,
  },
  ledgerSection: {
    paddingHorizontal: spacing.marginMobile,
    marginTop: 32,
  },
  ledgerTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 20,
    paddingLeft: 4,
  },
  ledgerTimeline: {
    position: 'relative',
    paddingLeft: 8,
  },
  timelineLine: {
    position: 'absolute',
    left: 23,
    top: 10,
    bottom: 10,
    width: 1,
    backgroundColor: colors.secondary,
    opacity: 0.25,
  },
  ledgerItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineNode: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  ledgerContent: {
    flex: 1,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingBottom: 16,
  },
  ledgerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  ledgerBookTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 16,
    color: colors.primary,
  },
  ledgerTime: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 9,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  ledgerNotes: {
    fontFamily: typography.bodyMd.fontFamily,
    fontSize: 13,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    opacity: 0.8,
    marginBottom: 10,
  },
  ledgerMetaRow: {
    flexDirection: 'row',
  },
  metaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: radii.full,
  },
  metaBadgeText: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 9,
    color: colors.tertiary,
  },
  emptyTimelineText: {
    fontFamily: typography.bodyMd.fontFamily,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingVertical: 20,
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
    width: '90%',
    maxWidth: 400,
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radii.full,
  },
  navItemActive: {
    backgroundColor: colors.tertiaryContainer,
    shadowColor: 'rgba(94, 236, 176, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  navIcon: {
    fontSize: 20,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
  },
  navText: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  navTextActive: {
    color: colors.onTertiaryContainer,
    fontWeight: '700',
  },
});
