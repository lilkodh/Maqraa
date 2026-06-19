import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, radii, spacing, shadows } from '../utils/theme';
import useBookStore from '../store/bookStore';

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

export function BottomNav({ activeTab = 'home', state, descriptors, navigation }) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const isBottomSheetOpen = useBookStore((state) => state.isBottomSheetOpen);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setIsKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setIsKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (isKeyboardVisible || isBottomSheetOpen) {
    return null;
  }

  const isTabBar = !!state;
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home', route: '/' },
    { id: 'profile', label: 'Profile', icon: 'person', route: '/stats' },
  ];

  let currentActiveTab = activeTab;

  if (isTabBar) {
    const routeName = state.routes[state.index].name;
    if (routeName === 'index') currentActiveTab = 'home';
    else if (routeName === 'stats') currentActiveTab = 'profile';

    // Hide bottom tab bar on detail screens (e.g. book/[id])
    if (routeName === 'book/[id]') {
      return null;
    }
  }

  const handlePress = (tab) => {
    if (isTabBar) {
      if (tab.id === 'home') {
        navigation.navigate('index');
      } else if (tab.id === 'profile') {
        navigation.navigate('stats');
      }
    } else {
      router.push(tab.route);
    }
  };

  return (
    <View style={[styles.navContainer, shadows.active]}>
      {tabs.map((tab) => {
        const isActive = currentActiveTab === tab.id;
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
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderLeftColor: 'rgba(255, 255, 255, 0.95)',
    borderTopColor: 'rgba(255, 255, 255, 0.95)',
    borderRightWidth: 2.5,
    borderRightColor: 'rgba(181, 137, 0, 0.22)',
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(181, 137, 0, 0.3)',
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
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 30,
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
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: radii.full,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
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
});
