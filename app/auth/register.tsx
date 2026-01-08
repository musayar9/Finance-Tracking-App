import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from '../../utils/translations';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    // Register logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/verification');
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up');
    router.push('/(tabs)/home');
  };

  const handleAppleSignUp = () => {
    console.log('Apple Sign Up');
    router.push('/(tabs)/home');
  };

  const canRegister = fullName.length > 0 && 
                     email.length > 0 && 
                     password.length >= 6 && 
                     confirmPassword.length > 0 && 
                     agreeToTerms;

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.card, COLORS.background]}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{t('createAccount')}</Text>
            <Text style={styles.headerSubtitle}>{t('joinFinanceAI')}</Text>
          </View>
        </View>

        {/* Social Signup */}
        <View style={styles.socialSection}>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
            <View style={styles.socialIcon}>
              <Text style={styles.googleIcon}>G</Text>
            </View>
            <Text style={[styles.socialButtonText, {color:COLORS.background}]}>{t('continueWithGoogle')}</Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignUp}>
              <View style={styles.socialIcon}>
                <Ionicons name="logo-apple" size={20} color={COLORS.white} />
              </View>
              <Text style={styles.socialButtonText}>{t('continueWithApple')}</Text>
            </TouchableOpacity>
          )}

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t('or')}</Text>
            <View style={styles.dividerLine} />
          </View>
        </View>

        {/* Register Form */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('fullName')}</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color={COLORS.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={fullName}
                onChangeText={setFullName}
                placeholder={t('fullName')}
                placeholderTextColor={COLORS.muted}
                autoComplete="name"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('email')}</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color={COLORS.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder={t('email')}
                placeholderTextColor={COLORS.muted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('password')}</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color={COLORS.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password (min. 6 characters)"
                placeholderTextColor={COLORS.muted}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={COLORS.muted} 
                />
              </TouchableOpacity>
            </View>
            {password.length > 0 && password.length < 6 && (
              <Text style={styles.errorText}>Password must be at least 6 characters</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('confirmPassword')}</Text>
            <View style={[
              styles.inputContainer,
              confirmPassword.length > 0 && !passwordsMatch && styles.errorInput
            ]}>
              <Ionicons name="lock-closed" size={20} color={COLORS.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor={COLORS.muted}
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={COLORS.muted} 
                />
              </TouchableOpacity>
            </View>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}
          </View>

          {/* Terms Agreement */}
          <TouchableOpacity 
            style={styles.termsContainer}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View style={[styles.checkbox, agreeToTerms && styles.checkedBox]}>
              {agreeToTerms && (
                <Ionicons name="checkmark" size={16} color={COLORS.background} />
              )}
            </View>
            <Text style={styles.termsText}>
              {t('termsAgreement')}{' '}
              <Text style={styles.termsLink}>{t('termsOfService')}</Text>
              {' '}{t('and')}{' '}
              <Text style={styles.termsLink}>{t('privacyPolicy')}</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.registerButton, !canRegister && styles.disabledButton]}
            onPress={handleRegister}
            disabled={!canRegister || isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.registerButtonText}>{t('createAccount')}...</Text>
              </View>
            ) : (
              <Text style={styles.registerButtonText}>{t('createAccount')}</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t('alreadyHaveAccount')}{' '}
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.footerLink}>{t('signIn')}</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    marginBottom: SPACING.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
  },
  socialSection: {
    marginBottom: SPACING.lg,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.soft,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  socialIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
  },
  socialButtonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.white,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
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
  formSection: {
    marginBottom: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
  },
  errorInput: {
    borderColor: COLORS.error,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  textInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    paddingVertical: SPACING.lg,
  },
  eyeButton: {
    padding: SPACING.sm,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: SPACING.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen,
  },
  termsText: {
    flex: 1,
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
  },
  termsLink: {
    color: COLORS.primaryGreen,
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: COLORS.primaryGreen,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.soft,
  },
  disabledButton: {
    backgroundColor: COLORS.muted,
    opacity: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
  },
  footerLink: {
    color: COLORS.primaryGreen,
    fontWeight: '600',
  },
});