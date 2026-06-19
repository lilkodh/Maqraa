import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography, shadows } from '../utils/theme';

export default function BookCard({ book, onPress, horizontal = false }) {
  if (!book) return null;

  const progressPercent = Math.round((book.readPages / book.totalPages) * 100) || 0;
  const isArabic = book.language === 'Arabic';

  if (horizontal) {
    return (
      <TouchableOpacity style={[styles.horizontalCard, shadows.card]} onPress={onPress} activeOpacity={0.9}>
        <View style={styles.horizontalCoverContainer}>
          <Image source={{ uri: book.coverUrl }} style={styles.horizontalCover} resizeMode="cover" />
          {isArabic && (
            <View style={styles.arabicBadge}>
              <Text style={styles.arabicBadgeText}>العربية</Text>
            </View>
          )}
        </View>
        <View style={styles.horizontalInfo}>
          <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
          <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.progressText}>{progressPercent}%</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Vertical card (standard)
  return (
    <TouchableOpacity style={styles.verticalCard} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.coverContainer, shadows.card]}>
        <Image source={{ uri: book.coverUrl }} style={styles.verticalCover} resizeMode="cover" />
        {isArabic && (
          <View style={styles.arabicBadge}>
            <Text style={styles.arabicBadgeText}>العربية</Text>
          </View>
        )}
      </View>
      <View style={styles.verticalInfo}>
        <Text style={styles.verticalTitle} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.verticalAuthor} numberOfLines={1}>{book.author}</Text>
      </View>
      <View style={styles.verticalProgressBg}>
        <View style={[styles.verticalProgressFill, { width: `${progressPercent}%` }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  verticalCard: {
    width: 140,
    marginRight: 16,
    marginBottom: 8,
  },
  coverContainer: {
    width: 140,
    height: 210,
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderLeftColor: 'rgba(255, 255, 255, 0.95)',
    borderTopColor: 'rgba(255, 255, 255, 0.95)',
    borderRightWidth: 2.5,
    borderRightColor: 'rgba(181, 137, 0, 0.22)',
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(181, 137, 0, 0.3)',
  },
  verticalCover: {
    width: '100%',
    height: '100%',
  },
  arabicBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.sm,
  },
  arabicBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: colors.white,
    fontWeight: 'bold',
  },
  verticalInfo: {
    marginTop: 8,
    marginBottom: 4,
  },
  verticalTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  verticalAuthor: {
    fontFamily: 'Inter_300Light',
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '300',
  },
  verticalProgressBg: {
    height: 6,
    backgroundColor: 'rgba(181, 137, 0, 0.1)',
    borderRadius: radii.full,
    overflow: 'hidden',
    marginTop: 4,
  },
  verticalProgressFill: {
    height: '100%',
    backgroundColor: colors.primaryContainer,
    borderRadius: radii.full,
  },
  // Horizontal display (for lists/history if needed)
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderLeftColor: 'rgba(255, 255, 255, 0.95)',
    borderTopColor: 'rgba(255, 255, 255, 0.95)',
    borderRightWidth: 2.5,
    borderRightColor: 'rgba(181, 137, 0, 0.22)',
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(181, 137, 0, 0.3)',
    borderRadius: radii.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  horizontalCoverContainer: {
    width: 48,
    height: 72,
    borderRadius: radii.default,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  horizontalCover: {
    width: '100%',
    height: '100%',
  },
  horizontalInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  author: {
    fontFamily: 'Inter_300Light',
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(181, 137, 0, 0.1)',
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primaryContainer,
    borderRadius: radii.full,
  },
  progressText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: '600',
  },
});
