import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, radii, glassMorphism, shadows } from '../utils/theme';

/**
 * BookCard — Presentational component
 * Displays a book cover with title, author, and progress overlay.
 *
 * Props:
 *   book       {object}   — { id, title, author, cover, progress, status }
 *   onPress    {function} — called when card is tapped
 *   style      {object}   — optional container style override
 */
const BookCard = ({ book, onPress, style }) => {
  const { title, author, cover, progress, status } = book;

  const statusLabel = status === 'finished'
    ? 'Finished'
    : status === 'in_progress'
    ? `${progress}%`
    : 'Unread';

  const statusColor = status === 'finished'
    ? colors.emeraldSuccess
    : status === 'in_progress'
    ? colors.primaryFixedDim
    : colors.cyanGrey;

  const statusBg = status === 'finished'
    ? '#0f3a2c'
    : status === 'in_progress'
    ? '#0d2f3c'
    : '#13212e';

  const statusBorder = status === 'finished'
    ? colors.emeraldSuccess
    : status === 'in_progress'
    ? colors.primaryFixedDim
    : colors.outlineVariant;

  const isArabic = book.language === 'Arabic';

  const coverWrapperStyle = [
    styles.coverWrapper,
    isArabic ? { borderLeftWidth: 0, borderRightWidth: 4, borderRightColor: '#000000' } : {}
  ];

  const spineStyle = [
    styles.spine,
    isArabic ? { left: undefined, right: 0 } : {}
  ];

  const progressBarTrackStyle = [
    styles.progressBarTrack,
    isArabic ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }
  ];

  const textStyle = isArabic ? { textAlign: 'right', writingDirection: 'rtl' } : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.8}
    >
      {/* Book cover */}
      <View style={coverWrapperStyle}>
        <Image
          source={{ uri: cover }}
          style={styles.cover}
          resizeMode="cover"
        />
        {/* Spine shadow */}
        <View style={spineStyle} />
        {/* Liquid glass status badge */}
        <View style={[
          styles.statusBadge,
          { backgroundColor: statusBg, borderColor: statusBorder },
        ]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusLabel}
          </Text>
        </View>
        {/* Progress bar at bottom */}
        {status === 'in_progress' && (
          <View style={progressBarTrackStyle}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
        )}
      </View>

      {/* Text info */}
      <Text style={[styles.title, textStyle]} numberOfLines={1}>{title}</Text>
      <Text style={[styles.author, textStyle]} numberOfLines={1}>{author}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  coverWrapper: {
    aspectRatio: 2 / 3,
    borderRadius: radii.sm,
    overflow: 'hidden',
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#000000',
    ...shadows.card,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  spine: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#000000',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 20,
    left: 8,
    right: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radii.full,
    paddingVertical: 3,
  },
  statusText: {
    ...typography.dataMono,
    fontSize: 10,
    letterSpacing: 0.6,
  },
  progressBarTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#1d2b39',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primaryFixedDim,
    borderRadius: 2,
  },
  title: {
    ...typography.labelMd,
    color: colors.onSurface,
    marginBottom: 2,
  },
  author: {
    ...typography.bodyMd,
    fontSize: 12,
    color: colors.cyanGrey,
  },
});

export default BookCard;
