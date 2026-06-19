import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { colors, radii, spacing, typography, shadows } from '../utils/theme';
import { BottomNav } from '../components/StatCard';
import { formatTime } from '../utils/calculations';

export default function BookDetailScreen({
  book,
  timerState,
  onUpdateProgress,
  onToggleCompletion,
  onStartTimer,
  onPauseTimer,
  onStopTimer,
  onBack,
}) {
  const [pageInput, setPageInput] = useState('');

  if (!book) return null;

  const progressPercent = Math.round((book.readPages / book.totalPages) * 100) || 0;
  const isTimerRunning = timerState?.isRunning || false;
  const timerSeconds = timerState?.seconds || 0;

  // Format timer time nicely using formatTime
  const formattedTime = formatTime ? formatTime(timerSeconds) : '00:00:00';

  const handleUpdate = () => {
    const pages = parseInt(pageInput, 10);
    if (!isNaN(pages)) {
      onUpdateProgress(pages);
      setPageInput('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Top 45% Dark Panel */}
          <View style={styles.darkHeaderPanel}>
            <View style={styles.navRow}>
              <TouchableOpacity onPress={onBack} style={styles.headerButton}>
                <MaterialIcons name="arrow-back" size={24} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <MaterialIcons name="share" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.bookDisplayContainer}>
              <View style={styles.coverShadowContainer}>
                <Image source={{ uri: book.coverUrl }} style={styles.bookCover} resizeMode="cover" />
              </View>
              <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <MaterialIcons key={s} name="star" size={18} color={colors.primaryContainer} />
                ))}
              </View>
            </View>
          </View>

          {/* Canvas */}
          <View style={styles.canvasContent}>
            {/* Progress Section */}
            <View style={[styles.card, shadows.card]}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardSubtitle}>OVERALL PROGRESS</Text>
                  <View style={styles.progressTextRow}>
                    <Text style={styles.progressPercent}>{progressPercent}%</Text>
                    <Text style={styles.progressDetails}>{book.readPages} / {book.totalPages} pages</Text>
                  </View>
                </View>
                <View style={styles.avatarRow}>
                  <Image
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQPhBqv1yvlBb8EWPoEoCkmdNAFvRG0QpDtNxflyZDQQQWnX6CAUvHRhBUaqJIvZE-jM31UFhLdzzzF1FQBBH7E7esJ67swWjv7WRRtTDmYABPjgdp0HeiP50BZ3lEbw_WLnQMVMTijlhzJYWsOPSQ7NT_9Q2aa1Zrhuy6pi07SvLoh508tiAEFkEYSrjk1kCO9Y9XtGBKHzlBfSXR3Zt4bWBmt5czZ4a2QQzYxLQmc2jaVeGp_YjiG4-Zm1DkDt_0E5J3btZkW5U' }}
                    style={styles.smallAvatar}
                  />
                  <Image
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_6h2wRU9Q38whJECi4HL8Bi8uqEZohvOzj_dlHq94DLDaYu1lGvk9B22XzhmTpT-mu-TRBVLy9RW2vcwUZoDb3MsDJa_P1SVPRH1W-F6h6BvEv2pqj3lRs-gofScJhIJLELNlnE3imxb6u6luzBucyEyC8LjQRr41RvYCRGlGCxLNUgVYRfRsufxKO5iBH-Q0spxcdXpm7XYFplhLpJm7KXCYl_nTY4E-EVxGp1o_M5WE3K8z3AUY5WysG6CKovBr2Wy6LV5N4BM' }}
                    style={[styles.smallAvatar, { marginLeft: -8 }]}
                  />
                  <View style={styles.moreAvatarBadge}>
                    <Text style={styles.moreAvatarText}>+4</Text>
                  </View>
                </View>
              </View>

              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter page reached..."
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                  value={pageInput}
                  onChangeText={setPageInput}
                  style={styles.pageInput}
                />
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} activeOpacity={0.8}>
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Reading Session Card */}
            <View style={[styles.card, shadows.card]}>
              <View style={styles.sessionHeader}>
                <Text style={styles.cardSubtitle}>READING SESSION</Text>
                <View style={styles.activeIndicator}>
                  <View style={[styles.indicatorDot, isTimerRunning && styles.indicatorDotActive]} />
                  <Text style={[styles.indicatorText, isTimerRunning && styles.indicatorTextActive]}>
                    {isTimerRunning ? 'Active Now' : 'Session Inactive'}
                  </Text>
                </View>
              </View>

              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formattedTime}</Text>
                
                <View style={styles.controlsRow}>
                  {/* Pause Button */}
                  <TouchableOpacity
                    style={styles.controlButtonSmall}
                    onPress={onPauseTimer}
                    disabled={!isTimerRunning}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="pause" size={24} color={isTimerRunning ? colors.textPrimary : colors.textSecondary} />
                  </TouchableOpacity>

                  {/* Play Button */}
                  <TouchableOpacity
                    style={styles.controlButtonLarge}
                    onPress={onStartTimer}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons
                      name={isTimerRunning ? 'play-arrow' : 'play-arrow'}
                      size={32}
                      color={colors.white}
                    />
                  </TouchableOpacity>

                  {/* Stop Button */}
                  <TouchableOpacity
                    style={styles.controlButtonSmall}
                    onPress={() => onStopTimer('Finished reading session.')}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="stop" size={24} color={colors.textPrimary} />
                  </TouchableOpacity>
                </View>

                <View style={styles.sessionStatsGrid}>
                  <View style={styles.sessionStatItem}>
                    <Text style={styles.sessionStatLabel}>Pages this session</Text>
                    <Text style={styles.sessionStatValue}>
                      {isTimerRunning ? '24' : '0'}
                    </Text>
                  </View>
                  <View style={styles.sessionStatItem}>
                    <Text style={styles.sessionStatLabel}>Time elapsed</Text>
                    <Text style={styles.sessionStatValue}>
                      {Math.round(timerSeconds / 60)} min
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Decorative Divider */}
            <View style={styles.dividerContainer}>
              <Svg height="12" width="100%" viewBox="0 0 100 12" preserveAspectRatio="none">
                <Path d="M0 6C150 6 150 0 300 0C450 0 450 12 600 12C750 12 750 0 900 0C1050 0 1050 6 1200 6" stroke={colors.primary} strokeWidth="1.5" fill="none" />
              </Svg>
            </View>

            {/* Status Buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.outlineActionButton, book.status === 'in_progress' && styles.activeOutlineButton]}
                onPress={handleToggleCompletion}
                activeOpacity={0.8}
              >
                <Text style={styles.outlineActionText}>Currently Reading</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.filledActionButton}
                onPress={() => onUpdateProgress(book.totalPages)}
                activeOpacity={0.8}
              >
                <Text style={styles.filledActionText}>Mark as Finished</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <BottomNav activeTab="library" />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
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
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerButton: {
    padding: 8,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  bookDisplayContainer: {
    alignItems: 'center',
  },
  coverShadowContainer: {
    width: 160,
    height: 240,
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: '#333',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  bookCover: {
    width: '100%',
    height: '100%',
  },
  bookTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 22,
    color: colors.white,
    marginTop: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  bookAuthor: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: colors.primaryContainer,
    marginTop: 4,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  canvasContent: {
    paddingHorizontal: spacing.marginEdge,
    paddingVertical: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.containerPadding,
    marginBottom: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  cardSubtitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 1,
  },
  progressTextRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  progressPercent: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 32,
    color: colors.primary,
    fontWeight: 'bold',
  },
  progressDetails: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.white,
  },
  moreAvatarBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
  moreAvatarText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  progressBg: {
    height: 12,
    backgroundColor: 'rgba(0, 108, 75, 0.1)',
    borderRadius: radii.full,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radii.full,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  pageInput: {
    flex: 1,
    backgroundColor: '#F2EEE8',
    borderRadius: radii.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter_300Light',
    fontSize: 15,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  updateButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.full,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#006C4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  updateButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textSecondary,
    marginRight: 6,
  },
  indicatorDotActive: {
    backgroundColor: colors.primary,
  },
  indicatorText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
  indicatorTextActive: {
    color: colors.primary,
  },
  timerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  timerText: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 42,
    color: colors.primary,
    fontWeight: '500',
    letterSpacing: -1,
    marginBottom: spacing.lg,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  controlButtonSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  controlButtonLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#006C4B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  sessionStatsGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainer,
    width: '100%',
    paddingTop: spacing.md,
  },
  sessionStatItem: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.sm,
    borderRadius: radii.md,
    marginHorizontal: 4,
  },
  sessionStatLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: colors.textSecondary,
  },
  sessionStatValue: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginTop: 4,
  },
  dividerContainer: {
    marginVertical: spacing.lg,
    opacity: 0.15,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outlineActionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  activeOutlineButton: {
    backgroundColor: 'rgba(0, 108, 75, 0.05)',
  },
  outlineActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
  filledActionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: radii.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#006C4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  filledActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: colors.white,
    fontWeight: '600',
  },
});
