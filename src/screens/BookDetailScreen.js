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
import Svg, { Circle } from 'react-native-svg';
import { formatTime } from '../utils/calculations';

const { width } = Dimensions.get('window');
const size = 160;

export default function BookDetailScreen({
  book,
  timerSeconds = 0,
  timerRunning = false,
  onStartTimer = () => {},
  onPauseTimer = () => {},
  onStopTimer = () => {},
  onToggleCompletion = () => {},
  onBackPress = () => {},
  onNavigateToLibrary = () => {},
  onNavigateToStats = () => {},
}) {
  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No book selected.</Text>
        <TouchableOpacity style={styles.errorBackBtn} onPress={onBackPress}>
          <Text style={styles.errorBackBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progressPercent = Math.round((book.readPages / book.totalPages) * 100);

  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <View style={styles.container}>
      {/* Top Header Navigation */}
      <SafeAreaView edges={['top']} style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={onBackPress}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.logoTitle}>MAQRA</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <MaterialIcons name="more-vert" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cinematic Banner */}
        <View style={styles.bannerSection}>
          <Image
            source={{ uri: book.coverUrl }}
            style={styles.bannerBackground}
            blurRadius={10}
          />
          <View style={styles.bannerOverlay} />

          {/* 3D Book Cover Asset */}
          <View style={styles.coverWrapper}>
            <View style={styles.coverCard}>
              <Image source={{ uri: book.coverUrl }} style={styles.coverImage} />
              <View style={styles.coverBorder} />
            </View>
          </View>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          {/* Metadata Block */}
          <View style={styles.metaBlock}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.synopsis || 'Ibn Arabi’s Mystical Journey'}</Text>

            {/* Gold Star Matrix */}
            <View style={styles.starRow}>
              <View style={styles.stars}>
                <MaterialIcons name="star" size={18} color={colors.primary} />
                <MaterialIcons name="star" size={18} color={colors.primary} />
                <MaterialIcons name="star" size={18} color={colors.primary} />
                <MaterialIcons name="star" size={18} color={colors.primary} />
                <MaterialIcons name="star-border" size={18} color={colors.primary} />
              </View>
              <Text style={styles.ratingNum}>{book.rating || '4.8'}</Text>
            </View>

            {/* Language Capsules */}
            <View style={styles.tagRow}>
              <View style={styles.tagCapsuleActive}>
                <Text style={styles.tagTextActive}>ARABIC (ORIGINAL)</Text>
              </View>
              <View style={styles.tagCapsuleInactive}>
                <Text style={styles.tagTextInactive}>ENGLISH (TRANS)</Text>
              </View>
              <View style={styles.tagCapsuleInactive}>
                <Text style={styles.tagTextInactive}>SUFISM</Text>
              </View>
            </View>
          </View>

          {/* Frosted Stat Strip */}
          <View style={styles.statStrip}>
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>RATING</Text>
              <Text style={styles.statValue}>{book.rating || '4.8'}</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>READS</Text>
              <Text style={styles.statValue}>1.2k</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>REVIEWS</Text>
              <Text style={styles.statValue}>458</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>QUOTES</Text>
              <Text style={styles.statValue}>82</Text>
            </View>
          </View>

          {/* Concentric Completion Halo */}
          <View style={styles.haloSection}>
            <View style={styles.haloRingWrapper}>
              <Svg width={size} height={size} style={styles.haloRing}>
                {/* Track Circle */}
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#373431"
                  strokeWidth={4}
                  fill="none"
                />
                {/* Progress Circle */}
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#F59E0B"
                  strokeWidth={6}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              </Svg>
              <View style={styles.haloTextContainer}>
                <Text style={styles.haloPercent}>{progressPercent}%</Text>
                <Text style={styles.haloLabel}>PROGRESS</Text>
              </View>
            </View>
          </View>

          {/* Leather-Bound Timer Module */}
          <View style={styles.timerModule}>
            <View style={styles.timerLeft}>
              <MaterialIcons name="schedule" size={24} color={colors.primary} />
              <View style={styles.timerTextCol}>
                <Text style={styles.timerLabelText}>CURRENT SESSION</Text>
                <Text style={styles.timerClockText}>{formatTime(timerSeconds)}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.timerToggleBtn}
              onPress={timerRunning ? onPauseTimer : onStartTimer}
            >
              <MaterialIcons
                name={timerRunning ? 'pause' : 'play-arrow'}
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Master CTA */}
          <TouchableOpacity
            style={styles.masterCta}
            activeOpacity={0.8}
            onPress={onToggleCompletion}
          >
            <MaterialIcons name="check-circle" size={24} color="#85f8c4" />
            <Text style={styles.masterCtaText}>MARK AS COMPLETED</Text>
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
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <MaterialIcons name="menu-book" size={24} color={colors.primary} />
            <Text style={[styles.navText, styles.navTextActive]}>Reading</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => onNavigateToLibrary('Collections')}>
            <MaterialIcons name="auto-stories" size={24} color="rgba(232, 225, 221, 0.7)" />
            <Text style={styles.navText}>Collections</Text>
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
  errorContainer: {
    flex: 1,
    backgroundColor: '#151311',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: typography.bodyLg.fontFamily,
    fontSize: 18,
    color: '#e8e1dd',
    marginBottom: 24,
  },
  errorBackBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radii.full,
    backgroundColor: colors.primary,
  },
  errorBackBtnText: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 14,
    color: colors.onPrimary,
    fontWeight: '700',
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
    paddingTop: 64,
    paddingBottom: 140,
  },
  bannerSection: {
    height: 320,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(21, 19, 17, 0.6)',
  },
  coverWrapper: {
    position: 'absolute',
    bottom: -48,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 15,
  },
  coverCard: {
    width: 192,
    height: 288,
    borderRadius: radii.sm,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: 'rgba(242, 202, 80, 0.3)',
    backgroundColor: colors.surfaceContainerHigh,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  contentArea: {
    marginTop: 80,
    paddingHorizontal: spacing.marginMobile,
    alignItems: 'center',
  },
  metaBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: typography.displayLgMobile.fontFamily,
    fontSize: 32,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  author: {
    fontFamily: typography.bodyLg.fontFamily,
    fontSize: 18,
    color: colors.onSurfaceVariant,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 16,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
    marginRight: 8,
  },
  ratingNum: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  tagCapsuleActive: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: 'rgba(242, 202, 80, 0.2)',
    backgroundColor: 'rgba(242, 202, 80, 0.05)',
  },
  tagTextActive: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 11,
    color: colors.primary,
  },
  tagCapsuleInactive: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLow,
  },
  tagTextInactive: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  statStrip: {
    width: '100%',
    backgroundColor: 'rgba(43, 29, 20, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: radii.sm,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 10,
    color: 'rgba(242, 202, 80, 0.6)',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: typography.headlineSm.fontFamily,
    fontSize: 20,
    color: colors.onSurface,
    fontWeight: '600',
  },
  haloSection: {
    marginBottom: 48,
    alignItems: 'center',
  },
  haloRingWrapper: {
    position: 'relative',
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloRing: {
    position: 'absolute',
  },
  haloTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloPercent: {
    fontFamily: typography.displayLgMobile.fontFamily,
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
  },
  haloLabel: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 10,
    color: colors.onSurfaceVariant,
    opacity: 0.6,
    letterSpacing: 1.2,
    marginTop: 4,
  },
  timerModule: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#2B1D14',
    borderRadius: radii.sm,
    padding: 16,
    borderLeftWidth: 8,
    borderLeftColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 48,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 12,
  },
  timerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timerTextCol: {
    flexDirection: 'column',
  },
  timerLabelText: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 10,
    color: colors.primary,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  timerClockText: {
    fontFamily: typography.timerMono.fontFamily,
    fontSize: 20,
    color: colors.onSurface,
    fontWeight: '700',
    letterSpacing: 1,
  },
  timerToggleBtn: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: 'rgba(242, 202, 80, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(242, 202, 80, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  masterCta: {
    width: '100%',
    maxWidth: 360,
    height: 64,
    backgroundColor: '#004f36',
    borderRadius: radii.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: 'rgba(0, 79, 54, 0.4)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 8,
  },
  masterCtaText: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 14,
    color: '#85f8c4',
    fontWeight: '700',
    letterSpacing: 1,
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
