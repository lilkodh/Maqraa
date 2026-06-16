import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../utils/theme";

export default function StatCard({ title, value, icon, isHighlight = false }) {
  return (
    <View
      style={[
        styles.card,
        isHighlight ? styles.highlightCard : null,
        isHighlight ? Theme.shadows.goldGlow : null,
      ]}
    >
      {/* Icon and Title */}
      <View style={styles.headerRow}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Value */}
      <Text style={[styles.value, isHighlight ? styles.highlightValue : null]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.elevatedGlass,
    ...Theme.borders.glass,
    borderRadius: 16,
    padding: 14,
    flex: 1,
    minWidth: 100,
    marginHorizontal: 4,
    justifyContent: "space-between",
    height: 100,
  },
  highlightCard: {
    borderColor: Theme.colors.gold,
    borderTopWidth: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 6,
  },
  title: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 12,
    color: Theme.colors.onyx,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 22,
    color: Theme.colors.ivory,
  },
  highlightValue: {
    color: Theme.colors.gold,
  },
});
