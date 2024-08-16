import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './apps/screens/LoginScreen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo'
import HomeScreen from './apps/screens/Home/HomeScreen';

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'Outfit': require('./assets/fonts/Outfit-Regular.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null; // Or return a loading component
  }

  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <View style={styles.container}>
    <SignedIn>
      <HomeScreen/>
    </SignedIn>
    <SignedOut>
      <LoginScreen/>
    </SignedOut>
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});