import React, { useRef, useState, useEffect } from 'react';
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
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const size = 160;

export default function LibraryScreen({
  books = [],
  activeBook = null,
  activeFilter = 'All',
  onFilterChange = () => {},
  onBookPress = () => {},
  goal = { current: 12, target: 20 },
  onNavigateToStats = () => {},
  initialTab = null,
}) {
  const scrollViewRef = useRef(null);
  const [collectionsY, setCollectionsY] = useState(0);
  const [activeTab, setActiveTab] = useState('Library');

  useEffect(() => {
    if (initialTab === 'collections' && collectionsY > 0 && scrollViewRef.current) {
      setActiveTab('Collections');
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ y: collectionsY - 16, animated: true });
      }, 100);
    }
  }, [initialTab, collectionsY]);

  const handleLibraryPress = () => {
    setActiveTab('Library');
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleCollectionsPress = () => {
    setActiveTab('Collections');
    if (scrollViewRef.current && collectionsY > 0) {
      scrollViewRef.current.scrollTo({ y: collectionsY - 16, animated: true });
    }
  };

  // Filter categories
  const categories = ['All', 'To Read', 'In Progress', 'Completed'];

  // Seed book covers from spec
  const book1Cover = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgYOFYe27EiBnkwayEN_Q-UBT20lgNCRnwKHFO8y740XdduAYuF0Hk9NUVAelhHW8knpMlMtojp-5JCTGSOZA9CRtlE0cPzqeaZ5rWfCT_h7nyq6mCWMDz4TFoQdKH5ANoNT85trg8gxjiyaE7iHQx4Mzl36PvELhGt6vEKsRC_cM96Z6egSbHkJbsiYZm9ihCclNH00gp2x0R3wsmYBZm60kpGBTO1IyY8c9PNSqhb_SBn4OB_s290AqZ7-IYvoz6WqHjfNglSxI';
  const book2Cover = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDalhceKsFX2MyYYwiUllRuqf5b7Gfe10gu5284Cciyc6Xgl1GxuDYObAlsNP_WVNHQ-mGsWwa3PO_71yXKvVNHFGUdLRqd_EwYwZDgPHW3rQ5c5krcc91hjriv4XNwXkZmqoQZfdJBJR3FCZ738s_yMw6JJr8MatTKcoN5HNGeTYce65zD2YGnYWBdctX-g7Vdjxv4GKjKnaiLgr-cJYJB1rlDKLa1ETquxaZv4Qg6n3g76ClJMx4qc3KSY17Nzi_-s3oYQMl0kXo';
  const book3Cover = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRUj7K5bpNVfgRBFk2VtyVndcaZ5iOQ4BzBpbZfecXKAyOhhTKpIhaDf-9LKzcgFlm0OIMZpiJL5KeswSSEjdRw5Q0GKWS0QqjToAKmqlqsr56LcdoASnSP1a-r3H13FxqKGO4mXKyedqTprkw3OeY8TAgMwtFkm40YfRRNKMfhvGwVROcuz9WiBBbTD_c1oSFXYWXRVNXIWYwZYGfoGEdNZKeQWnZKgXmGzIAe6cQtRe9lgVItU9BoD-L5kckq9aXrPBqVDH7nUc';

  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressPercent = 70;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <View style={styles.container}>
      {/* Background with custom Zellige overlay shade */}
      <View style={StyleSheet.absoluteFillObject} />

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
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Interactive Shelf Hub */}
        <View style={styles.shelfHub}>
          {/* Moorish Arch Silhouette Background */}
          <View style={styles.moorishArch} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={192}
            decelerationRate="fast"
            contentContainerStyle={styles.shelfScrollContent}
          >
            {/* Book 1 (Active) */}
            <TouchableOpacity
              style={[styles.shelfBook, styles.shelfBookActive]}
              activeOpacity={0.9}
              onPress={() => onBookPress('alchemists-shadow')}
            >
              <Image source={{ uri: book1Cover }} style={styles.bookCover} />
              <View style={styles.bookOverlay} />
            </TouchableOpacity>

            {/* Book 2 */}
            <TouchableOpacity
              style={[styles.shelfBook, styles.shelfBookInactive]}
              activeOpacity={0.9}
              onPress={() => onBookPress('book-1')}
            >
              <Image source={{ uri: book2Cover }} style={styles.bookCover} />
            </TouchableOpacity>

            {/* Book 3 */}
            <TouchableOpacity
              style={[styles.shelfBook, styles.shelfBookInactive]}
              activeOpacity={0.9}
              onPress={() => onBookPress('book-3')}
            >
              <Image source={{ uri: book3Cover }} style={styles.bookCover} />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Precision Goal Loop & Widgets Section */}
        <View style={styles.widgetsSection}>
          {/* Goal Circle Widget */}
          <View style={styles.glassCard}>
            <View style={styles.goalProgressWrapper}>
              <Svg width={size} height={size} style={styles.progressRing}>
                {/* Track circle */}
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#373431"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Progress circle */}
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={colors.primary}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              </Svg>
              <View style={styles.goalTextContainer}>
                <Text style={styles.goalPercent}>70%</Text>
                <Text style={styles.goalLabel}>DAILY GOAL</Text>
              </View>
            </View>
            <Text style={styles.goalSubText}>32 mins to target</Text>
          </View>

          {/* Streak Widget Carousel */}
          <View style={styles.streakContainer}>
            <Text style={styles.streakSectionTitle}>INTELLECTUAL MOMENTUM</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.streakScroll}
            >
              <View style={styles.streakCard}>
                <MaterialIcons name="local-fire-department" size={30} color={colors.primary} />
                <Text style={styles.streakNumber}>12 Days</Text>
                <Text style={styles.streakLabel}>Reading Streak</Text>
              </View>
              <View style={styles.streakCard}>
                <MaterialIcons name="history-edu" size={30} color={colors.tertiary} />
                <Text style={styles.streakNumber}>450 Pages</Text>
                <Text style={styles.streakLabel}>This Week</Text>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Category Pill Bar */}
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

        {/* Stacked Deck Grid (Curated Stacks) */}
        <View style={styles.curatedSection} onLayout={(e) => setCollectionsY(e.nativeEvent.layout.y)}>
          <View style={styles.curatedHeader}>
            <MaterialIcons name="auto-stories" size={24} color={colors.primary} />
            <Text style={styles.curatedTitle}>Curated Stacks</Text>
          </View>

          <View style={styles.stacksGrid}>
            {/* Stack 1: Classics */}
            <TouchableOpacity style={styles.stackItem} activeOpacity={0.9} onPress={() => onBookPress('alchemists-shadow')}>
              <View style={styles.stackWrapper}>
                <View style={[styles.stackedCard, styles.stackedCard3]} />
                <View style={[styles.stackedCard, styles.stackedCard2]} />
                <View style={[styles.stackedCard, styles.stackedCard1]}>
                  <View style={styles.stackedCardHeader}>
                    <Text style={styles.stackedCardCategory}>Classics</Text>
                    <MaterialIcons name="more-vert" size={18} color="rgba(242, 202, 80, 0.4)" />
                  </View>
                  <Text style={styles.stackedCardTitle}>The Alchemist</Text>
                  <Text style={styles.stackedCardText} numberOfLines={2}>
                    A profound journey into the soul of the world.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Stack 2: Philosophy */}
            <TouchableOpacity style={styles.stackItem} activeOpacity={0.9} onPress={() => onBookPress('book-1')}>
              <View style={styles.stackWrapper}>
                <View style={[styles.stackedCard, styles.stackedCard3]} />
                <View style={[styles.stackedCard, styles.stackedCard2]} />
                <View style={[styles.stackedCard, styles.stackedCard1]}>
                  <View style={styles.stackedCardHeader}>
                    <Text style={styles.stackedCardCategory}>Philosophy</Text>
                    <MaterialIcons name="more-vert" size={18} color="rgba(242, 202, 80, 0.4)" />
                  </View>
                  <Text style={styles.stackedCardTitle}>Meditations</Text>
                  <Text style={styles.stackedCardText} numberOfLines={2}>
                    Timeless Stoic wisdom for the digital age.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Stack 3: Futurism */}
            <TouchableOpacity style={styles.stackItem} activeOpacity={0.9} onPress={() => onBookPress('book-3')}>
              <View style={styles.stackWrapper}>
                <View style={[styles.stackedCard, styles.stackedCard3]} />
                <View style={[styles.stackedCard, styles.stackedCard2]} />
                <View style={[styles.stackedCard, styles.stackedCard1]}>
                  <View style={styles.stackedCardHeader}>
                    <Text style={styles.stackedCardCategory}>Futurism</Text>
                    <MaterialIcons name="more-vert" size={18} color="rgba(242, 202, 80, 0.4)" />
                  </View>
                  <Text style={styles.stackedCardTitle}>Neuromancer</Text>
                  <Text style={styles.stackedCardText} numberOfLines={2}>
                    The seminal cyberpunk odyssey that defined a genre.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Nav bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.glassNav}>
          <TouchableOpacity
            style={[styles.navItem, activeTab === 'Library' && styles.navItemActive]}
            onPress={handleLibraryPress}
          >
            <MaterialIcons
              name="local-library"
              size={24}
              color={activeTab === 'Library' ? colors.primary : 'rgba(232, 225, 221, 0.7)'}
            />
            <Text style={[styles.navText, activeTab === 'Library' && styles.navTextActive]}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => onBookPress(activeBook ? activeBook.id : 'alchemists-shadow')}
          >
            <MaterialIcons name="menu-book" size={24} color="rgba(232, 225, 221, 0.7)" />
            <Text style={styles.navText}>Reading</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navItem, activeTab === 'Collections' && styles.navItemActive]}
            onPress={handleCollectionsPress}
          >
            <MaterialIcons
              name="auto-stories"
              size={24}
              color={activeTab === 'Collections' ? colors.primary : 'rgba(232, 225, 221, 0.7)'}
            />
            <Text style={[styles.navText, activeTab === 'Collections' && styles.navTextActive]}>Collections</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={onNavigateToStats}>
            <MaterialIcons name="person" size={24} color="rgba(232, 225, 221, 0.7)" />
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
  },
  shelfHub: {
    height: 397,
    justifyContent: 'flex-end',
    position: 'relative',
    marginBottom: 48,
  },
  moorishArch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceContainerLow,
    opacity: 0.4,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  shelfScrollContent: {
    paddingHorizontal: spacing.marginMobile,
    alignItems: 'flex-end',
    paddingBottom: 32,
    gap: 24,
  },
  shelfBook: {
    borderRadius: radii.sm,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 12, height: 12 },
    shadowOpacity: 0.7,
    shadowRadius: 25,
    elevation: 12,
  },
  shelfBookActive: {
    width: 176,
    height: 264,
  },
  shelfBookInactive: {
    width: 160,
    height: 240,
    opacity: 0.7,
    transform: [{ scale: 0.9 }],
  },
  bookCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  widgetsSection: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: spacing.marginMobile,
    marginBottom: 48,
  },
  glassCard: {
    flex: 1.1,
    backgroundColor: 'rgba(43, 29, 20, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: radii.sm,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  goalProgressWrapper: {
    position: 'relative',
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRing: {
    position: 'absolute',
  },
  goalTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalPercent: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
  },
  goalLabel: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  goalSubText: {
    fontFamily: typography.headlineSm.fontFamily,
    fontSize: 18,
    color: colors.onSurface,
    marginTop: 16,
    textAlign: 'center',
  },
  streakContainer: {
    flex: 0.9,
    justifyContent: 'space-between',
  },
  streakSectionTitle: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 12,
    letterSpacing: 1.5,
    color: colors.primary,
    marginBottom: 8,
  },
  streakScroll: {
    gap: 12,
  },
  streakCard: {
    width: 140,
    backgroundColor: 'rgba(43, 29, 20, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: radii.sm,
    padding: 16,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  streakNumber: {
    fontFamily: typography.headlineSm.fontFamily,
    fontSize: 20,
    color: colors.onSurface,
    fontWeight: '600',
    marginTop: 12,
  },
  streakLabel: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 10,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  pillSection: {
    marginBottom: 48,
    paddingLeft: spacing.marginMobile,
  },
  pillScroll: {
    gap: 12,
  },
  pillBtn: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: 'rgba(242, 202, 80, 0.3)',
  },
  pillBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  pillText: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  pillTextActive: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  curatedSection: {
    paddingHorizontal: spacing.marginMobile,
    marginBottom: 24,
  },
  curatedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  curatedTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 24,
    color: colors.onSurface,
    fontWeight: '600',
  },
  stacksGrid: {
    gap: 32,
  },
  stackItem: {
    height: 300,
    width: '100%',
  },
  stackWrapper: {
    flex: 1,
    position: 'relative',
  },
  stackedCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(43, 29, 20, 0.5)',
    borderWidth: 1,
    borderRadius: radii.sm,
    shadowColor: '#000',
    shadowOffset: { width: 12, height: 12 },
    shadowOpacity: 0.7,
    shadowRadius: 25,
    elevation: 12,
  },
  stackedCard3: {
    top: 24,
    bottom: -24,
    transform: [{ scale: 0.92 }],
    opacity: 0.6,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  stackedCard2: {
    top: 12,
    bottom: -12,
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  stackedCard1: {
    top: 0,
    bottom: 0,
    padding: 24,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  stackedCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stackedCardCategory: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 12,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  stackedCardTitle: {
    fontFamily: typography.headlineSm.fontFamily,
    fontSize: 22,
    color: colors.onSurface,
    fontWeight: '600',
    marginBottom: 8,
  },
  stackedCardText: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
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
