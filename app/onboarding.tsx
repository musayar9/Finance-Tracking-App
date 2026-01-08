import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BORDER_RADIUS, COLORS, FONTS, SHADOWS, SPACING } from "../utils/theme";
import { useTranslation } from "../utils/translations";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const { t } = useTranslation();
  
  const handleGoogleSignIn = () => {
    // Google Sign In logic here
    console.log("Google Sign In");
    router.push("/(tabs)/home"); // Temporary navigation
  };

  const handleAppleSignIn = () => {
    // Apple Sign In logic here
    console.log("Apple Sign In");
    router.push("/(tabs)/home"); // Temporary navigation
  };

  const handleOtherOptions = () => {
    router.push("/auth/login");
  };

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.card, COLORS.background]}
      style={styles.container}
    >
      <ScrollView style={{ paddingHorizontal: SPACING.md }} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons
                name="trending-up"
                size={40}
                color={COLORS.primaryGreen}
              />
            </View>
            <Text style={styles.appName}>FinanceAI</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            {t('takeControl')}{"\n"}
            <Text style={styles.heroTitleAccent}>{t('financialFuture')}</Text>
          </Text>
          
          <Text style={styles.heroSubtitle}>
            {t('aiPoweredInsights')}
          </Text>

          {/* Feature Highlights */}
          <View style={styles.features}>
            <View style={styles.feature}>
              <Ionicons name="sparkles" size={16} color={COLORS.primaryGreen} />
              <Text style={styles.featureText}>{t('aiFinancialAssistant')}</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons
                name="shield-checkmark"
                size={16}
                color={COLORS.primaryGreen}
              />
              <Text style={styles.featureText}>{t('bankLevelSecurity')}</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons
                name="analytics"
                size={16}
                color={COLORS.primaryGreen}
              />
              <Text style={styles.featureText}>{t('smartAnalytics')}</Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          {/* Google Sign In */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
          >
            <View style={styles.socialIcon}>
              <Text style={styles.googleIcon}>G</Text>
            </View>
            <Text
              style={[styles.socialButtonText, { color: COLORS.background }]}
            >
              {t('continueWithGoogle')}
            </Text>
          </TouchableOpacity>

          {/* Apple Sign In - Only show on iOS */}
          {Platform.OS === "ios" && (
            <TouchableOpacity
              style={styles.appleButton}
              onPress={handleAppleSignIn}
            >
              <View style={styles.socialIcon}>
                <Ionicons name="logo-apple" size={20} color={COLORS.white} />
              </View>
              <Text style={styles.socialButtonText}>{t('continueWithApple')}</Text>
            </TouchableOpacity>
          )}

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t('or')}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Other Options */}
          <TouchableOpacity
            style={styles.otherButton}
            onPress={handleOtherOptions}
          >
            <Text style={styles.otherButtonText}>{t('otherSignInOptions')}</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={COLORS.primaryGreen}
            />
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.termsText}>
            {t('termsAgreement')}{" "}
            <Text style={styles.termsLink}>{t('termsOfService')}</Text> {t('and')}{" "}
            <Text style={styles.termsLink}>{t('privacyPolicy')}</Text>
          </Text>
        </View>

        {/* Background Decoration */}
        <View style={styles.backgroundDecoration}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center"

  },
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 80,
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primaryGreen,
    ...SHADOWS.soft,
  },
  appName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxl,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  heroSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 42,
    marginBottom: SPACING.lg,
  },
  heroTitleAccent: {
    color: COLORS.primaryGreen,
  },
  heroSubtitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.lg,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.sm,
  },
  features: {
    alignItems: "center",
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  featureText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "500",
    marginLeft: SPACING.sm,
  },
  ctaSection: {
    paddingBottom: Platform.OS === "ios" ? 0 : 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    
    marginVertical: SPACING.sm,
    ...SHADOWS.soft,
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  socialIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4285F4",
  },
  socialButtonText: {
    flex: 1,
    textAlign: "center",
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    color: COLORS.white,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginHorizontal: SPACING.md,
  },
  otherButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primaryGreen,
    marginBottom: SPACING.md,
  },
  otherButtonText: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.lg,
    fontWeight: "600",
    marginRight: SPACING.sm,
  },
  termsText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: COLORS.primaryGreen,
    fontWeight: "500",
  },
  backgroundDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  circle: {
    position: "absolute",
    borderRadius: 100,
    backgroundColor: COLORS.primaryGreen,
    opacity: 0.05,
  },
  circle1: {
    width: 200,
    height: 200,
    top: height * 0.1,
    right: -100,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: height * 0.3,
    left: -75,
  },
  circle3: {
    width: 100,
    height: 100,
    top: height * 0.6,
    right: width * 0.2,
  },
});
