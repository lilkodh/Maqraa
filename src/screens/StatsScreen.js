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
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../utils/theme';

const { width } = Dimensions.get('window');

export default function StatsScreen({
  userProfile = {
    name: 'Malek Al-Fassi',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHzmEBwhiSp6nmKXySXfgzJUUs9Ft2R2dI9BJCt26cxDYlLrzINJIBPefvby_PkKT03qICc5_skMBMCQMyFHrjUEVdaHih9M1_AHWGQtVfQmbYafuRlgzVSqImbJ5fZpVENtkcmf97Rh4E2CDDsw28rJILEoIGEtfCFzHz0fcp_1YljeyLrgpkLHsaMOlFwrMZpjp_BHea27qubrrYJkYZkr3h-HlY3L_UJPUGQGwM5nsyUt5oyLoen9E3YzLtYvsLCl1b4K85wmk',
    title: 'Master Collector • Registry No. 882',
  },
  stats = {
    streak: 14,
    booksRead: 1284,
    readingTimeHours: 840,
  },
  weeklyData = [
    { month: 'Jan', percent: 40 },
    { month: 'Feb', percent: 65 },
    { month: 'Mar', percent: 55 },
    { month: 'Apr', percent: 90 },
    { month: 'May', percent: 75 },
    { month: 'Jun', percent: 85 },
  ],
  sessions = [
    {
      id: 's1',
      title: 'Al-Kindi: De Gradibus',
      detail: 'Finished session • 42 pages',
      time: '2h ago',
      icon: 'menu-book',
      color: colors.primary,
    },
    {
      id: 's2',
      title: 'Acquired Rare Folio',
      detail: 'The Muqaddimah (14th Century Edition)',
      time: 'Yesterday',
      icon: 'stars',
      color: colors.tertiary,
    },
    {
      id: 's3',
      title: 'Royal Citation Earned',
      detail: "Unlocked 'Custodian of the Nightfall'",
      time: '3 days ago',
      icon: 'emoji-events',
      color: colors.primary,
    },
  ],
  onNavigateToLibrary = () => {},
  onBookPress = () => {},
}) {
  return (
    <View style={styles.container}>
      {/* Top Header AppBar */}
      <SafeAreaView edges={['top']} style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.logoTitle}>MAQRA</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <MaterialIcons name="search" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Reader Registry Section */}
        <View style={styles.registrySection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBorder}>
              <Image source={{ uri: userProfile.avatarUrl }} style={styles.avatarImage} />
            </View>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={16} color={colors.onPrimary} />
            </View>
          </View>
          <View style={styles.registryTextCol}>
            <Text style={styles.registryName}>{userProfile.name}</Text>
            <View style={styles.registrySubRow}>
              <MaterialIcons name="auto-stories" size={14} color={colors.primary} />
              <Text style={styles.registrySubText}>{userProfile.title}</Text>
            </View>
            <View style={styles.badgeRow}>
              <View style={styles.badgeCapsulePrimary}>
                <Text style={styles.badgeTextPrimary}>LEVEL 42</Text>
              </View>
              <View style={styles.badgeCapsuleSecondary}>
                <Text style={styles.badgeTextSecondary}>SCHOLARSHIP STATUS</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Performance Matrix Grid */}
        <View style={styles.matrixSection}>
          {/* Card 1: Total Volumes */}
          <View style={styles.glassCard}>
            <View style={styles.matrixHeader}>
              <Text style={styles.matrixLabel}>TOTAL VOLUMES</Text>
              <MaterialIcons name="history-edu" size={24} color="rgba(242, 202, 80, 0.05)" style={styles.matrixBgIcon} />
            </View>
            <View style={styles.matrixValueRow}>
              <Text style={styles.matrixValue}>{stats.booksRead.toLocaleString()}</Text>
              <Text style={styles.matrixGrowth}>+12%</Text>
            </View>
            <Text style={styles.matrixSubText}>Historical manuscripts archived</Text>
          </View>

          {/* Card 2: Reading Velocity */}
          <View style={styles.glassCard}>
            <View style={styles.matrixHeader}>
              <Text style={styles.matrixLabel}>READING VELOCITY</Text>
              <MaterialIcons name="speed" size={24} color="rgba(242, 202, 80, 0.05)" style={styles.matrixBgIcon} />
            </View>
            <View style={styles.matrixValueRow}>
              <Text style={styles.matrixValue}>84</Text>
              <Text style={styles.matrixUnit}>pp/hr</Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: '72%' }]} />
            </View>
          </View>

          {/* Card 3: Global Rank */}
          <View style={styles.glassCard}>
            <View style={styles.matrixHeader}>
              <Text style={styles.matrixLabel}>GLOBAL RANK</Text>
              <MaterialIcons name="workspace-premium" size={24} color="rgba(242, 202, 80, 0.05)" style={styles.matrixBgIcon} />
            </View>
            <View style={styles.matrixValueRow}>
              <Text style={styles.matrixValue}>Top 2%</Text>
            </View>
            <Text style={styles.matrixSubText}>Within the Elite Library Circle</Text>
          </View>
        </View>

        {/* Activity Vector Chart */}
        <View style={styles.graphSection}>
          <View style={styles.graphHeader}>
            <View>
              <Text style={styles.graphTitle}>Activity Vector</Text>
              <Text style={styles.graphSubtitle}>Archive engagement by lunar cycle</Text>
            </View>
            <Text style={styles.graphDate}>Jan — Jun 2024</Text>
          </View>

          <View style={styles.chartContainer}>
            {weeklyData.map((d) => (
              <View key={d.month} style={styles.chartCol}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${d.percent}%` }]} />
                </View>
                <Text style={styles.chartMonthLabel}>{d.month}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Historical Log Ledger */}
        <View style={styles.ledgerSection}>
          <View style={styles.ledgerHeader}>
            <Text style={styles.ledgerTitle}>Historical Ledger</Text>
          </View>
          <View style={styles.ledgerList}>
            {sessions.map((s, index) => (
              <View key={s.id} style={[styles.ledgerItem, index === sessions.length - 1 && styles.ledgerItemLast]}>
                <View style={styles.ledgerLeft}>
                  <View style={styles.ledgerIconContainer}>
                    <MaterialIcons name={s.icon} size={22} color={s.color} />
                  </View>
                  <View style={styles.ledgerTextCol}>
                    <Text style={styles.ledgerItemTitle}>{s.title}</Text>
                    <Text style={styles.ledgerItemDetail}>{s.detail}</Text>
                  </View>
                </View>
                <Text style={styles.ledgerTime}>{s.time}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.viewArchiveBtn}>
            <Text style={styles.viewArchiveText}>View Full Archive</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Bottom Nav bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.glassNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => onNavigateToLibrary('Library')}>
            <MaterialIcons name="local-library" size={24} color="rgba(232, 225, 221, 0.7)" />
            <Text style={styles.navText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => onBookPress('alchemists-shadow')}>
            <MaterialIcons name="menu-book" size={24} color="rgba(232, 225, 221, 0.7)" />
            <Text style={styles.navText}>Reading</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => onNavigateToLibrary('Collections')}>
            <MaterialIcons name="auto-stories" size={24} color="rgba(232, 225, 221, 0.7)" />
            <Text style={styles.navText}>Collections</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <MaterialIcons name="person" size={24} color={colors.primary} />
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
    backgroundColor: '#151311',
  },
  headerWrapper: {
    backgroundColor: 'rgba(85, 67, 57, 0.4)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(242, 202, 80, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
  },
  headerBtn: {
    padding: 8,
  },
  logoTitle: {
    fontFamily: typography.displayLgMobile.fontFamily,
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 2,
  },
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 140,
    paddingHorizontal: spacing.marginMobile,
  },
  registrySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 48,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarBorder: {
    width: 128,
    height: 128,
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 4,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: radii.full,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  registryTextCol: {
    flex: 1,
  },
  registryName: {
    fontFamily: typography.displayLgMobile.fontFamily,
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  registrySubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  registrySubText: {
    fontFamily: typography.bodyLg.fontFamily,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    opacity: 0.8,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badgeCapsulePrimary: {
    backgroundColor: 'rgba(242, 202, 80, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(242, 202, 80, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: radii.full,
  },
  badgeTextPrimary: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 11,
    color: colors.primary,
  },
  badgeCapsuleSecondary: {
    backgroundColor: 'rgba(112, 227, 176, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(112, 227, 176, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: radii.full,
  },
  badgeTextSecondary: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 11,
    color: colors.tertiary,
  },
  matrixSection: {
    gap: 24,
    marginBottom: 48,
  },
  glassCard: {
    backgroundColor: 'rgba(43, 29, 20, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: radii.sm,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  matrixHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  matrixLabel: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  matrixBgIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  matrixValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 8,
  },
  matrixValue: {
    fontFamily: typography.displayLgMobile.fontFamily,
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
  },
  matrixGrowth: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 14,
    color: colors.tertiary,
    fontWeight: '600',
  },
  matrixUnit: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  matrixSubText: {
    fontFamily: typography.bodyMd.fontFamily,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    opacity: 0.6,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: radii.full,
    marginTop: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radii.full,
    shadowColor: 'rgba(242, 202, 80, 0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  graphSection: {
    backgroundColor: 'rgba(43, 29, 20, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: radii.sm,
    padding: 24,
    marginBottom: 48,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  graphTitle: {
    fontFamily: typography.headlineSm.fontFamily,
    fontSize: 20,
    color: colors.onSurface,
    fontWeight: '600',
    marginBottom: 4,
  },
  graphSubtitle: {
    fontFamily: typography.bodyMd.fontFamily,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    opacity: 0.7,
  },
  graphDate: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 14,
    color: colors.primary,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 240,
    paddingBottom: 24,
  },
  chartCol: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    width: 24,
    height: 180,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  barFill: {
    width: '100%',
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
    shadowColor: 'rgba(212, 175, 55, 0.4)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  chartMonthLabel: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  ledgerSection: {
    backgroundColor: 'rgba(43, 29, 20, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: radii.sm,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 24,
  },
  ledgerHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(242, 202, 80, 0.2)',
  },
  ledgerTitle: {
    fontFamily: typography.headlineSm.fontFamily,
    fontSize: 20,
    color: colors.onSurface,
    fontWeight: '600',
  },
  ledgerList: {
    paddingHorizontal: 24,
  },
  ledgerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(242, 202, 80, 0.1)',
  },
  ledgerItemLast: {
    borderBottomWidth: 0,
  },
  ledgerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ledgerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    backgroundColor: 'rgba(43, 29, 20, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ledgerTextCol: {
    flexDirection: 'column',
  },
  ledgerItemTitle: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 16,
    color: colors.onSurface,
    fontWeight: '600',
  },
  ledgerItemDetail: {
    fontFamily: typography.bodyMd.fontFamily,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    opacity: 0.6,
    marginTop: 2,
  },
  ledgerTime: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  viewArchiveBtn: {
    padding: 16,
    backgroundColor: 'rgba(242, 202, 80, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewArchiveText: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 14,
    color: colors.primary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
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
    height: 64,
    backgroundColor: 'rgba(85, 67, 57, 0.6)',
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: 'rgba(242, 202, 80, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 15,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    paddingHorizontal: 12,
  },
  navItemActive: {
    backgroundColor: 'rgba(242, 202, 80, 0.1)',
    borderRadius: radii.full,
    shadowColor: 'rgba(212, 175, 55, 0.4)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 2,
  },
  navText: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 10,
    color: 'rgba(232, 225, 221, 0.7)',
    marginTop: 2,
  },
  navTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
