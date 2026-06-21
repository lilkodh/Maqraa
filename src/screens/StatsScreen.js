import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, shadows } from '../utils/theme';
import useBookStore from '../store/bookStore';

const MOCK_MONTHLY_DATA = [
  { month: 'JAN', count: 2, heightPct: 40, isActive: false },
  { month: 'FEB', count: 3, heightPct: 60, isActive: false },
  { month: 'MAR', count: 1, heightPct: 20, isActive: false },
  { month: 'APR', count: 2, heightPct: 40, isActive: false },
  { month: 'MAY', count: 4, heightPct: 80, isActive: false },
  { month: 'JUN', count: 2, heightPct: 40, isActive: false },
  { month: 'JUL', count: 3, heightPct: 60, isActive: false },
  { month: 'AUG', count: 4, heightPct: 80, isActive: false },
  { month: 'SEP', count: 5, heightPct: 100, isActive: true },
  { month: 'OCT', count: 1, heightPct: 20, isActive: false },
  { month: 'NOV', count: 2, heightPct: 40, isActive: false },
  { month: 'DEC', count: 1, heightPct: 20, isActive: false },
];

export default function StatsScreen() {
  const books = useBookStore((state) => state.books);
  const profilePhoto = useBookStore((state) => state.profilePhoto);
  const deleteBook = useBookStore((state) => state.deleteBook);
  const clearBooks = useBookStore((state) => state.clearBooks);

  const finishedBooksCount = books.filter((b) => b.status === 'completed').length;
  const currentBooksCount = books.filter((b) => b.status !== 'completed').length;
  const totalPagesRead = books.reduce((sum, b) => sum + (b.currentPage || 0), 0);

  const handleDeleteAll = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete all books? Your profile photo will be kept.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => clearBooks() }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.darkHeaderPanel}>
          <View style={styles.headerTopRow}>
            <Text style={styles.logoText}>Maqra</Text>
            <TouchableOpacity style={styles.searchButton}>
              <MaterialIcons name="search" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

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
            <Text style={styles.userName}>Khalid Drihem</Text>
            <Text style={styles.membershipText}>Member since 2024</Text>
          </View>

          <View style={styles.headerStatsGrid}>
            <View style={styles.headerStatCard}>
              <Text style={styles.headerStatValue}>{books.length}</Text>
              <Text style={styles.headerStatLabel}>Total Books</Text>
            </View>
            <View style={styles.headerStatCard}>
              <Text style={styles.headerStatValue}>{finishedBooksCount}</Text>
              <Text style={styles.headerStatLabel}>Completed</Text>
            </View>
            <View style={styles.headerStatCard}>
              <Text style={styles.headerStatValue}>{currentBooksCount}</Text>
              <Text style={styles.headerStatLabel}>Current Books</Text>
            </View>
            <View style={styles.headerStatCard}>
              <Text style={styles.headerStatValue}>{totalPagesRead.toLocaleString()}</Text>
              <Text style={styles.headerStatLabel}>Pages Read</Text>
            </View>
          </View>
        </View>

        <View style={styles.canvasContent}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={[styles.chartCard, shadows.card]}>
            <Text style={styles.chartSubtitle}>Books finished per month</Text>
            <View style={styles.chartBarsRow}>
              {MOCK_MONTHLY_DATA.map((data, index) => {
                const isActive = data.isActive || false;
                const barHeightPct = data.heightPct || 0;

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

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reading history</Text>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.historyList}>
            {books.length === 0 ? (
              <View style={{ alignItems: 'center', padding: 24 }}>
                <Text style={{ color: colors.textSecondary, fontFamily: 'Inter_500Medium' }}>No books in library.</Text>
              </View>
            ) : (
              books.map((item) => {
                const isCompleted = item.status === "completed";
                const progressPercent = item.totalPages > 0
                  ? Math.round(((item.currentPage || 0) / item.totalPages) * 100)
                  : 0;

                return (
                  <View key={item.id} style={[styles.historyRow, shadows.card]}>
                    <View style={styles.historyBookInfo}>
                      <View style={styles.historyBookCoverContainer}>
                        {item.coverImage ? (
                          <Image source={{ uri: item.coverImage }} style={styles.historyBookCover} resizeMode="cover" />
                        ) : (
                          <View style={styles.placeholderCoverContainer}>
                            <MaterialIcons name="menu-book" size={16} color={colors.primary} />
                          </View>
                        )}
                      </View>
                      <View style={styles.historyTextDetails}>
                        <Text style={styles.historyBookTitle}>{item.title}</Text>
                        <Text style={styles.historyBookFinished}>
                          {isCompleted ? "Completed" : `Progress: ${item.currentPage || 0} / ${item.totalPages || 0}`}
                        </Text>
                        <View style={styles.historyBadgesRow}>
                          <View style={styles.historyBadgeMint}>
                            <Text style={styles.historyBadgeMintText}>
                              {isCompleted ? "Finished" : `${progressPercent}%`}
                            </Text>
                          </View>
                          <View style={styles.historyBadgeBlue}>
                            <Text style={styles.historyBadgeBlueText}>{item.totalPages || 0} pgs</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => {
                        Alert.alert(
                          "Confirm Removal",
                          `Are you sure you want to remove '${item.title}'?`,
                          [
                            { text: "Cancel", style: "cancel" },
                            { text: "Remove", style: "destructive", onPress: () => deleteBook(item.id) }
                          ]
                        );
                      }}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons name="delete" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </View>

          <View style={styles.dangerZone}>
            <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAll} activeOpacity={0.8}>
              <Text style={styles.dangerButtonText}>Delete all data</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>Maqra v2.4.0 — All data is stored locally.</Text>
          </View>
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
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
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
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
    fontFamily: 'Inter_700Bold',
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
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  chartCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(13, 13, 13, 0.08)',
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
    backgroundColor: 'rgba(181, 137, 0, 0.15)',
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
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(13, 13, 13, 0.08)',
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
  placeholderCoverContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(181, 137, 0, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'rgba(181, 137, 0, 0.08)',
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
