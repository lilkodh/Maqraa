import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, radii, spacing, shadows } from '../utils/theme';

export function StatCard({ title, value, iconName, iconColor = colors.primary }) {
  return (
    <View style={[styles.card, shadows.card]}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={iconName} size={28} color={iconColor} />
      </View>
      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

export function BottomNav({ activeTab = 'home' }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home', route: '/' },
    { id: 'add', label: 'Add', icon: 'add', route: '/add' },
    { id: 'profile', label: 'Profile', icon: 'person', route: '/stats' },
  ];

  const handlePress = (tab) => {
    // Navigate using router
    router.push(tab.route);
  };

  return (
    <View style={[styles.navContainer, shadows.active]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        if (tab.id === 'add') {
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.centerAddButton, shadows.active]}
              onPress={() => handlePress(tab)}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name="add"
                size={28}
                color={colors.white}
              />
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
            onPress={() => handlePress(tab)}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={tab.icon}
              size={24}
              color={isActive ? colors.secondary : colors.textSecondary}
            />
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: spacing.containerPadding,
    borderRadius: radii.xl,
    flex: 1,
    minWidth: '45%',
    marginBottom: spacing.md,
  },
  iconContainer: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  valueText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 28,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginTop: spacing.sm,
  },
  titleText: {
    fontFamily: 'Inter_300Light',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Navigation styles
  navContainer: {
    position: 'absolute',
    bottom: 24,
    left: spacing.marginEdge,
    right: spacing.marginEdge,
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 0,
    zIndex: 100,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: radii.full,
    minWidth: 64,
  },
  activeTabButton: {
    backgroundColor: 'rgba(62, 89, 172, 0.1)', // Light tint of Majorelle Blue
  },
  tabLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  activeTabLabel: {
    fontFamily: 'Inter_600SemiBold',
    color: colors.secondary,
    fontWeight: '600',
  },
  centerAddButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20, // Float slightly above the tab bar line
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
