export const Theme = {
  colors: {
    void: "#05080E",
    surface: "#0C1220",
    elevatedGlass: "#141D30",
    cobalt: "#2E66FF",
    emerald: "#10B981",
    gold: "#F59E0B",
    ivory: "#F8FAFC",
    onyx: "#64748B",
  },
  fonts: {
    serifBold: "PlayfairDisplay_700Bold",
    serifSemi: "PlayfairDisplay_600SemiBold",
    sansMedium: "Inter_500Medium",
    sansRegular: "Inter_400Regular",
    sansBold: "Inter_700Bold",
    mono: "Courier New",
  },
  borders: {
    glass: {
      borderWidth: 1,
      borderColor: "rgba(248, 250, 252, 0.15)",
    },
  },
  geometry: {
    capsule: 999,
  },
  shadows: {
    cobaltGlow: {
      shadowColor: "#2E66FF",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    emeraldGlow: {
      shadowColor: "#10B981",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    goldGlow: {
      shadowColor: "#F59E0B",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 6,
    },
  },
};
