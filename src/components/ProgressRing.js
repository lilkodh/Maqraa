import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors, typography } from '../utils/theme';

export default function ProgressRing({
  size = 120,
  strokeWidth = 8,
  progress = 0,
  showText = true,
  centerText = '',
  subText = '',
  strokeColor = '#afcadb',
  textColor = '#afcadb',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient id="sapphireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={strokeColor} />
            <Stop offset="100%" stopColor={strokeColor} />
          </LinearGradient>
        </Defs>
        {/* Background Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(189, 216, 233, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Luminous Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#sapphireGrad)"
          strokeWidth={strokeWidth + 2}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.percentageText, { color: textColor }]}>
            {centerText || `${Math.round(clampedProgress)}%`}
          </Text>
          {subText ? <Text style={styles.subText}>{subText}</Text> : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontFamily: typography.displayLg.fontFamily,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subText: {
    fontFamily: typography.metadataSm.fontFamily,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    marginTop: 2,
    textAlign: 'center',
  },
});
