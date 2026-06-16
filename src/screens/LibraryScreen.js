import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "../utils/theme";
import ProgressRing from "../components/ProgressRing";
import StatCard from "../components/StatCard";
import BookCard from "../components/BookCard";
import Emptystate from "../components/Emptystate";

const { width } = Dimensions.get("window");

export default function LibraryScreen({
  userProfile = {
    name: "Malek El-Mansour",
    streak: 14,
    booksRead: 28,
    totalPages: 8420,
    annualGoalProgress: 0.68,
  },
  activeBook = {
    id: "wisdom",
    title: "The Art of Wisdom",
    author: "Ibn Hazm",
    coverUrl: null,
    progress: 0.45,
    pagesRead: 145,
    totalPages: 320,
  },
  books = [],
  categories = ["Tous", "En cours", "Terminés"],
  activeCategory = "Tous",
  onCategorySelect,
  onBookSelect,
  onSearchPress,
  onAddBookPress,
  onNavPress,
  activeTab = "library",
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background Subtle Spotlight */}
      <LinearGradient
        colors={["rgba(245, 158, 11, 0.08)", "rgba(5, 8, 14, 0)", "rgba(5, 8, 14, 0)"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
      />

      {/* Header Tier */}
      <View style={styles.header}>
        <Text style={styles.logo}>Maqra</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={onSearchPress}
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <Ionicons name="search-outline" size={20} color={Theme.colors.gold} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onAddBookPress}
            style={[styles.iconButton, { marginLeft: 12 }]}
            activeOpacity={0.7}
          >
            <Ionicons name="add-outline" size={22} color={Theme.colors.gold} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
      >
        {/* Showcase Shelf Section */}
        <View style={styles.shelfContainer}>
          {/* Spotlight Highlight Glow */}
          <LinearGradient
            colors={["rgba(46, 102, 255, 0.12)", "transparent"]}
            style={styles.shelfSpotlight}
          />

          <View style={styles.shelfContent}>
            {/* Active Book 3D Showcase */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onBookSelect && onBookSelect(activeBook.id)}
              style={styles.book3DWrapper}
            >
              {activeBook.coverUrl ? (
                <Image
                  source={
                    typeof activeBook.coverUrl === "string"
                      ? { uri: activeBook.coverUrl }
                      : activeBook.coverUrl
                  }
                  style={styles.book3DCover}
                />
              ) : (
                <LinearGradient
                  colors={["#1E293B", "#0F172A"]}
                  style={styles.book3DCoverPlaceholder}
                >
                  <Ionicons name="book" size={40} color={Theme.colors.gold} />
                  <Text style={styles.book3DPlaceholderText}>MAQRA</Text>
                </LinearGradient>
              )}
              {/* Glossy Spine Reflection Overlay */}
              <View style={styles.bookSpineReflection} />
            </TouchableOpacity>

            {/* Floating Progress Ring */}
            <View style={styles.ringWrapper}>
              <ProgressRing
                size={110}
                strokeWidth={8}
                progress={userProfile.annualGoalProgress}
              >
                <View style={styles.ringInnerContent}>
                  <Text style={styles.ringPercentText}>
                    {Math.round(userProfile.annualGoalProgress * 100)}%
                  </Text>
                  <Text style={styles.ringLabel}>Objectif</Text>
                </View>
              </ProgressRing>
            </View>
          </View>

          {/* Skeuomorphic Wooden Shelf Ledge */}
          <View style={styles.woodShelf}>
            <LinearGradient
              colors={["#3b2314", "#23120a", "#120603"]}
              style={styles.woodShelfGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            {/* Wood lip line */}
            <View style={styles.woodShelfLip} />
          </View>
        </View>

        {/* Quick-Stats Dashboard Row */}
        <View style={styles.statsRow}>
          <StatCard
            title="Streak"
            value={`${userProfile.streak} Jours`}
            isHighlight={true}
            icon={
              <MaterialCommunityIcons
                name="fire"
                size={18}
                color={Theme.colors.gold}
              />
            }
          />
          <StatCard
            title="Livres Lus"
            value={`${userProfile.booksRead}`}
            icon={
              <Ionicons
                name="book-outline"
                size={16}
                color={Theme.colors.cobalt}
              />
            }
          />
          <StatCard
            title="Pages"
            value={userProfile.totalPages.toLocaleString()}
            icon={
              <Ionicons
                name="document-text-outline"
                size={16}
                color={Theme.colors.emerald}
              />
            }
          />
        </View>

        {/* Pill Categorization Row */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  activeOpacity={0.8}
                  onPress={() => onCategorySelect && onCategorySelect(cat)}
                  style={[
                    styles.categoryPill,
                    isActive ? styles.activeCategoryPill : null,
                    isActive ? Theme.shadows.cobaltGlow : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isActive ? styles.activeCategoryText : null,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Book Catalog Section */}
        <View style={styles.catalogContainer}>
          {books.length === 0 ? (
            <Emptystate />
          ) : (
            books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
                progress={book.progress}
                pagesRead={book.pagesRead}
                totalPages={book.totalPages}
                onPress={() => onBookSelect && onBookSelect(book.id)}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Presentational Bottom Navigation Bar */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavPress && onNavPress("library")}
        >
          <Ionicons
            name="library"
            size={22}
            color={
              activeTab === "library" ? Theme.colors.cobalt : Theme.colors.onyx
            }
          />
          <Text
            style={[
              styles.navText,
              activeTab === "library" ? styles.activeNavText : null,
            ]}
          >
            Maqra
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavPress && onNavPress("stats")}
        >
          <Ionicons
            name="stats-chart"
            size={22}
            color={
              activeTab === "stats" ? Theme.colors.cobalt : Theme.colors.onyx
            }
          />
          <Text
            style={[
              styles.navText,
              activeTab === "stats" ? styles.activeNavText : null,
            ]}
          >
            Chrono
          </Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
  },
  logo: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 26,
    color: Theme.colors.gold,
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(245, 158, 11, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.15)",
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  shelfContainer: {
    height: 230,
    backgroundColor: "rgba(12, 18, 32, 0.4)",
    borderRadius: 20,
    ...Theme.borders.glass,
    overflow: "hidden",
    marginVertical: 16,
    position: "relative",
    justifyContent: "flex-end",
  },
  shelfSpotlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  shelfContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingBottom: 16,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  book3DWrapper: {
    width: 100,
    height: 140,
    borderRadius: 8,
    backgroundColor: "#1E293B",
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 12 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
    overflow: "hidden",
    transform: [{ rotateY: "-15deg" }, { skewY: "2deg" }],
    borderWidth: 1,
    borderColor: "rgba(248, 250, 252, 0.1)",
  },
  book3DCover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  book3DCoverPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  book3DPlaceholderText: {
    fontFamily: Theme.fonts.serifSemi,
    color: Theme.colors.ivory,
    fontSize: 12,
    marginTop: 8,
    letterSpacing: 2,
  },
  bookSpineReflection: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 15,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  ringWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  ringInnerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ringPercentText: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 20,
    color: Theme.colors.ivory,
  },
  ringLabel: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 10,
    color: Theme.colors.onyx,
    marginTop: 2,
  },
  woodShelf: {
    height: 16,
    width: "100%",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  woodShelfGradient: {
    flex: 1,
  },
  woodShelfLip: {
    height: 2,
    backgroundColor: "rgba(255,255,255,0.06)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryScroll: {
    paddingVertical: 4,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: Theme.geometry.capsule,
    borderWidth: 1,
    borderColor: "rgba(248, 250, 252, 0.15)",
    backgroundColor: "transparent",
    marginRight: 8,
  },
  activeCategoryPill: {
    backgroundColor: Theme.colors.cobalt,
    borderColor: Theme.colors.cobalt,
  },
  categoryText: {
    fontFamily: Theme.fonts.sansMedium,
    fontSize: 13,
    color: Theme.colors.onyx,
  },
  activeCategoryText: {
    color: Theme.colors.ivory,
  },
  catalogContainer: {
    width: "100%",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(12, 18, 32, 0.95)",
    borderTopWidth: 1,
    borderColor: "rgba(248, 250, 252, 0.1)",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    height: 75,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navText: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 11,
    color: Theme.colors.onyx,
    marginTop: 4,
  },
  activeNavText: {
    color: Theme.colors.cobalt,
    fontFamily: Theme.fonts.sansMedium,
  },
});
