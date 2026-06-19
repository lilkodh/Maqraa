import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, spacing, typography } from '../utils/theme';
import ProgressRing from '../components/ProgressRing';
import { formatTime } from '../utils/calculations';

const { width } = Dimensions.get('window');

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
  const [sessionNotes, setSessionNotes] = useState('');

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No book selected.</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progressPercent = Math.round((book.readPages / book.totalPages) * 100);

  // Render stars based on rating
  const renderStars = () => {
    const stars = [];
    const rating = book.rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={[
            styles.star,
            { color: i <= rating ? colors.secondary : 'rgba(255,255,255,0.15)' },
          ]}
        >
          ★
        </Text>
      );
    }
    return stars;
  };

  const handleStop = () => {
    onStopTimer(sessionNotes);
    setSessionNotes('');
  };

  return (
    <View style={styles.container}>
      {/* Background Dark Void */}
      <LinearGradient
        colors={['#000f21', '#00142a']}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Top App Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={onBackPress}>
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Maqra</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconText}>🔖</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cinematic Hero Backdrop */}
          <View style={styles.heroSection}>
            {/* Blurry Cover Image Backdrop */}
            {book.coverUrl && (
              <Image
                source={{ uri: book.coverUrl }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={20}
              />
            )}
            <View style={styles.heroOverlay} />

            {/* Floating Book Cover (3D perspective tilt) */}
            <View style={styles.coverContainer}>
              <View style={styles.bookCoverWrapper}>
                {book.coverUrl ? (
                  <Image source={{ uri: book.coverUrl }} style={styles.coverImage} />
                ) : (
                  <View style={styles.fallbackCover}>
                    <Text style={styles.fallbackText}>{book.title[0]}</Text>
                  </View>
                )}
                <View style={styles.spineShadow} />
              </View>
            </View>
          </View>

          {/* Progress Ring Overlay */}
          <View style={styles.progressRingSection}>
            <ProgressRing
              size={140}
              strokeWidth={8}
              progress={progressPercent}
              subText="Reading"
            />
          </View>

          {/* Metadata Section */}
          <View style={styles.metadataSection}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
            
            {/* Star Matrix */}
            <View style={styles.starContainer}>{renderStars()}</View>

            {/* Language & Genre chips */}
            <View style={styles.chipRow}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{book.language || 'Arabic'}</Text>
              </View>
              {book.genre &&
                book.genre.map((g) => (
                  <View key={g} style={styles.chip}>
                    <Text style={styles.chipText}>{g}</Text>
                  </View>
                ))}
            </View>
          </View>

          {/* Leather-Bound Timer (Claymorphic) */}
          <View style={styles.timerSection}>
            <View style={styles.timerCard}>
              <Text style={styles.timerLabel}>Session Timer</Text>
              <Text style={styles.timerValue}>{formatTime(timerSeconds)}</Text>
              
              <View style={styles.timerActions}>
                <TouchableOpacity
                  style={[styles.timerBtn, styles.timerBtnStart]}
                  onPress={onStartTimer}
                  disabled={timerRunning}
                >
                  <Text style={styles.timerBtnTextStart}>Start</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.timerBtn}
                  onPress={onPauseTimer}
                  disabled={!timerRunning}
                >
                  <Text style={styles.timerBtnText}>Pause</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.timerBtn}
                  onPress={handleStop}
                >
                  <Text style={styles.timerBtnTextStop}>Stop</Text>
                </TouchableOpacity>
              </View>

              {/* Session notes input inside the timer well */}
              <TextInput
                style={styles.notesInput}
                placeholder="Log thoughts / sanctuary insights..."
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={sessionNotes}
                onChangeText={setSessionNotes}
              />
            </View>
          </View>

          {/* Master Action Completion CTA */}
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={[
                styles.completionBtn,
                book.status === 'completed' && styles.completionBtnActive,
              ]}
              onPress={onToggleCompletion}
            >
              <Text style={styles.completionBtnIcon}>✓</Text>
              <Text style={styles.completionBtnText}>
                {book.status === 'completed' ? 'Completed' : 'Mark as Completed'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Synopsis Preview (Librarian's Note) */}
          <View style={styles.synopsisSection}>
            <Text style={styles.synopsisTitle}>The Librarian's Note</Text>
            <Text style={styles.synopsisText}>
              {book.synopsis ||
                'A transformative journey through the shifting sands of the Andalusian desert, where every word is a tile in a vast philosophical mosaic. This volume explores the intersection of destiny and choice...'}
            </Text>
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
            <Text style={[styles.navIcon, styles.navIconActive]}>🧘</Text>
            <Text style={[styles.navText, styles.navTextActive]}>Sanctuary</Text>
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
    backgroundColor: '#000f21',
  },
  safeArea: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000f21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: typography.bodyLg.fontFamily,
    color: colors.onSurface,
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primaryContainer,
    borderRadius: radii.full,
  },
  backButtonText: {
    fontFamily: typography.labelMd.fontFamily,
    color: colors.onPrimaryContainer,
  },
  topBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  topBarTitle: {
    fontFamily: typography.headlineLgMobile.fontFamily,
    fontSize: 20,
    fontWeight: '800',
    color: colors.secondaryContainer,
    textShadowColor: 'rgba(238,152,0,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  iconBtn: {
    padding: 8,
  },
  iconText: {
    fontSize: 22,
    color: colors.secondary,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroSection: {
    height: 240,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 15, 33, 0.7)',
  },
  coverContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  bookCoverWrapper: {
    width: 140,
    height: 200,
    borderRadius: radii.sm,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: 'rgba(0, 0, 0, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
    transform: [{ rotate: '-2deg' }],
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fallbackCover: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceBright,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontFamily: typography.headlineLg.fontFamily,
    fontSize: 32,
    color: colors.secondary,
  },
  spineShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  progressRingSection: {
    alignItems: 'center',
    marginTop: -70,
    zIndex: 30,
  },
  metadataSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    marginTop: 20,
  },
  title: {
    fontFamily: typography.displayLg.fontFamily,
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  author: {
    fontFamily: typography.bodyLg.fontFamily,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 12,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  star: {
    fontSize: 20,
    marginHorizontal: 2,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceBright,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  chipText: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 11,
    color: colors.primary,
  },
  timerSection: {
    paddingHorizontal: spacing.marginMobile,
    marginTop: 24,
  },
  timerCard: {
    backgroundColor: 'rgba(0, 15, 33, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: radii.xl,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 8,
  },
  timerLabel: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
    opacity: 0.6,
  },
  timerValue: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 40,
    color: colors.primary,
    letterSpacing: 2,
    fontWeight: '700',
    textShadowColor: 'rgba(225, 243, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 20,
  },
  timerActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    marginBottom: 16,
  },
  timerBtn: {
    flex: 1,
    maxWidth: 90,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerBtnStart: {
    backgroundColor: colors.primaryContainer,
    borderColor: 'rgba(189, 216, 233, 0.2)',
  },
  timerBtnTextStart: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 12,
    fontWeight: '700',
    color: colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  timerBtnText: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 12,
    color: colors.onSurface,
    textTransform: 'uppercase',
  },
  timerBtnTextStop: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  notesInput: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: radii.full,
    paddingHorizontal: 16,
    color: colors.onSurface,
    fontFamily: typography.bodyMd.fontFamily,
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  actionSection: {
    paddingHorizontal: spacing.marginMobile,
    marginTop: 20,
  },
  completionBtn: {
    height: 56,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceBright,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 4,
  },
  completionBtnActive: {
    backgroundColor: colors.tertiaryContainer,
    borderColor: 'rgba(94, 236, 176, 0.2)',
    shadowColor: 'rgba(94, 236, 176, 0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
  },
  completionBtnIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 8,
  },
  completionBtnText: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  synopsisSection: {
    paddingHorizontal: spacing.marginMobile,
    marginTop: 32,
  },
  synopsisTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 8,
  },
  synopsisText: {
    fontFamily: typography.bodyLg.fontFamily,
    fontSize: 15,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
    opacity: 0.8,
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
