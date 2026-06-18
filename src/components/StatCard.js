import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, radii, glassMorphism, shadows } from '../utils/theme';

/**
 * StatCard — Presentational component
 * Displays a single statistic in a glass-morphism tile.
 *
 * Props:
 *   label      {string}     — label text (e.g. "Books Read")
 *   value      {string}     — large displayed value (e.g. "42")
 *   unit       {string}     — optional unit suffix (e.g. "hrs", "Days")
 *   icon       {React.Node} — optional icon node rendered top-left
 *   accent     {string}     — optional accent color for the value
 *   highlight  {boolean}    — if true, renders gold streak styling
 *   style      {object}     — optional container style override
 */
const StatCard = ({
  label,
  value,
  unit,
  icon,
  accent,
  highlight = false,
  style,
}) => {
  const valueColor = accent ?? (highlight ? colors.tertiaryFixedDim : colors.primaryFixedDim);

  return (
    <View
      style={[
        styles.card,
        highlight ? styles.cardHighlight : styles.cardDefault,
        style,
      ]}
    >

      {/* Absolute fire badge for streak */}
      {highlight && (
        <View style={styles.highlightBadge}>
          <MaterialCommunityIcons
            name="fire"
            size={14}
            color={colors.tertiaryFixedDim}
          />
        </View>
      )}

      {/* Icon top-left */}
      {icon && <View style={styles.iconWrapper}>{icon}</View>}

      {/* Stats */}
      <View style={styles.bottom}>
        <View style={styles.valueRow}>
          <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
          {!!unit && (
            <Text style={[styles.unit, { color: valueColor }]}>{' '}{unit}</Text>
          )}
        </View>
        <Text style={[styles.label, highlight && styles.labelHighlight]}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.md,
    padding: 20,
    aspectRatio: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...shadows.card,
  },
  cardDefault: {
    ...glassMorphism.cardLiquid,
  },
  cardHighlight: {
    backgroundColor: '#161922',
    borderWidth: 1.5,
    borderColor: '#4a3824',
    shadowColor: '#ffb95f',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 5,
  },

  iconWrapper: {
    alignSelf: 'flex-start',
  },
  bottom: {
    marginTop: 'auto',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    ...typography.headlineLg,
    lineHeight: 40,
  },
  unit: {
    ...typography.bodyMd,
    fontSize: 14,
    marginBottom: 4,
  },
  label: {
    ...typography.labelMd,
    color: colors.cyanGrey,
    marginTop: 2,
  },
  labelHighlight: {
    color: colors.tertiary,
  },
  highlightBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.background,
    padding: 6,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.tertiary,
    zIndex: 10,
  },
});

export default StatCard;
