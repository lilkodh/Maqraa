import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography, shadows } from '../utils/theme';
import { BottomNav } from '../components/StatCard';

export default function StatsScreen({
  streakCount = 12,
  finishedBooksCount = 14,
  totalPagesRead = 3420,
  totalReadingHours = 124,
  monthlyData = [],
  readingHistory = [],
  profilePhoto = null,
  onDeleteHistoryItem,
  onDeleteAllData,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Profile Panel (Dark Ink) */}
        <View style={styles.darkHeaderPanel}>
          <View style={styles.headerTopRow}>
            <Text style={styles.logoText}>Maqra</Text>
            <TouchableOpacity style={styles.searchButton}>
              <MaterialIcons name="search" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* User Identity */}
          <View style={styles.userIdentityContainer}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: profilePhoto || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMWJbRxJjQTZqNuMJ_f4i9_srRW-GoFDDQ3jkZndJuYFPM0b6ceTqyyWaQLncQTltwr-OE4zs-Ji_iXijltJTBnIRsp_kjBfqyCAfbrLPp9QAJekxXdAPJhepoDHoAy0yB7hqCkXhCuaXleYUmhdbUaIyVu3WZUFHPiV2Xg2VUTLTTP077M_sMRUbjI-yA6Eb1mfG33yK561Le4J2BWZjUFVeU0TdksIZ1po_5XS0JmefJoGG8KnSD23WxF0C59Gcb45r5IJDlCIE' }}
                style={styles.avatar}
              />
              <View style={styles.cameraBadge}>
                <MaterialIcons name="photo-camera" size={12} color={colors.white} />
              </View>
            </View>
            <Text style={styles.userName}>Youssef</Text>
            <Text style={styles.membershipText}>Member since 2024</Text>
          </View>

          {/* Stats Grid inside Header */}
          <View style={styles.headerStatsGrid}>
            <View style={styles.headerStatCard}>
              <Text style={styles.headerStatValue}>{finishedBooksCount}</Text>
              <Text style={styles.headerStatLabel}>Total Books</Text>
            </View>
            <View style={styles.headerStatCard}>
              <Text style={styles.headerStatValue}>{totalPagesRead.toLocaleString()}</Text>
              <Text style={styles.headerStatLabel}>Total Pages</Text>
            </View>
            <View style={styles.headerStatCard}>
              <Text style={styles.headerStatValue}>{totalReadingHours}</Text>
              <Text style={styles.headerStatLabel}>Total Hours</Text>
            </View>
            <View style={styles.headerStatCard}>
              <Text style={styles.headerStatValue}>{streakCount}</Text>
              <Text style={styles.headerStatLabel}>Day Streak</Text>
            </View>
          </View>
        </View>

        {/* Content Canvas */}
        <View style={styles.canvasContent}>
          {/* Monthly Chart Section */}
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={[styles.chartCard, shadows.card]}>
            <Text style={styles.chartSubtitle}>Books finished per month</Text>
            <View style={styles.chartBarsRow}>
              {monthlyData.map((data, index) => {
                const isActive = data.month === 'SEP'; // September is active
                const maxCount = Math.max(...monthlyData.map(d => d.count)) || 1;
                const barHeightPct = (data.count / maxCount) * 100;

                return (
                  <View key={data.month} style={styles.chartBarWrapper}>
                    <View style={styles.barBackground}>
                      <View
                        style={[
                          styles.barFill,
                          { height: `${barHeightPct}%` },
                          isActive ? styles.barFillActive : styles.barFillInactive,
                        ]}
                      />
                    </View>
                    <Text style={[styles.barLabel, isActive && styles.barLabelActive]}>
                      {data.month}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Reading History Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reading history</Text>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.historyList}>
            {readingHistory.map((item) => (
              <View key={item.id} style={[styles.historyRow, shadows.card]}>
                <View style={styles.historyBookInfo}>
                  <View style={styles.historyBookCoverContainer}>
                    <Image source={{ uri: item.coverUrl }} style={styles.historyBookCover} resizeMode="cover" />
                  </View>
                  <View style={styles.historyTextDetails}>
                    <Text style={styles.historyBookTitle}>{item.title}</Text>
                    <Text style={styles.historyBookFinished}>
                      Finished {new Date(item.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </Text>
                    <View style={styles.historyBadgesRow}>
                      <View style={styles.historyBadgeMint}>
                        <Text style={styles.historyBadgeMintText}>{item.durationHours} hrs</Text>
                      </View>
                      <View style={styles.historyBadgeBlue}>
                        <Text style={styles.historyBadgeBlueText}>{item.totalPages} pgs</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => onDeleteHistoryItem(item.id)}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="delete" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Danger Zone */}
          <View style={styles.dangerZone}>
            <TouchableOpacity style={styles.dangerButton} onPress={onDeleteAllData} activeOpacity={0.8}>
              <Text style={styles.dangerButtonText}>Delete all data</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>Maqra v2.4.0 — All data is stored locally.</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNav activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  darkHeaderPanel: {
    backgroundColor: '#0D0D0D',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: spacing.marginEdge,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: colors.white,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  searchButton: {
    padding: 8,
  },
  userIdentityContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.white,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0D0D0D',
  },
  userName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
    color: colors.white,
    fontWeight: '500',
  },
  membershipText: {
    fontFamily: 'Inter_300Light',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headerStatCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    width: '48%',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  headerStatValue: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: colors.white,
    fontWeight: 'bold',
  },
  headerStatLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  canvasContent: {
    paddingHorizontal: spacing.marginEdge,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: spacing.md,
  },
  chartCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: spacing.containerPadding,
    marginBottom: spacing.lg,
  },
  chartSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  chartBarsRow: {
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent: 'space-between',
    height: 128,
  },
  chartBarWrapper: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  barBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  barFill: {
    width: '100%',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  barFillActive: {
    backgroundColor: colors.primary,
  },
  barFillInactive: {
    backgroundColor: 'rgba(0, 108, 75, 0.15)',
  },
  barLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 8,
    color: colors.textSecondary,
    fontWeight: 'bold',
    marginTop: 8,
  },
  barLabelActive: {
    color: colors.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  viewAllButton: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: colors.primary,
  },
  historyList: {
    marginBottom: spacing.lg,
  },
  historyRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  historyBookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyBookCoverContainer: {
    width: 48,
    height: 64,
    borderRadius: radii.default,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  historyBookCover: {
    width: '100%',
    height: '100%',
  },
  historyTextDetails: {
    marginLeft: 16,
    flex: 1,
  },
  historyBookTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  historyBookFinished: {
    fontFamily: 'Inter_300Light',
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  historyBadgesRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  historyBadgeMint: {
    backgroundColor: 'rgba(0, 108, 75, 0.08)',
    borderRadius: radii.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
  },
  historyBadgeMintText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: colors.primary,
    fontWeight: 'bold',
  },
  historyBadgeBlue: {
    backgroundColor: 'rgba(62, 89, 172, 0.08)',
    borderRadius: radii.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  historyBadgeBlueText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
  },
  dangerZone: {
    paddingTop: spacing.md,
    alignItems: 'center',
  },
  dangerButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: colors.error,
    fontWeight: '500',
  },
  versionText: {
    fontFamily: 'Inter_300Light',
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 16,
    opacity: 0.6,
  },
});
