import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, radii, glassMorphism } from '../utils/theme';

/**
 * EmptyState — Presentational component
 * Shown when a filtered book list returns zero results.
 *
 * Props:
 *   title   {string} — headline text
 *   message {string} — supporting body text
 *   icon    {React.Node} — optional icon node
 */
const EmptyState = ({
  title = 'Nothing here yet',
  message = 'Your collection will appear here once you add some books.',
  icon,
}) => (
  <View style={styles.container}>
    <View style={styles.card}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  card: {
    ...glassMorphism.cardLiquid,
    borderRadius: radii.lg,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
  },
  iconWrapper: {
    marginBottom: 16,
  },
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    ...typography.bodyMd,
    color: colors.cyanGrey,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default EmptyState;
