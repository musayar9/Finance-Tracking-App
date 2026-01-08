import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { user } from "../constants/mockData";
import { BORDER_RADIUS, COLORS, FONTS, SHADOWS, SPACING } from "../utils/theme";
import { useTranslation } from "../utils/translations";
export default function ProfileScreen() {
  const { t } = useTranslation();
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSecureStore = async (value: boolean) => {
    await SecureStore.setItemAsync("biometric_enabled", JSON.stringify(value));
  };

  const loadBiometricSetting = async () => {
    try {
      const stored = await SecureStore.getItemAsync("biometric_enabled");
      if (stored) {
        setFaceIdEnabled(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading biometric setting:', error);
    }
  };

  // Load setting on component mount
  useEffect(() => {
    loadBiometricSetting();
  }, []);
console.log(faceIdEnabled)
  const profileSections = [
    {
      title: t("account"),
      items: [
        {
          title: t("personalInformation"),
          icon: "person",
          action: () => router.push("/personal-info"),
        },
        {
          title: t("paymentMethods"),
          icon: "card",
          action: () => router.push("/payment-methods"),
        },
        {
          title: t("connectedBanks"),
          icon: "business",
          action: () => router.push("/connected-banks"),
        },
      ],
    },
    {
      title: t("security"),
      items: [
        {
          title: t("changePassword"),
          icon: "lock-closed",
          action: () => router.push("/change-password"),
        },
        {
          title: t("twoFactorAuth"),
          icon: "shield-checkmark",
          action: () => router.push("/two-factor-auth"),
        },
        { title: t("loginHistory"), icon: "time", action: () => {} },
      ],
    },
    {
      title: t("support"),
      items: [
        {
          title: t("helpCenter"),
          icon: "help-circle",
          action: () => router.push("/help-center"),
        },
        { title: t("contactSupport"), icon: "mail", action: () => {} },
        { title: t("privacyPolicy"), icon: "document-text", action: () => {} },
      ],
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/edit-profile")}
        >
          <Text style={styles.editButtonText}>{t("editProfile")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickSettings}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons
              name="finger-print"
              size={20}
              color={COLORS.primaryGreen}
            />
            <Text style={styles.settingTitle}>{t("faceIdTouchId")}</Text>
          </View>
          <Switch
            value={faceIdEnabled}
            onValueChange={(value) => {
              setFaceIdEnabled(value);
              handleSecureStore(value);
            }}
            trackColor={{ false: COLORS.border, true: COLORS.primaryGreen }}
            thumbColor={COLORS.white}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons
              name="notifications"
              size={20}
              color={COLORS.accentBlue}
            />
            <Text style={styles.settingTitle}>{t("pushNotifications")}</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: COLORS.border, true: COLORS.primaryGreen }}
            thumbColor={COLORS.white}
          />
        </View>
      </View>

      {profileSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={COLORS.muted}
                />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.push("/auth/login")}
      >
        <Ionicons name="log-out" size={20} color={COLORS.white} />
        <Text style={styles.logoutText}>{t("signOut")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: Platform.OS === "android" ? 100 : 80,
  },
  profileHeader: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    marginBottom: SPACING.lg,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  avatar: {
    fontSize: 40,
  },
  userName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  userEmail: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    marginBottom: SPACING.md,
  },
  editButton: {
    backgroundColor: COLORS.primaryGreen,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  editButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
  },
  quickSettings: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    marginLeft: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    marginBottom: SPACING.md,
  },
  menuItem: {
    backgroundColor: COLORS.card,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    marginLeft: SPACING.md,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.lg,
  },
  logoutText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    marginLeft: SPACING.sm,
  },
});
