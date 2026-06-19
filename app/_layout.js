import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
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

  if (Platform.OS === 'ios') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NativeTabs
          screenOptions={{
            headerShown: false,
          }}
        >
          <NativeTabs.Screen
            name="index"
            options={{
              title: 'Home',
            }}
          />
          <NativeTabs.Screen
            name="stats"
            options={{
              title: 'Profile',
            }}
          />
          <NativeTabs.Screen
            name="book/[id]"
            options={{
              href: null,
            }}
          />
        </NativeTabs>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FAF6F0' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="stats" />
        <Stack.Screen name="book/[id]" />
      </Stack>
    </SafeAreaProvider>
  );
}
