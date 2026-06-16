import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Rect, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";
import { Theme } from "../utils/theme";

const { width } = Dimensions.get("window");

export default function StatsScreen({
  userProfile = {
    name: "Malek El-Mansour",
    streak: 14,
    totalPages: 8420,
    level: "Savant",
    avatarUrl: null,
  },
  trendData = [4, 6, 3, 8, 5, 7],
  trendLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
  historyLogs = [
    {
      id: "log1",
      bookTitle: "The Art of Wisdom",
      date: "15 juin",
      durationText: "26 min",
      pagesText: "+14 pages",
      progressChangeText: "45%",
    },
    {
      id: "log2",
      bookTitle: "Moorish Architecture",
      date: "12 juin",
      durationText: "42 min",
      pagesText: "+28 pages",
      progressChangeText: "80%",
    },
    {
      id: "log3",
      bookTitle: "Midnight Meditation",
      date: "10 juin",
      durationText: "15 min",
      pagesText: "+8 pages",
      progressChangeText: "12%",
    },
  ],
  onNavPress,
  activeTab = "stats",
}) {
  const insets = useSafeAreaInsets();

  // Max value for graph scale
  const maxVal = Math.max(...trendData, 1);
  const chartHeight = 100;
  const barWidth = 24;
  const barGap = 16;
  const chartWidth = trendData.length * (barWidth + barGap) - barGap;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background Subtle Gradient */}
      <LinearGradient
        colors={["rgba(46, 102, 255, 0.05)", "rgba(5, 8, 14, 0)", "rgba(5, 8, 14, 0)"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
      >
        {/* Header Title */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chrono-Analytics</Text>
        </View>

        {/* Reader Profile Section */}
        <View style={styles.profileSection}>
          <View style={[styles.avatarGlowWrapper, Theme.shadows.goldGlow]}>
            <View style={styles.avatarBorder}>
              <View style={styles.avatarInner}>
                <Ionicons name="person" size={42} color={Theme.colors.gold} />
              </View>
            </View>
          </View>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileRole}>Lecteur Royal</Text>
        </View>

        {/* Performance Matrix Grid */}
        <View style={styles.perfGrid}>
          {/* Streak block with Gold Token style */}
          <View
            style={[
              styles.gridBlock,
              styles.highlightGridBlock,
              Theme.shadows.goldGlow,
            ]}
          >
            <MaterialCommunityIcons
              name="fire"
              size={22}
              color={Theme.colors.gold}
            />
            <Text style={styles.gridValueHighlight}>
              {userProfile.streak}
            </Text>
            <Text style={styles.gridLabel}>Streak Actuel</Text>
          </View>

          {/* Statistics block */}
          <View style={styles.gridBlock}>
            <Ionicons name="book" size={20} color={Theme.colors.cobalt} />
            <Text style={styles.gridValue}>
              {userProfile.totalPages.toLocaleString()}
            </Text>
            <Text style={styles.gridLabel}>Pages Totales</Text>
          </View>

          {/* Level block */}
          <View style={styles.gridBlock}>
            <Ionicons name="ribbon" size={20} color={Theme.colors.emerald} />
            <Text style={[styles.gridValue, { color: Theme.colors.emerald }]}>
              {userProfile.level}
            </Text>
            <Text style={styles.gridLabel}>Rang de Lecture</Text>
          </View>
        </View>

        {/* Native Trend Graph */}
        <View style={styles.graphCard}>
          <Text style={styles.graphTitle}>Livres par mois</Text>
          <View style={styles.chartWrapper}>
            <Svg height={chartHeight} width={chartWidth}>
              <Defs>
                <SvgGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={Theme.colors.cobalt} stopOpacity="1" />
                  <Stop
                    offset="1"
                    stopColor="rgba(46, 102, 255, 0.15)"
                    stopOpacity="0.15"
                  />
                </SvgGradient>
              </Defs>

              {trendData.map((val, idx) => {
                const barHeight = (val / maxVal) * (chartHeight - 15);
                const x = idx * (barWidth + barGap);
                const y = chartHeight - barHeight;

                return (
                  <View key={idx}>
                    {/* Background Bar track */}
                    <Rect
                      x={x}
                      y={0}
                      width={barWidth}
                      height={chartHeight}
                      fill="rgba(248, 250, 252, 0.03)"
                      rx={6}
                    />
                    {/* Active Gradient Bar */}
                    <Rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill="url(#barGrad)"
                      rx={6}
                    />
                    {/* Highlight Glow Cap */}
                    <Rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={4}
                      fill={Theme.colors.ivory}
                      opacity={0.8}
                      rx={2}
                    />
                  </View>
                );
              })}
            </Svg>
          </View>

          {/* X Axis Labels */}
          <View style={[styles.xAxisRow, { width: chartWidth }]}>
            {trendLabels.map((lbl, idx) => (
              <Text key={idx} style={styles.xAxisLabel}>
                {lbl}
              </Text>
            ))}
          </View>
        </View>

        {/* Historical Timeline Ledger */}
        <View style={styles.ledgerCard}>
          <Text style={styles.ledgerTitle}>Historique de Lecture</Text>
          {historyLogs.map((log, index) => (
            <View
              key={log.id}
              style={[
                styles.ledgerRow,
                index === historyLogs.length - 1 ? styles.lastLedgerRow : null,
              ]}
            >
              <View style={styles.ledgerMeta}>
                <Text style={styles.ledgerBookTitle}>{log.bookTitle}</Text>
                <Text style={styles.ledgerDate}>{log.date}</Text>
              </View>
              <View style={styles.ledgerStats}>
                <Text style={styles.ledgerTime}>{log.durationText}</Text>
                <Text style={styles.ledgerPages}>
                  {log.pagesText} ({log.progressChangeText})
                </Text>
              </View>
            </View>
          ))}
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
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 22,
    color: Theme.colors.gold,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarGlowWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarBorder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: Theme.colors.gold,
    padding: 3,
    backgroundColor: Theme.colors.void,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 40,
    backgroundColor: Theme.colors.elevatedGlass,
    ...Theme.borders.glass,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 22,
    color: Theme.colors.ivory,
  },
  profileRole: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 13,
    color: Theme.colors.onyx,
    marginTop: 2,
  },
  perfGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  gridBlock: {
    backgroundColor: Theme.colors.elevatedGlass,
    ...Theme.borders.glass,
    borderRadius: 16,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    height: 100,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  highlightGridBlock: {
    borderColor: Theme.colors.gold,
    borderTopWidth: 2,
  },
  gridValue: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 18,
    color: Theme.colors.ivory,
  },
  gridValueHighlight: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 20,
    color: Theme.colors.gold,
  },
  gridLabel: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 10,
    color: Theme.colors.onyx,
  },
  graphCard: {
    backgroundColor: Theme.colors.elevatedGlass,
    ...Theme.borders.glass,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    alignItems: "center",
  },
  graphTitle: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 12,
    color: Theme.colors.onyx,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  xAxisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  xAxisLabel: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 9,
    color: Theme.colors.onyx,
    width: 24,
    textAlign: "center",
  },
  ledgerCard: {
    backgroundColor: Theme.colors.elevatedGlass,
    ...Theme.borders.glass,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  ledgerTitle: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 12,
    color: Theme.colors.onyx,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },
  ledgerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(245, 158, 11, 0.12)", // Sand colored divider
  },
  lastLedgerRow: {
    borderBottomWidth: 0,
  },
  ledgerMeta: {
    flex: 1.2,
  },
  ledgerBookTitle: {
    fontFamily: Theme.fonts.serifBold,
    fontSize: 14,
    color: Theme.colors.ivory,
  },
  ledgerDate: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 11,
    color: Theme.colors.onyx,
    marginTop: 2,
  },
  ledgerStats: {
    flex: 0.8,
    alignItems: "flex-end",
  },
  ledgerTime: {
    fontFamily: Theme.fonts.mono,
    fontSize: 13,
    color: Theme.colors.cobalt,
    fontWeight: "bold",
  },
  ledgerPages: {
    fontFamily: Theme.fonts.sansRegular,
    fontSize: 11,
    color: Theme.colors.onyx,
    marginTop: 2,
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
