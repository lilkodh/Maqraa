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
import ProgressRing from '../components/ProgressRing';

const { width } = Dimensions.get('window');

export default function LibraryScreen({
  books = [],
  activeFilter = 'All',
  onFilterChange = () => {},
  onBookPress = () => {},
  activeBook = null,
  goal = { current: 12, target: 20 },
  onNavigateToStats = () => {},
}) {
  const categories = ['All', 'To Read', 'In Progress', 'Completed'];

  // Seed covers for fanned grid decks
  const digitalLibraryCover = 'https://lh3.googleusercontent.com/aida-public/AB6AXuADtELIof-En3zYr7XuTZHWfWqqTNKpU1-jRSWLCd8QRo6EuAMXSGrPhWRqiaTCmFw12FxUdfAel_kZJdwo4-723p6_Dje7sR8Z-ZDQzrX6f3DYK0LaqB2hWZT7zm8lPXQ_k9_WYTbY_PJ87M9s4LlP6e_zO5GxThxrynR0nGObM3XABGKaKD5XwF735nfpejxOGDjHHvbLQ1erHVthp5GG9j6J66gjniodGNU9YiARoZAbzTPtoLElDOTpKSBz86yTtUm6eVMkyrk';
  const curatedArticlesCover = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQiCg6m4fPRnrQtG0wzcC837xhgVnOd_JV0qTHJoXClTonHWiefDy32K3BZo-cARF24vZZU142gQDuaLWZTf_se7LRktzMDqoy4bnmFhIB3XWT5vJsYHGpiIb3dQdR26PEN8XZcdXEMdRlClkDmzcjJUz3uGi1UOOrtoWIccaE3ZuARRH3sZlL7R-gVoQ16x9euHB8TKSEO1YKEbIqNKq_MgoAY-7WZKGyimw_0Ete99gjeppbtVu0QRGO-mtUHzC-T91ixehJ76s';
  const globalResearchCover = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxmG_bhwVnFS8e6_RuF0Uw2tRg_dIlkfkbxpGt3XXSD03dpK7gSKxTPYB-hnm6bQmRWLazqZJjGAxgsicZJ0NugkB_voCL9N7MU0DIavdnc47ywssc7Ph1gOAIopAh1u0EsM1Kf9FFN3fh3EgoieiSNeBDLbsFbSrjkfbSIgKb-u307RpTp3KMHabFDAPtBwi_U0vwxKeJkbpgRMyop_EzWNHBKqT_wtZRFdgPwogyfvfPe3q2w0tOrpISbuQL7o-nQh0CGME0pA4';
  const audioNarrativesCover = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnPQVJpsVz-7urbdatW_g_vk-qPNhTfGbNp4N9a1sb_3l4P3ckrrZzCXUWQ5Q6MTjDyuLBuWfTmGA4E3ApAQMdG9tE9ooQvX4avHFEEgmdpqsE15iLj9iEgtyjrjmfNODCtO6PNhxTBh-JPGSkD3hN7LcFxA6Sv1awQo0sbx0lSsSeZ9I3Qs0zEKKOSoJgfcjPdQB8EQllNrKL6xXKia4LNrJ085X9Kd1KWS4xShrMvOU3lO_39nfLv357npG7nM8JYtDhmZGBDGM';

  // Seed books on the shelf
  const leftBookUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1U7nRKL3C7AboucHXh5CdliAXJMwblTntkq1ayUIqpKDNvv8cDy5eXpDqiBUBEfFUva2opaqEKuQX3XhEzn7POBjc6bGm7YOPJ13VlusDFftgam-5ua5y6td2VlkksStF_KDbiLHwJeHVjLtBu8XPAMWK1Jo51TmmGgz-FAXs0xH6a_A2Ea8z7ACNos1IHP7Cy10bjoxuWLoGJci6fqjkddBOuS4DuFyYazQW7F3UFb24F0cOaJf6sfLX1g8eaHjhHPxl6kl_kaI';
  const centerBookUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbTCw6V6dbnzXB6scpVf6KvJKiq9EhfaLQFXPvXeap8dmbITgxtbdcEL0qysmah4ci80toiaAE6HnZkYGbIxhzrgItLzv_qVwglQXuOutZTkSURr4iHwP9-chygxaQHHU9ljUfjlDV2RICQvGeSDKFw8X61DwO_hutnbG4XWZMBT4DVPkRi4gJFQbcwksOHY69ofUnt-P4xFZaPMP6FvtrCluXfnADVj64FTl3FumoUHDFkbKiOxZvMXJQEDxSn-BV0oCwpvD_Lz4';
  const rightBookUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnupx6CBNe-ira8Gcz50EYTnRc3IV_1Fq9sV_Obwkg8Pxtsu1IMMacsN4ExEKcBh7Whg0SrdbQnVp9G-kljpx03obMtPW37xWp-oMXSISZvKBnPIvBjicN4KsK-9rz7ZHoHelp_l_Pag_hSLlH7_KbRuhqEH5xxB5y6h9LHxtzpXsjtzEXm62XRDwbRQRobHUTigFBZPPlXLIav1sKVYAVau4__aSB75XFUXqQcuJEv0E7BNR6KANDSDV-tBAWA4fmspkmsHC7BDU';

  return (
    <View style={styles.container}>
      {/* Mesh Gradient Background */}
      <View style={StyleSheet.absoluteFillObject}>
        <LinearGradient
          colors={['#00142a', '#000f21']}
          style={StyleSheet.absoluteFillObject}
        />
        {/* Top left emerald glow */}
        <LinearGradient
          colors={['rgba(0, 66, 43, 0.45)', 'transparent']}
          style={styles.topLeftGlow}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {/* Top right gold glow */}
        <LinearGradient
          colors={['rgba(42, 23, 0, 0.45)', 'transparent']}
          style={styles.topRightGlow}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        {/* Bottom center blue glow */}
        <LinearGradient
          colors={['rgba(25, 51, 65, 0.45)', 'transparent']}
          style={styles.bottomCenterGlow}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
        />
      </View>
      <View style={styles.latticePattern} pointerEvents="none" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header App Bar */}
        <View style={styles.header}>
          <Text style={styles.logo}>Maqra</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="search" size={22} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="add" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 3D Shelf Hub */}
          <View style={styles.shelfSection}>
            {/* Shelf Platform */}
            <View style={styles.shelfBeam} />

            <View style={styles.shelfRow}>
              {/* Left Book */}
              <TouchableOpacity
                style={[styles.shelfBookWrapper, styles.leftBookTransform]}
                onPress={() => onBookPress('book-1')}
                activeOpacity={0.8}
              >
                <Image source={{ uri: leftBookUrl }} style={styles.shelfBookImage} />
                <View style={styles.bookShadow} />
              </TouchableOpacity>

              {/* Central Featured Book */}
              <View style={styles.centerBookContainer}>
                <View style={styles.auraGlow} />
                <TouchableOpacity
                  style={[styles.shelfBookWrapper, styles.centerBookTransform]}
                  onPress={() => onBookPress('alchemists-shadow')}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: centerBookUrl }} style={styles.shelfBookImage} />
                </TouchableOpacity>
                <View style={styles.bookReflection} />
              </View>

              {/* Right Book */}
              <TouchableOpacity
                style={[styles.shelfBookWrapper, styles.rightBookTransform]}
                onPress={() => onBookPress('book-3')}
                activeOpacity={0.8}
              >
                <Image source={{ uri: rightBookUrl }} style={styles.shelfBookImage} />
                <View style={styles.bookShadow} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Goal & Streak Strip Section */}
          <View style={styles.statsStrip}>
            {/* Goal Widget Card */}
            <View style={[styles.glassCard, styles.goalCard]}>
              <ProgressRing
                size={96}
                strokeWidth={6}
                progress={(goal.current / goal.target) * 100}
                centerText={String(goal.current)}
                subText={`/ ${goal.target} Books`}
                strokeColor="#afcadb"
                textColor="#afcadb"
              />
            </View>

            {/* Streak Widget Card */}
            <View style={[styles.glassCard, styles.streakCard]}>
              <View style={styles.streakHeader}>
                <View>
                  <Text style={styles.streakTitle}>Reading Streak</Text>
                  <Text style={styles.streakSubtitle}>14 Days Strong</Text>
                </View>
                <View style={styles.flameContainer}>
                  <MaterialIcons name="local-fire-department" size={28} color={colors.tertiary} />
                </View>
              </View>
              {/* Segmented Progress Bars */}
              <View style={styles.segmentRow}>
                <View style={[styles.segmentBar, styles.segmentBarActive]} />
                <View style={[styles.segmentBar, styles.segmentBarActive]} />
                <View style={[styles.segmentBar, styles.segmentBarActive]} />
                <View style={styles.segmentBar} />
                <View style={styles.segmentBar} />
              </View>
            </View>
          </View>

          {/* Categorization Pills */}
          <View style={styles.pillSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillScroll}>
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.pillBtn, isActive && styles.pillBtnActive]}
                    onPress={() => onFilterChange(cat)}
                  >
                    <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Stacked Deck Grid (Fanned Stack items) */}
          <View style={styles.deckGrid}>
            {/* Grid Item 1: Digital Library */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.9} onPress={() => onBookPress('alchemists-shadow')}>
              <View style={styles.cardStack}>
                <View style={[styles.stackBgCard, { transform: [{ rotate: '-8deg' }] }]} />
                <View style={[styles.stackBgCard, { transform: [{ rotate: '-4deg' }] }]} />
                <View style={styles.stackForegroundCard}>
                  <Image source={{ uri: digitalLibraryCover }} style={styles.deckCover} />
                </View>
              </View>
              <Text style={styles.deckTitle}>Digital Library</Text>
              <Text style={styles.deckSubtitle}>142 Titles</Text>
            </TouchableOpacity>

            {/* Grid Item 2: Curated Articles */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.9}>
              <View style={styles.cardStack}>
                <View style={[styles.stackBgCard, { transform: [{ rotate: '8deg' }] }]} />
                <View style={[styles.stackBgCard, { transform: [{ rotate: '6deg' }] }]} />
                <View style={styles.stackForegroundCard}>
                  <Image source={{ uri: curatedArticlesCover }} style={styles.deckCover} />
                </View>
              </View>
              <Text style={styles.deckTitle}>Curated Articles</Text>
              <Text style={styles.deckSubtitle}>85 Entries</Text>
            </TouchableOpacity>

            {/* Grid Item 3: Global Research */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.9}>
              <View style={styles.cardStack}>
                <View style={[styles.stackBgCard, { transform: [{ rotate: '-8deg' }] }]} />
                <View style={styles.stackForegroundCard}>
                  <Image source={{ uri: globalResearchCover }} style={styles.deckCover} />
                </View>
              </View>
              <Text style={styles.deckTitle}>Global Research</Text>
              <Text style={styles.deckSubtitle}>12 Folders</Text>
            </TouchableOpacity>

            {/* Grid Item 4: Audio Narratives */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.9}>
              <View style={styles.cardStack}>
                <View style={[styles.stackBgCard, { transform: [{ rotate: '8deg' }] }]} />
                <View style={styles.stackForegroundCard}>
                  <Image source={{ uri: audioNarrativesCover }} style={styles.deckCover} />
                </View>
              </View>
              <Text style={styles.deckTitle}>Audio Narratives</Text>
              <Text style={styles.deckSubtitle}>22 Audiobooks</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Floating Bottom Nav bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.glassNav}>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <MaterialIcons name="local-library" size={24} color={colors.secondary} style={styles.navIconActive} />
            <Text style={[styles.navText, styles.navTextActive]}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => onBookPress(activeBook ? activeBook.id : 'alchemists-shadow')}
          >
            <MaterialIcons name="auto-stories" size={24} color="rgba(255, 255, 255, 0.4)" />
            <Text style={styles.navText}>Reading</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={onNavigateToStats}>
            <MaterialIcons name="person" size={24} color="rgba(255, 255, 255, 0.4)" />
            <Text style={styles.navText}>Profile</Text>
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
  topLeftGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: 300,
  },
  topRightGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width,
    height: 300,
  },
  bottomCenterGlow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    height: 300,
  },
  latticePattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.04,
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
    zIndex: 100,
  },
  logo: {
    fontFamily: typography.headlineLg.fontFamily,
    fontSize: 22,
    fontWeight: '700',
    fontStyle: 'italic',
    color: colors.tertiary,
    textShadowColor: 'rgba(255, 185, 95, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: 120,
  },
  shelfSection: {
    height: 250,
    justifyContent: 'flex-end',
    position: 'relative',
    marginTop: 10,
    marginBottom: 20,
  },
  shelfBeam: {
    position: 'absolute',
    bottom: 24,
    left: -10,
    right: -10,
    height: 10,
    backgroundColor: '#3d2b1f',
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 6,
  },
  shelfRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    paddingBottom: 30,
    gap: 12,
  },
  shelfBookWrapper: {
    borderRadius: radii.sm,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  shelfBookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  leftBookTransform: {
    width: 80,
    height: 120,
    transform: [{ translateY: 10 }, { rotateY: '15deg' }],
  },
  rightBookTransform: {
    width: 80,
    height: 120,
    transform: [{ translateY: 10 }, { rotateY: '-15deg' }],
  },
  centerBookContainer: {
    width: 105,
    height: 150,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerBookTransform: {
    width: 105,
    height: 150,
    transform: [{ translateY: -12 }, { scale: 1.1 }],
  },
  auraGlow: {
    position: 'absolute',
    inset: -20,
    backgroundColor: 'rgba(78, 222, 163, 0.1)',
    borderRadius: radii.full,
  },
  bookReflection: {
    position: 'absolute',
    bottom: -15,
    width: 105,
    height: 15,
    backgroundColor: 'rgba(78, 222, 163, 0.05)',
    transform: [{ scaleY: -1 }],
    opacity: 0.2,
  },
  bookShadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  statsStrip: {
    flexDirection: 'row',
    gap: spacing.gutter,
    height: 140,
    marginBottom: 24,
  },
  glassCard: {
    backgroundColor: 'rgba(3, 32, 60, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: radii.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 4,
  },
  goalCard: {
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakCard: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  streakTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 16,
    fontWeight: '600',
    color: colors.tertiary,
  },
  streakSubtitle: {
    fontFamily: typography.bodyLg.fontFamily,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  flameContainer: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 185, 95, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
  },
  segmentBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: radii.full,
  },
  segmentBarActive: {
    backgroundColor: colors.primary,
  },
  pillSection: {
    marginBottom: 24,
  },
  pillScroll: {
    gap: 10,
  },
  pillBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: radii.full,
    backgroundColor: 'rgba(3, 32, 60, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  pillBtnActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  pillText: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  pillTextActive: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  deckGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  gridItem: {
    width: (width - spacing.marginMobile * 2 - 20) / 2,
    marginBottom: 16,
  },
  cardStack: {
    height: 180,
    width: '100%',
    position: 'relative',
    marginBottom: 10,
  },
  stackBgCard: {
    position: 'absolute',
    top: 8,
    left: 12,
    width: '80%',
    height: '90%',
    backgroundColor: 'rgba(3, 32, 60, 0.4)',
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  stackForegroundCard: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radii.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 15 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 6,
  },
  deckCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  deckTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 15,
    color: colors.onSurface,
    fontWeight: '600',
  },
  deckSubtitle: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 11,
    color: colors.onSurfaceVariant,
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
