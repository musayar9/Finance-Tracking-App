import { Stack } from "expo-router";
import { LanguageProvider } from '../components/LanguageProvider';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="language-settings" />
        <Stack.Screen name="payment-methods" />
        <Stack.Screen name="add-payment-method" />
      </Stack>
    </LanguageProvider>
  );
}
