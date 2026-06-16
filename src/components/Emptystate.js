import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../utils/theme";

export default function Emptystate({ title = "Aucun livre", description = "Commencez votre voyage littéraire en ajoutant un livre." }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📚</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.surface,
    ...Theme.borders.glass,
    borderRadius: 16,
    marginVertical: 16,
  },
  icon: {
    fontSize: 40,
    marginBottom: 12,
    opacity: 0.8,
  },
  title: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 18,
    color: Theme.colors.ivory,
    textAlign: "center",
    marginBottom: 6,
  },
  description: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 14,
    color: Theme.colors.onyx,
    textAlign: "center",
    lineHeight: 20,
  },
});
