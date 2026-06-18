import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import {
  useFonts,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/utils/theme';

// ─────────────────────────────────────────────────────────────
// Tab icon — icon only, no labels; active gets fill + glow pill
// ─────────────────────────────────────────────────────────────
const TabIcon = ({ iconActive, iconInactive, focused }) => (
  <View style={styles.tabItem}>
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Ionicons
        name={focused ? iconActive : iconInactive}
        size={26}
        color={focused ? colors.primaryFixedDim : colors.cyanGrey}
      />
    </View>
  </View>
);

// ─────────────────────────────────────────────────────────────
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    JetBrainsMono_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <View style={styles.tabBarBg} />,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          margin: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconActive="library"
              iconInactive="library-outline"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconActive="person"
              iconInactive="person-outline"
              focused={focused}
            />
          ),
        }}
      />

      {/* Hidden route — not shown in tab bar */}
      <Tabs.Screen
        name="book/[id]"
        options={{ href: null }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // ── Tab bar container ──────────────────────────────────────
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 28,
    right: 28,
    height: 72,
    borderRadius: 36,
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },

  // ── Frosted-glass background ───────────────────────────────
  tabBarBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 36,
    backgroundColor: '#0e1d2a',
    borderWidth: 1,
    borderColor: '#1c2d3d',
    overflow: 'hidden',
  },

  // ── Per-tab item ───────────────────────────────────────────
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Icon pill — slightly larger on active
  iconWrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  iconWrapActive: {
    backgroundColor: '#13212e',
  },
});
