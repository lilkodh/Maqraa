import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { colors, radii, spacing, shadows } from '../utils/theme';
import { useLocalSearchParams, router } from 'expo-router';
import useBookStore from '../store/bookStore';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const books = useBookStore((state) => state.books);
  const book = books.find((b) => b.id === id);

  const timerSeconds = useBookStore((state) => state.timerSeconds);
  const isTimerRunning = useBookStore((state) => state.isTimerRunning);
  const startTimer = useBookStore((state) => state.startTimer);
  const pauseTimer = useBookStore((state) => state.pauseTimer);
  const resetTimer = useBookStore((state) => state.resetTimer);
  const incrementTimer = useBookStore((state) => state.incrementTimer);
  const updateProgress = useBookStore((state) => state.updateProgress);
  const toggleFavorite = useBookStore((state) => state.toggleFavorite);

  const [pageInput, setPageInput] = useState('');

  useEffect(() => {
    let interval;

    if (isTimerRunning) {
      interval = setInterval(() => {
        incrementTimer();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]);

  if (!book) return null;

  const progressPercent = book.totalPages > 0
    ? Math.round(((book.currentPage || 0) / book.totalPages) * 100)
    : 0;

  const seconds = timerSeconds;

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [
      hrs.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };
  const formattedTime = formatTime(seconds);

  const handleUpdate = () => {
    if (pageInput === "") {
      return;
    }

    const pageNumber = Number(pageInput);
    if (isNaN(pageNumber) || pageNumber < 0 || pageNumber > book.totalPages) {
      Alert.alert(
        "Invalid page",
        `Enter a page between 0 and ${book.totalPages}`
      );
      return;
    }

    updateProgress(book.id, pageNumber);
    setPageInput("");
  };

  return (
  
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.darkHeaderPanel}>
            <View style={styles.navRow}>
              <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                <MaterialIcons name="arrow-back" size={24} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavorite(book.id)} style={styles.headerButton}>
                <MaterialIcons
                  name={book.favorite ? "favorite" : "favorite-border"}
                  size={24}
                  color={book.favorite ? colors.primary : colors.white}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.bookDisplayContainer}>
              <View style={styles.coverShadowContainer}>
                <Image source={{ uri: book.coverImage || 'https://via.placeholder.com/300x450.png?text=No+Cover' }} style={styles.bookCover} resizeMode="cover" />
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

          <View style={styles.canvasContent}>
            <View style={[styles.card, shadows.card]}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardSubtitle}>OVERALL PROGRESS</Text>
                  <View style={styles.progressTextRow}>
                    <Text style={styles.progressPercent}>{progressPercent}%</Text>
                    <Text style={styles.progressDetails}>{book.currentPage || 0} / {book.totalPages} pages</Text>
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
                  <TouchableOpacity
                    style={styles.controlButtonSmall}
                    onPress={pauseTimer}
                    disabled={!isTimerRunning}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="pause" size={24} color={isTimerRunning ? colors.textPrimary : colors.textSecondary} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.controlButtonLarge}
                    onPress={startTimer}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons
                      name={isTimerRunning ? 'play-arrow' : 'play-arrow'}
                      size={32}
                      color={colors.white}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.controlButtonSmall}
                    onPress={resetTimer}
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
                      {Math.floor(seconds / 60)} min
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.dividerContainer}>
              <Svg height="12" width="100%" viewBox="0 0 100 12" preserveAspectRatio="none">
                <Path d="M0 6C150 6 150 0 300 0C450 0 450 12 600 12C750 12 750 0 900 0C1050 0 1050 6 1200 6" stroke={colors.primary} strokeWidth="1.5" fill="none" />
              </Svg>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.outlineActionButton, book.status === 'reading' && styles.activeOutlineButton]}
                onPress={() => updateProgress(book.id, book.currentPage > 0 ? book.currentPage : 1)}
                activeOpacity={0.8}
              >
                <Text style={styles.outlineActionText}>Currently Reading</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.filledActionButton}
                onPress={() => updateProgress(book.id, book.totalPages)}
                activeOpacity={0.8}
              >
                <Text style={styles.filledActionText}>Mark as Finished</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: colors.white,
    marginTop: 20,
    fontWeight: 'bold',
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
    borderWidth: 1,
    borderColor: 'rgba(13, 13, 13, 0.08)',
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
    fontFamily: 'Inter_700Bold',
    fontSize: 34,
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
    borderColor: colors.primary,
  },
  moreAvatarBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primary,
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
    backgroundColor: 'rgba(181, 137, 0, 0.1)',
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
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(13, 13, 13, 0.08)',
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
    shadowColor: '#B58900',
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
    fontFamily: 'Inter_700Bold',
    fontSize: 42,
    color: colors.primary,
    fontWeight: 'bold',
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
    shadowColor: '#B58900',
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
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
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
    fontFamily: 'Inter_700Bold',
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
    backgroundColor: 'rgba(181, 137, 0, 0.05)',
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
    shadowColor: '#B58900',
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
