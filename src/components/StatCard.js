import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../utils/theme';

export default function StatCard({ title, value, icon, style }) {
  return (
    <View style={[styles.card, style]}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'rgba(29, 54, 83, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: radii.lg,
    padding: spacing.gutter,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 4,
  },
  icon: {
    fontSize: 36,
    marginBottom: spacing.unit,
  },
  title: {
    fontFamily: typography.labelSm.fontFamily,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 4,
  },
  value: {
    fontFamily: typography.labelMd.fontFamily,
    fontSize: 28,
    fontWeight: '700',
    color: colors.secondary,
    textAlign: 'center',
  },
});
