import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import StatsScreen from '../src/screens/StatsScreen';
import useBookStore from '../src/store/bookStore';
import { colors, typography, spacing } from '../src/utils/theme';

export default function StatsRoute() {
  const profile = useBookStore(s => s.profile);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {/* ── Shared top bar ──────────────────────── */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="menu" size={24} color={colors.cyanGrey} />
        </TouchableOpacity>

        <Text style={styles.logo}>Maqra</Text>

        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="person-circle-outline" size={26} color={colors.cyanGrey} />
        </TouchableOpacity>
      </View>

      <StatsScreen profile={profile} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.containerPadding,
    paddingTop: 52,
    paddingBottom: 12,
    backgroundColor: '#061422',
    borderBottomWidth: 1,
    borderBottomColor: '#1c2d3d',
  },
  logo: {
    ...typography.headlineMd,
    color: colors.tertiary,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
