import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Theme } from "../utils/theme";

export default function ProgressRing({
  size = 130,
  strokeWidth = 10,
  progress = 0.45,
  children,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Limit progress between 0 and 1
  const safeProgress = Math.min(Math.max(progress, 0), 1);
  const strokeDashoffset = circumference - safeProgress * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Base Path (Deep Navy) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(46, 102, 255, 0.15)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Active Fill Line (Neon-Cobalt) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Theme.colors.cobalt}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {children && <View style={StyleSheet.absoluteFillObject}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  svg: {
    transform: [{ rotate: "0deg" }],
  },
});
