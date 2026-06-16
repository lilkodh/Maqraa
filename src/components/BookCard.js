import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Theme } from "../utils/theme";

export default function BookCard({
  title,
  author,
  coverUrl,
  progress = 0,
  pagesRead,
  totalPages,
  onPress,
}) {
  const displayProgress = Math.round(progress * 100);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.card}
    >
      {/* Book Cover Container */}
      <View style={styles.coverContainer}>
        {coverUrl ? (
          <Image
            source={typeof coverUrl === "string" ? { uri: coverUrl } : coverUrl}
            style={styles.coverImage}
          />
        ) : (
          <View style={styles.placeholderCover}>
            <Text style={styles.placeholderText}>📖</Text>
          </View>
        )}
      </View>

      {/* Info Container */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {author}
          </Text>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${displayProgress}%` },
              ]}
            />
          </View>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressText}>
              {pagesRead !== undefined && totalPages !== undefined
                ? `p. ${pagesRead} / ${totalPages}`
                : `${displayProgress}%`}
            </Text>
            {progress >= 1 && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>Terminé</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.elevatedGlass,
    ...Theme.borders.glass,
    borderRadius: 16,
    flexDirection: "row",
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  coverContainer: {
    width: 60,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Theme.colors.surface,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderCover: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(46, 102, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  placeholderText: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    height: 80,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 16,
    color: Theme.colors.ivory,
  },
  author: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 13,
    color: Theme.colors.onyx,
    marginTop: 2,
  },
  progressSection: {
    width: "100%",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "rgba(248, 250, 252, 0.1)",
    borderRadius: Theme.geometry.capsule,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Theme.colors.cobalt,
    borderRadius: Theme.geometry.capsule,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressText: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 11,
    color: Theme.colors.onyx,
  },
  completedBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Theme.geometry.capsule,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  completedText: {
    fontFamily: Theme.fonts.sansMedium,
    fontSize: 10,
    color: Theme.colors.emerald,
  },
});
