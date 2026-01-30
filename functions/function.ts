import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Alert, Linking, Platform } from "react-native";
import { router } from "expo-router";

// Biyometrik doğrulama gereksinimlerini kontrol et
export async function checkBiometricRequirements() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
  
  let biometricType = "Biyometrik";
  if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
    biometricType = "Face ID";
  } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
    biometricType = "Touch ID";
  }
  
  return { hasHardware, isEnrolled, biometricType, supportedTypes };
}

// Kritik işlemler için biyometrik doğrulama zorunlu tut
export async function requireBiometricAuth() {
  const enabled = await SecureStore.getItemAsync("biometric_enabled");

  if (enabled !== "true") {
    // Biyometrik kimlik doğrulama kapalı
    Alert.alert(
      "Biyometrik Kimlik Doğrulama Kapalı",
      "Güvenlik için biyometrik kimlik doğrulamayı etkinleştirmenizi öneririz.",
      [
        {
          text: "Daha Sonra",
          style: "cancel"
        },
        {
          text: "Ayarlara Git",
          onPress: () => router.push("/profile")
        }
      ]
    );
    return true; // biyometri kapalıysa devam
  }

  const { hasHardware, isEnrolled, biometricType } = await checkBiometricRequirements();
  
  if (!hasHardware) {
    Alert.alert(
      "Biyometrik Doğrulama Desteklenmiyor",
      "Cihazınız biyometrik doğrulamayı desteklemiyor.",
      [{ text: "Tamam" }]
    );
    return false;
  }
  
  if (!isEnrolled) {
    Alert.alert(
      `${biometricType} Ayarlanmamış`,
      `Cihazınızda ${biometricType} ayarlanmamış. Lütfen cihaz ayarlarından ${biometricType}'yi etkinleştirin.`,
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Cihaz Ayarları",
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('App-Prefs:TOUCHID_PASSCODE');
            } else {
              Linking.openSettings();
            }
          }
        }
      ]
    );
    return false;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: `İşlemi ${biometricType} ile onayla`,
    fallbackLabel: "Şifre kullan",
    cancelLabel: "İptal",
    disableDeviceFallback: false,
  });
  
  return result.success;
}

// Biyometrik doğrulama test et (profil ayarları için)
export async function testBiometricAuth() {
  const { hasHardware, isEnrolled, biometricType } = await checkBiometricRequirements();
  
  if (!hasHardware || !isEnrolled) {
    return { success: false, error: 'NOT_AVAILABLE' };
  }
  
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: `${biometricType} ile doğrulayın`,
      fallbackLabel: "Şifre kullan",
      cancelLabel: "İptal",
      disableDeviceFallback: false,
    });
    
    return { success: result.success, error: result.error };
  } catch (error) {
    return { success: false, error: 'UNKNOWN_ERROR' };
  }
}
