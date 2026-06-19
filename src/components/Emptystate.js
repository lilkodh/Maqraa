import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../utils/theme';

export default function Emptystate({ message = 'No books found on this shelf.' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🏺</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.gutter * 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.gutter,
  },
  icon: {
    fontSize: 48,
    opacity: 0.5,
    marginBottom: spacing.unit * 2,
  },
  message: {
    fontFamily: typography.bodyLg.fontFamily,
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
});
