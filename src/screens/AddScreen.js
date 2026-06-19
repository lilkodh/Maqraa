import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, shadows } from '../utils/theme';

export default function AddScreen({
  onAddBook,
  onStartSession,
  onAddPhoto,
  onBack,
}) {
  // Animation values
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;
  const mainRotate = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Automatically fly out on mount
    Animated.parallel([
      Animated.timing(mainRotate, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.stagger(250, [
        Animated.spring(anim1, {
          toValue: 1,
          tension: 10,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(anim2, {
          toValue: 1,
          tension: 10,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(anim3, {
          toValue: 1,
          tension: 10,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleClose = (callback) => {
    Animated.parallel([
      Animated.timing(mainRotate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.stagger(150, [
        Animated.timing(anim3, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(anim2, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(anim1, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      if (callback) {
        callback();
      } else {
        onBack();
      }
    });
  };

  const rotation = mainRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  });

  const titleOpacity = mainRotate.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  // Coordinates for the symmetrical arc from the bottom-center (center of floating + button)
  // Radius = 95
  // Button 1 (top-left, 135 degrees): dx = -67.2, dy = -67.2
  // We use different input/output mappings to curve the translation path into an arc
  const sub1TranslateX = anim1.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, -10, -67.2],
  });
  const sub1TranslateY = anim1.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, -60, -67.2],
  });

  // Button 2 (top-center, 90 degrees): dx = 0, dy = -95
  const sub2TranslateX = 0;
  const sub2TranslateY = anim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -95],
  });

  // Button 3 (top-right, 45 degrees): dx = 67.2, dy = -67.2
  // We use different input/output mappings to curve the translation path into an arc
  const sub3TranslateX = anim3.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 10, 67.2],
  });
  const sub3TranslateY = anim3.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, -60, -67.2],
  });

  // Scale and Opacity
  const sub1Scale = anim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });
  const sub2Scale = anim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });
  const sub3Scale = anim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const subButtons = [
    {
      id: 'add_book',
      icon: 'library-add',
      label: 'Add Book',
      translateX: sub1TranslateX,
      translateY: sub1TranslateY,
      scale: sub1Scale,
      opacity: anim1,
      onPress: () => handleClose(onAddBook),
    },
    {
      id: 'start_session',
      icon: 'play-arrow',
      label: 'Start Session',
      translateX: sub2TranslateX,
      translateY: sub2TranslateY,
      scale: sub2Scale,
      opacity: anim2,
      onPress: () => handleClose(onStartSession),
    },
    {
      id: 'add_photo',
      icon: 'add-a-photo',
      label: 'Add Photo',
      translateX: sub3TranslateX,
      translateY: sub3TranslateY,
      scale: sub3Scale,
      opacity: anim3,
      onPress: () => handleClose(onAddPhoto),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropOpacity,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdropPressable}
          activeOpacity={1}
          onPress={() => handleClose()}
        />
      </Animated.View>

      {/* Header Info */}
      <Animated.View style={[styles.headerContainer, { opacity: titleOpacity }]}>
        <Text style={styles.headerTitle}>Add to Library</Text>
        <Text style={styles.headerSubtitle}>
          Select an option below to add a new book to your reading shelf.
        </Text>
      </Animated.View>

      {/* Symmetrical sub-buttons flying out from bottom center */}
      {subButtons.map((btn) => (
        <Animated.View
          key={btn.id}
          style={[
            styles.subButtonContainer,
            {
              opacity: btn.opacity,
              transform: [
                { translateX: btn.translateX },
                { translateY: btn.translateY },
                { scale: btn.scale },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.subButton, shadows.active]}
            onPress={btn.onPress}
            activeOpacity={0.8}
          >
            <MaterialIcons name={btn.icon} size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.subButtonLabel}>{btn.label}</Text>
        </Animated.View>
      ))}

      {/* Center close button positioned exactly over the tab bar center '+' */}
      <TouchableOpacity
        style={[styles.closeButton, shadows.active]}
        onPress={() => handleClose()}
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <MaterialIcons name="add" size={32} color={colors.white} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(250, 246, 240, 0.92)',
    zIndex: 10,
  },
  backdropPressable: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: '30%',
    left: spacing.marginEdge,
    right: spacing.marginEdge,
    alignItems: 'center',
    zIndex: 15,
  },
  headerTitle: {
    fontSize: 26,
    color: colors.primary,
    fontFamily: 'Inter_700Bold',
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'Inter_300Light',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  subButtonContainer: {
    position: 'absolute',
    // Positioned relative to bottom center
    bottom: Platform.OS === 'ios' ? 58 : 42,
    alignItems: 'center',
    zIndex: 20,
    width: 100, // Fixed width for consistent label layout
  },
  subButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  subButtonLabel: {
    color: colors.textPrimary,
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    // Centers the button relative to the tab bar center '+'
    bottom: Platform.OS === 'ios' ? 58 : 42,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
});
