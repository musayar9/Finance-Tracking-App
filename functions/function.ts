import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

export async function requireBiometricAuth() {
  const enabled = await SecureStore.getItemAsync("biometric_enabled");

  if (enabled !== "true") {
    return true; // biyometri kapalıysa devam
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Ödeme işlemini onayla",
    fallbackLabel: "Şifre kullan",
    cancelLabel: "İptal",
    disableDeviceFallback: false,
  });
  console.log("result", result);
  return result.success;
}
