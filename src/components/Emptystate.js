import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../utils/theme';

export default function Emptystate({ message = 'No data available', subMessage = 'Check back later.' }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="menu-book" size={48} color={colors.textSecondary} style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subMessage}>{subMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  icon: {
    opacity: 0.3,
    marginBottom: spacing.md,
  },
  message: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
  subMessage: {
    fontFamily: 'Inter_300Light',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
