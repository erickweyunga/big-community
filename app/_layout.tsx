import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable');
}

/**
 * Secure token storage implementation for Clerk
 */
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  },

  async saveToken(key: string, token: string) {
    try {
      await SecureStore.setItemAsync(key, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },
};

/**
 * Auth redirect component that handles authentication routing
 */
function AuthRedirect() {
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();
  const [initialAuthChecked, setInitialAuthChecked] = useState(false);
  const [currentMainSegment, setCurrentMainSegment] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isLoaded) return;

    const mainSegment = segments[0];

    if (initialAuthChecked && mainSegment === currentMainSegment) return;

    setCurrentMainSegment(mainSegment);

    const inTabsGroup = mainSegment === '(tabs)';
    const isProtectedRoute = inTabsGroup;
    const isAuthRoute = mainSegment === undefined ||
      mainSegment === 'otp' ||
      mainSegment === 'verify';

    if (isSignedIn && isAuthRoute) {
      router.replace('/(tabs)/chats');
    } else if (!isSignedIn && isProtectedRoute) {
      router.replace('/');
    }

    if (!initialAuthChecked) {
      setInitialAuthChecked(true);
    }
  }, [isLoaded, isSignedIn, segments, router, initialAuthChecked, currentMainSegment]);

  return null;
}


/**
 * Internal layout component with font loading
 */
function RootLayoutNav() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <>
      <AuthRedirect />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="otp"
          options={{
            headerShown: true,
            headerTitle: 'Enter your phone number',
            headerTitleAlign: 'center',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="verify/[phone]"
          options={{
            headerShown: true,
            headerTitle: 'Verify your phone number',
            headerTitleAlign: 'center',
            headerBackTitle: 'Edit number',
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)/profile" options={{
          presentation: 'modal',
          headerTitle: "Profile",
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="+not-found" options={{ headerShown: true, title: 'Page Not Found' }} />
      </Stack>
    </>
  );
}

/**
 * Root layout component that provides Clerk authentication
 */
export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}