import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../utils/theme";
import ProgressRing from "../components/ProgressRing";

const { width, height } = Dimensions.get("window");

export default function BookDetailScreen({
  book = {
    id: "wisdom",
    title: "Le Jardin des Savoirs",
    author: "Ibn Hazm",
    coverUrl: null,
    rating: 5,
    languageTags: ["AR", "FR", "AMAZIGH"],
    progress: 0.45,
    pagesRead: 145,
    totalPages: 320,
  },
  timerSession = {
    formattedTime: "00:26:48",
    isRunning: false,
  },
  onStartTimer,
  onPauseTimer,
  onStopTimer,
  onMarkCompleted,
  onBackPress,
}) {
  const insets = useSafeAreaInsets();
  const displayPercent = Math.round(book.progress * 100);

  // Render Stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= book.rating ? "star" : "star-outline"}
          size={18}
          color={Theme.colors.gold}
          style={{ marginHorizontal: 2 }}
        />
      );
    }
    return <View style={styles.starsRow}>{stars}</View>;
  };

  return (
    <View style={styles.container}>
      {/* Blurred Full-Bleed Backdrop Banner */}
      <View style={styles.backdropContainer}>
        {book.coverUrl ? (
          <Image
            source={
              typeof book.coverUrl === "string"
                ? { uri: book.coverUrl }
                : book.coverUrl
            }
            style={styles.backdropImage}
            blurRadius={20}
          />
        ) : (
          <View style={[styles.backdropImage, styles.backdropPlaceholder]} />
        )}
        {/* Spot/Fader Overlays */}
        <LinearGradient
          colors={["rgba(5, 8, 14, 0.4)", "rgba(5, 8, 14, 1)"]}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {/* Screen Navigation Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={Theme.colors.ivory} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Maqra</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
      >
        {/* Book Cover and Title details */}
        <View style={styles.metaContainer}>
          <View style={styles.book3DWrapper}>
            {book.coverUrl ? (
              <Image
                source={
                  typeof book.coverUrl === "string"
                    ? { uri: book.coverUrl }
                    : book.coverUrl
                }
                style={styles.bookCover}
              />
            ) : (
              <LinearGradient
                colors={["#1E293B", "#0F172A"]}
                style={styles.bookCoverPlaceholder}
              >
                <Ionicons name="book" size={50} color={Theme.colors.gold} />
                <Text style={styles.bookPlaceholderText}>MAQRA</Text>
              </LinearGradient>
            )}
            <View style={styles.bookSpineReflection} />
          </View>

          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>

          {/* Stars Matrix */}
          {renderStars()}

          {/* Language Tags */}
          <View style={styles.tagsContainer}>
            {book.languageTags.map((tag) => (
              <View key={tag} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Concentric Metrics Hub */}
        <View style={styles.metricsHub}>
          <ProgressRing size={150} strokeWidth={10} progress={book.progress}>
            <View style={styles.metricsInner}>
              <Text style={styles.metricsPercent}>{displayPercent}%</Text>
              <Text style={styles.metricsPageCount}>
                p. {book.pagesRead} / {book.totalPages}
              </Text>
            </View>
          </ProgressRing>
        </View>

        {/* Tactile Session Timer Card */}
        <View style={styles.timerCard}>
          <Text style={styles.timerTitle}>Session de Lecture</Text>
          <Text style={styles.clockText}>{timerSession.formattedTime}</Text>

          <View style={styles.controlsRow}>
            {/* Start Button */}
            <TouchableOpacity
              onPress={onStartTimer}
              activeOpacity={0.8}
              style={[
                styles.controlBtn,
                styles.startBtn,
                timerSession.isRunning ? styles.disabledBtn : null,
              ]}
              disabled={timerSession.isRunning}
            >
              <Ionicons name="play" size={14} color={Theme.colors.ivory} />
              <Text style={styles.controlBtnText}>Start</Text>
            </TouchableOpacity>

            {/* Pause Button */}
            <TouchableOpacity
              onPress={onPauseTimer}
              activeOpacity={0.8}
              style={[
                styles.controlBtn,
                styles.pauseBtn,
                !timerSession.isRunning ? styles.disabledBtn : null,
              ]}
              disabled={!timerSession.isRunning}
            >
              <Ionicons name="pause" size={14} color={Theme.colors.cobalt} />
              <Text style={[styles.controlBtnText, { color: Theme.colors.cobalt }]}>
                Pause
              </Text>
            </TouchableOpacity>

            {/* Stop Button */}
            <TouchableOpacity
              onPress={onStopTimer}
              activeOpacity={0.8}
              style={[styles.controlBtn, styles.stopBtn]}
            >
              <Ionicons name="square" size={12} color={Theme.colors.onyx} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Master CTA Button */}
      <View style={[styles.ctaContainer, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity
          onPress={onMarkCompleted}
          activeOpacity={0.8}
          style={[styles.ctaButton, Theme.shadows.emeraldGlow]}
        >
          <Text style={styles.ctaButtonText}>Marquer comme terminé</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.void,
  },
  backdropContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    zIndex: 0,
  },
  backdropImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backdropPlaceholder: {
    backgroundColor: Theme.colors.surface,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 80,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(5, 8, 14, 0.5)",
    ...Theme.borders.glass,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 20,
    color: Theme.colors.ivory,
  },
  scrollContent: {
    paddingHorizontal: 20,
    zIndex: 1,
  },
  metaContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  book3DWrapper: {
    width: 140,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#1E293B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(248, 250, 252, 0.1)",
  },
  bookCover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bookCoverPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bookPlaceholderText: {
    fontFamily: Theme.fonts.serifSemi,
    color: Theme.colors.ivory,
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 3,
  },
  bookSpineReflection: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 20,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  title: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 24,
    color: Theme.colors.ivory,
    textAlign: "center",
    marginBottom: 6,
  },
  author: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 15,
    color: Theme.colors.onyx,
    textAlign: "center",
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  tagPill: {
    backgroundColor: "rgba(248, 250, 252, 0.08)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Theme.geometry.capsule,
    borderWidth: 1,
    borderColor: "rgba(248, 250, 252, 0.12)",
    marginHorizontal: 4,
  },
  tagText: {
    fontFamily: Theme.fonts.sansMedium,
    fontSize: 10,
    color: Theme.colors.ivory,
    letterSpacing: 0.5,
  },
  metricsHub: {
    alignItems: "center",
    marginVertical: 20,
  },
  metricsInner: {
    justifyContent: "center",
    alignItems: "center",
  },
  metricsPercent: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 28,
    color: Theme.colors.ivory,
  },
  metricsPageCount: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 12,
    color: Theme.colors.onyx,
    marginTop: 4,
  },
  timerCard: {
    backgroundColor: Theme.colors.elevatedGlass,
    ...Theme.borders.glass,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  timerTitle: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 12,
    color: Theme.colors.onyx,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  clockText: {
    fontFamily: Theme.fonts.mono,
    fontSize: 32,
    color: Theme.colors.ivory,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 20,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  controlBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    borderRadius: Theme.geometry.capsule,
    paddingHorizontal: 16,
    marginHorizontal: 6,
  },
  startBtn: {
    backgroundColor: Theme.colors.cobalt,
    flex: 1,
  },
  pauseBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Theme.colors.cobalt,
    flex: 1,
  },
  stopBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(100, 116, 139, 0.4)",
    width: 44,
  },
  disabledBtn: {
    opacity: 0.4,
  },
  controlBtnText: {
    fontFamily: Theme.fonts.sansMedium,
    fontSize: 12,
    color: Theme.colors.ivory,
    marginLeft: 6,
  },
  ctaContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(5, 8, 14, 0.9)",
    paddingTop: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "rgba(248, 250, 252, 0.05)",
  },
  ctaButton: {
    backgroundColor: Theme.colors.emerald,
    height: 48,
    borderRadius: Theme.geometry.capsule,
    justifyContent: "center",
    alignItems: "center",
  },
  ctaButtonText: {
    fontFamily: Theme.fonts.sansBold,
    fontSize: 14,
    color: Theme.colors.ivory,
  },
});
