import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { BottomNav } from '../src/components/StatCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono';
import { CourierPrime_400Regular } from '@expo-google-fonts/courier-prime';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    JetBrainsMono_500Medium,
    CourierPrime_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FAF6F0', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#006C4B" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Tabs
        tabBar={(props) => <BottomNav {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="stats" />
        <Tabs.Screen
          name="book/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}

