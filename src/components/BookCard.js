import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../utils/theme';

export default function BookCard({ book, onPress }) {
  const progressPercent = Math.round((book.readPages / book.totalPages) * 100);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.coverWrapper}>
        {book.coverUrl ? (
          <Image source={{ uri: book.coverUrl }} style={styles.coverImage} resizeMode="cover" />
        ) : (
          <View style={styles.fallbackCover}>
            <Text style={styles.fallbackText}>{book.title[0]}</Text>
          </View>
        )}
        <View style={styles.spineShadow} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
        
        {/* Luminous progress bar indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressText}>{progressPercent}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.md,
    padding: spacing.unit * 1.5,
    marginVertical: spacing.unit,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  coverWrapper: {
    width: 60,
    height: 90,
    borderRadius: radii.sm,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#2a1700', // Skeuomorphic book spine edge
  },
  coverImage: {
    width: '100%',
    height: '100%',
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
    fontSize: 24,
    color: colors.secondary,
  },
  spineShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.gutter,
    justifyContent: 'center',
  },
  title: {
    fontFamily: typography.headlineMd.fontFamily,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 4,
  },
  author: {
    fontFamily: typography.bodyMd.fontFamily,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.unit,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6', // Neon Sapphire shade
    borderRadius: radii.full,
  },
  progressText: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 10,
    color: colors.onSurfaceVariant,
    marginLeft: 8,
    minWidth: 25,
    textAlign: 'right',
  },
});
