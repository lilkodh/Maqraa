import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, spacing, typography } from '../utils/theme';
import BookCard from '../components/BookCard';
import ProgressRing from '../components/ProgressRing';
import Emptystate from '../components/Emptystate';

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
  const categories = ['All', 'Philosophy', 'Poetry', 'History', 'Science'];

  // Filter books locally based on filter prop
  const filteredBooks = books.filter((b) => {
    if (activeFilter === 'All') return true;
    return b.genre && b.genre.includes(activeFilter);
  });

  // Pick books for the 3D shelf
  const leftShelfBook = books.find(b => b.id === 'al-fitna');
  const centerShelfBook = activeBook || books.find(b => b.id === 'al-muqaddima');
  const rightShelfBook = books.find(b => b.id === 'mystical-poetry');

  return (
    <View style={styles.container}>
      {/* Background S-Curve Gradient & Pattern */}
      <LinearGradient
        colors={['#00142a', '#001c38', '#000f21']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Decorative Zellige lattice approximation lines */}
      <View style={styles.latticePattern} pointerEvents="none" />

      <SafeAreaView style={styles.safeArea}>
        {/* Dynamic Island Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Maqra</Text>
          
          {/* Dynamic Island Shape (Reading Status) */}
          {centerShelfBook && (
            <View style={styles.dynamicIsland}>
              <View style={styles.pulseDot} />
              <Text style={styles.dynamicIslandText} numberOfLines={1}>
                Reading: {centerShelfBook.title}
              </Text>
            </View>
          )}

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Headline */}
          <View style={styles.titleSection}>
            <Text style={styles.screenTitle}>My Library</Text>
          </View>

          {/* Swipeable Pill Bar */}
          <View style={styles.pillContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pillScroll}
            >
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.pillButton,
                      isActive && styles.pillButtonActive,
                    ]}
                    onPress={() => onFilterChange(cat)}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        isActive && styles.pillTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* 3D Shelf Hub */}
          <View style={styles.shelfSection}>
            {/* Wooden shelf detail line */}
            <View style={styles.shelfBeam} />

            <View style={styles.shelfRow}>
              {/* Left Book */}
              {leftShelfBook && (
                <TouchableOpacity
                  style={[styles.shelfBookWrapper, styles.leftBookTransform]}
                  onPress={() => onBookPress(leftShelfBook.id)}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: leftShelfBook.coverUrl }} style={styles.shelfBookImage} />
                  <View style={styles.bookShadow} />
                </TouchableOpacity>
              )}

              {/* Central Featured Book */}
              {centerShelfBook && (
                <View style={styles.centerBookContainer}>
                  {/* Sapphire Aura Glow */}
                  <View style={styles.auraGlow} />
                  <TouchableOpacity
                    style={[styles.shelfBookWrapper, styles.centerBookTransform]}
                    onPress={() => onBookPress(centerShelfBook.id)}
                    activeOpacity={0.8}
                  >
                    <Image source={{ uri: centerShelfBook.coverUrl }} style={[styles.shelfBookImage, styles.centerBookImage]} />
                  </TouchableOpacity>
                  {/* Reflection mockup */}
                  <View style={styles.bookReflection} />
                </View>
              )}

              {/* Right Book */}
              {rightShelfBook && (
                <TouchableOpacity
                  style={[styles.shelfBookWrapper, styles.rightBookTransform]}
                  onPress={() => onBookPress(rightShelfBook.id)}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: rightShelfBook.coverUrl }} style={styles.shelfBookImage} />
                  <View style={styles.bookShadow} />
                </TouchableOpacity>
              )}
            </View>

            {/* Goal Loop Ring Floating */}
            <View style={styles.goalGaugeContainer}>
              <ProgressRing
                size={85}
                strokeWidth={5}
                progress={(goal.current / goal.target) * 100}
                centerText={`${goal.current}/${goal.target}`}
                subText="Goal"
              />
            </View>
          </View>

          {/* Ledger Title */}
          <View style={styles.ledgerHeader}>
            <Text style={styles.ledgerTitle}>Shelf Books</Text>
            <Text style={styles.ledgerSubtitle}>[{filteredBooks.length}]</Text>
          </View>

          {/* Books List */}
          <View style={styles.booksList}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((item) => (
                <BookCard
                  key={item.id}
                  book={item}
                  onPress={() => onBookPress(item.id)}
                />
              ))
            ) : (
              <Emptystate message={`No books found under ${activeFilter}.`} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Floating Glass Bottom Tab Nav Bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.glassNav}>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <Text style={[styles.navIcon, styles.navIconActive]}>📖</Text>
            <Text style={[styles.navText, styles.navTextActive]}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={onNavigateToStats}>
            <Text style={styles.navIcon}>📊</Text>
            <Text style={styles.navText}>Stats</Text>
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
    opacity: 0.03,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'between',
    paddingHorizontal: spacing.marginMobile,
    zIndex: 100,
  },
  logo: {
    fontFamily: typography.headlineLgMobile.fontFamily,
    fontSize: 22,
    fontWeight: '800',
    color: colors.secondary,
    textShadowColor: 'rgba(238,152,0,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  dynamicIsland: {
    position: 'absolute',
    left: width / 2 - 70,
    width: 140,
    height: 32,
    backgroundColor: '#000',
    borderRadius: radii.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
    marginRight: 6,
  },
  dynamicIslandText: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 8,
    color: colors.onSurface,
    textTransform: 'uppercase',
  },
  headerActions: {
    marginLeft: 'auto',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  actionIcon: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  titleSection: {
    paddingHorizontal: spacing.marginMobile,
    marginTop: spacing.unit * 2,
    marginBottom: spacing.unit * 3,
  },
  screenTitle: {
    fontFamily: typography.displayLg.fontFamily,
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
  },
  pillContainer: {
    paddingLeft: spacing.marginMobile,
    marginBottom: spacing.gutter,
  },
  pillScroll: {
    paddingRight: spacing.marginMobile,
  },
  pillButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: radii.full,
    backgroundColor: 'rgba(0, 15, 33, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginRight: 10,
  },
  pillButtonActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: 'rgba(175, 202, 219, 0.2)',
    shadowColor: 'rgba(175,202,219,0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 4,
  },
  pillText: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  pillTextActive: {
    color: colors.onPrimaryContainer,
    fontWeight: '600',
  },
  shelfSection: {
    marginVertical: spacing.gutter,
    height: 250,
    justifyContent: 'flex-end',
    position: 'relative',
    overflow: 'visible',
  },
  shelfBeam: {
    position: 'absolute',
    bottom: 50,
    left: spacing.marginMobile,
    right: spacing.marginMobile,
    height: 6,
    backgroundColor: '#3d2b1f',
    borderRadius: radii.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 6,
  },
  shelfRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    paddingBottom: 56,
  },
  shelfBookWrapper: {
    borderRadius: radii.sm,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  shelfBookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  leftBookTransform: {
    width: 80,
    height: 120,
    transform: [{ rotateY: '20deg' }],
    opacity: 0.85,
    borderLeftWidth: 3,
    borderLeftColor: '#1a110a',
  },
  rightBookTransform: {
    width: 80,
    height: 120,
    transform: [{ rotateY: '-20deg' }],
    opacity: 0.85,
    borderRightWidth: 3,
    borderRightColor: '#1a110a',
  },
  centerBookContainer: {
    width: 120,
    height: 180,
    marginHorizontal: 20,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerBookTransform: {
    width: 120,
    height: 180,
    transform: [{ perspective: 1200 }, { rotateY: '-15deg' }, { scale: 1.15 }],
    borderLeftWidth: 4,
    borderLeftColor: '#2a1700',
  },
  centerBookImage: {
    borderRadius: radii.sm,
  },
  auraGlow: {
    position: 'absolute',
    inset: -20,
    backgroundColor: 'rgba(175, 202, 219, 0.12)',
    borderRadius: radii.full,
    filter: 'blur(30px)',
  },
  bookReflection: {
    position: 'absolute',
    bottom: -35,
    width: 120,
    height: 35,
    backgroundColor: 'rgba(175, 202, 219, 0.05)',
    transform: [{ scaleY: -1 }],
    opacity: 0.3,
  },
  bookShadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  goalGaugeContainer: {
    position: 'absolute',
    bottom: 70,
    right: 25,
    zIndex: 20,
  },
  ledgerHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: spacing.marginMobile,
    marginTop: spacing.gutter,
    marginBottom: spacing.unit,
  },
  ledgerTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 20,
    color: colors.primary,
  },
  ledgerSubtitle: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginLeft: 8,
  },
  booksList: {
    paddingHorizontal: spacing.marginMobile,
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
