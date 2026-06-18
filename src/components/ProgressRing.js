import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../utils/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

/**
 * ProgressRing — Presentational component
 * Renders an animated glowing circular progress ring with an animated centered label.
 *
 * Props:
 *   size       {number}  — diameter in dp (default 64)
 *   progress   {number}  — 0–100
 *   strokeWidth {number} — stroke width (default 4)
 *   label      {string}  — text shown in centre (e.g. "12/20")
 *   labelStyle {object}  — optional extra label text style
 */
const ProgressRing = ({
  size = 64,
  progress = 0,
  strokeWidth = 4,
  label = '',
  labelStyle,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const center = size / 2;

  // Shared value for progress animation
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(clampedProgress, { duration: 800 });
  }, [clampedProgress]);

  // Animated props for the SVG Circle
  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (animatedProgress.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  // Animated props for the centered text counter
  const animatedTextProps = useAnimatedProps(() => {
    let text = label;
    if (label.endsWith('%')) {
      text = `${Math.round(animatedProgress.value)}%`;
    } else {
      const match = label.match(/^(\d+)\/(\d+)$/);
      if (match) {
        const denominator = parseInt(match[2]);
        const currentNumerator = Math.round((animatedProgress.value / 100) * denominator);
        text = `${currentNumerator}/${denominator}`;
      }
    }
    return {
      text,
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        {/* Track circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.surfaceContainerHighest}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress arc — rotated -90° so it starts at top */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.primaryContainer}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
          animatedProps={animatedCircleProps}
        />
      </Svg>
      {!!label && (
        <View style={styles.labelWrapper}>
          <View style={styles.labelInner}>
            <AnimatedTextInput
              style={[
                styles.label,
                {
                  fontSize: Math.max(8, size * 0.16),
                  padding: 0,
                  margin: 0,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                },
                labelStyle,
              ]}
              value={label}
              editable={false}
              pointerEvents="none"
              underlineColorAndroid="transparent"
              animatedProps={animatedTextProps}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.primary,
    fontFamily: 'JetBrainsMono_500Medium',
    textAlign: 'center',
  },
});

export default ProgressRing;
