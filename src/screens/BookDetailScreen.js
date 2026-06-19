import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
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
            <MaterialIcons name="arrow-back" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <Text style={styles.logoTitle}>Maqra</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="search" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cinematic Banner Section */}
          <View style={styles.heroSection}>
            {book.coverUrl && (
              <Image
                source={{ uri: book.coverUrl }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={20}
              />
            )}
            <View style={styles.heroOverlay} />

            {/* Floating Book Cover */}
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

          {/* Metadata Section */}
          <View style={styles.metadataSection}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>by {book.author}</Text>
            
            {/* Stars Rating */}
            <View style={styles.starRow}>
              <View style={styles.starsContainer}>
                <MaterialIcons name="star" size={16} color={colors.tertiary} />
                <MaterialIcons name="star" size={16} color={colors.tertiary} />
                <MaterialIcons name="star" size={16} color={colors.tertiary} />
                <MaterialIcons name="star" size={16} color={colors.tertiary} />
                <MaterialIcons name="star-half" size={16} color={colors.tertiary} />
              </View>
              <Text style={styles.ratingText}>
                {book.rating || '4.8'} (2.4k reviews)
              </Text>
            </View>

            {/* Tags/Chips */}
            <View style={styles.chipRow}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{book.language || 'Classical Arabic'}</Text>
              </View>
              {book.genre &&
                book.genre.map((g) => (
                  <View key={g} style={styles.chip}>
                    <Text style={styles.chipText}>{g}</Text>
                  </View>
                ))}
            </View>
          </View>

          {/* Stat Strip (Bento-like columns) */}
          <View style={styles.statStrip}>
            <View style={styles.statBox}>
              <MaterialIcons name="star" size={18} color={colors.secondary} style={styles.statIcon} />
              <Text style={styles.statVal}>{book.rating || '4.8'}</Text>
              <Text style={styles.statLbl}>Rating</Text>
            </View>
            <View style={styles.statBox}>
              <MaterialIcons name="auto-stories" size={18} color={colors.secondary} style={styles.statIcon} />
              <Text style={styles.statVal}>12k</Text>
              <Text style={styles.statLbl}>Reads</Text>
            </View>
            <View style={styles.statBox}>
              <MaterialIcons name="rate-review" size={18} color={colors.secondary} style={styles.statIcon} />
              <Text style={styles.statVal}>840</Text>
              <Text style={styles.statLbl}>Reviews</Text>
            </View>
            <View style={styles.statBox}>
              <MaterialIcons name="format-quote" size={18} color={colors.secondary} style={styles.statIcon} />
              <Text style={styles.statVal}>42</Text>
              <Text style={styles.statLbl}>Quotes</Text>
            </View>
          </View>

          {/* Progress Ring Overlay */}
          <View style={styles.progressRingSection}>
            <ProgressRing
              size={130}
              strokeWidth={6}
              progress={progressPercent}
              centerText={`p. ${book.readPages}`}
              subText={String(book.totalPages)}
              strokeColor={colors.primary}
              textColor={colors.onSurface}
            />
            <Text style={styles.progressLabel}>
              Current Progress: {progressPercent}%
            </Text>
          </View>

          {/* Leather-Bound Timer Card */}
          <View style={styles.timerSection}>
            <View style={styles.timerCard}>
              <Text style={styles.timerLabel}>Session Time</Text>
              <Text style={styles.timerValue}>{formatTime(timerSeconds)}</Text>
              
              <View style={styles.timerActions}>
                {/* Stop button */}
                <TouchableOpacity style={styles.timerSubBtn} onPress={handleStop}>
                  <MaterialIcons name="stop" size={20} color={colors.onSurfaceVariant} />
                </TouchableOpacity>
                
                {/* Play/Pause Main button */}
                <TouchableOpacity
                  style={[styles.timerMainBtn, timerRunning && styles.timerMainBtnActive]}
                  onPress={timerRunning ? onPauseTimer : onStartTimer}
                >
                  <MaterialIcons
                    name={timerRunning ? 'pause' : 'play-arrow'}
                    size={30}
                    color={colors.onPrimary}
                  />
                </TouchableOpacity>
                
                {/* Reset button */}
                <TouchableOpacity style={styles.timerSubBtn} onPress={() => onPauseTimer()}>
                  <MaterialIcons name="replay" size={20} color={colors.onSurfaceVariant} />
                </TouchableOpacity>
              </View>

              {/* Notes Input */}
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
              <MaterialIcons
                name="check-circle"
                size={20}
                color={book.status === 'completed' ? colors.primary : colors.onPrimary}
                style={styles.completionIcon}
              />
              <Text style={[styles.completionBtnText, book.status === 'completed' && styles.completionBtnTextActive]}>
                {book.status === 'completed' ? 'Completed' : 'Mark as Completed'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Synopsis (The Librarian's Note) */}
          <View style={styles.synopsisSection}>
            <Text style={styles.synopsisTitle}>The Librarian's Note</Text>
            <Text style={styles.synopsisText}>
              {book.synopsis ||
                'A transformative journey through the shifting sands of the Andalusian desert, where every word is a tile in a vast philosophical mosaic.'}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Floating Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.glassNav}>
          <TouchableOpacity style={styles.navItem} onPress={onNavigateToLibrary}>
            <MaterialIcons name="local-library" size={24} color="rgba(255, 255, 255, 0.4)" />
            <Text style={styles.navText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <MaterialIcons name="auto-stories" size={24} color={colors.secondary} style={styles.navIconActive} />
            <Text style={[styles.navText, styles.navTextActive]}>Reading</Text>
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
    fontFamily: typography.metadataSm.fontFamily,
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
  logoTitle: {
    fontFamily: typography.headlineLg.fontFamily,
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
    color: colors.tertiary,
    textShadowColor: 'rgba(255,185,95,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  iconBtn: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  heroSection: {
    height: 200,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 20, 42, 0.7)',
  },
  coverContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  bookCoverWrapper: {
    width: 120,
    height: 170,
    borderRadius: radii.sm,
    overflow: 'hidden',
    borderLeftWidth: 3,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
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
    fontSize: 28,
    color: colors.secondary,
  },
  spineShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  metadataSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    marginTop: 20,
  },
  title: {
    fontFamily: typography.headlineLg.fontFamily,
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: 4,
  },
  author: {
    fontFamily: typography.bodyMd.fontFamily,
    fontSize: 15,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
    gap: 2,
  },
  ratingText: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: 'rgba(29, 54, 83, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(78, 222, 163, 0.2)',
  },
  chipText: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 11,
    color: colors.primary,
  },
  statStrip: {
    flexDirection: 'row',
    paddingHorizontal: spacing.marginMobile,
    gap: 10,
    marginTop: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(29, 54, 83, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: radii.md,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  statIcon: {
    marginBottom: 4,
  },
  statVal: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 14,
    color: colors.onSurface,
    fontWeight: '600',
  },
  statLbl: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 8,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  progressRingSection: {
    alignItems: 'center',
    marginVertical: 28,
  },
  progressLabel: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 11,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 12,
  },
  timerSection: {
    paddingHorizontal: spacing.marginMobile,
    marginBottom: 20,
  },
  timerCard: {
    backgroundColor: 'rgba(29, 54, 83, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: colors.tertiary,
    borderRadius: radii.md,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  timerLabel: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 10,
    color: colors.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  timerValue: {
    fontFamily: typography.timerMono.fontFamily,
    fontSize: 36,
    color: colors.onSurface,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 16,
  },
  timerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  timerSubBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerMainBtn: {
    width: 60,
    height: 60,
    borderRadius: radii.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(78, 222, 163, 0.3)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
  },
  timerMainBtnActive: {
    backgroundColor: colors.primaryContainer,
  },
  notesInput: {
    width: '100%',
    height: 38,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: radii.full,
    paddingHorizontal: 16,
    color: colors.onSurface,
    fontFamily: typography.bodyMd.fontFamily,
    fontSize: 11,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  actionSection: {
    paddingHorizontal: spacing.marginMobile,
    marginBottom: 24,
  },
  completionBtn: {
    height: 52,
    borderRadius: radii.full,
    backgroundColor: colors.primaryContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
    gap: 8,
  },
  completionBtnActive: {
    backgroundColor: colors.surfaceBright,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  completionIcon: {
    marginRight: 2,
  },
  completionBtnText: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPrimary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  completionBtnTextActive: {
    color: colors.primary,
  },
  synopsisSection: {
    paddingHorizontal: spacing.marginMobile,
    marginBottom: 20,
  },
  synopsisTitle: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 6,
  },
  synopsisText: {
    fontFamily: typography.bodyLg.fontFamily,
    fontSize: 14,
    lineHeight: 22,
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
