import React from "react";
import { useRouter } from "expo-router";
import StatsScreen from "../src/screens/StatsScreen";
import { useBookStore } from "../src/store/bookStore";

export default function Stats() {
  const router = useRouter();
  const {
    userProfile,
    trendData,
    trendLabels,
    historyLogs,
  } = useBookStore();

  const handleNavPress = (tab) => {
    if (tab === "stats") {
      router.push("/stats");
    } else {
      router.push("/");
    }
  };

  return (
    <StatsScreen
      userProfile={userProfile}
      trendData={trendData}
      trendLabels={trendLabels}
      historyLogs={historyLogs}
      onNavPress={handleNavPress}
      activeTab="stats"
    />
  );
}