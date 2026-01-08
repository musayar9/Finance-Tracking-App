import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from '../../utils/translations';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendReset = async () => {
    setIsLoading(true);
    // Send reset email logic here
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    handleSendReset();
  };

  const isValidEmail = email.includes('@') && email.includes('.');

  if (emailSent) {
    return (
      <LinearGradient
        colors={[COLORS.background, COLORS.card, COLORS.background]}
        style={styles.container}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Success Content */}
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="mail" size={40} color={COLORS.primaryGreen} />
            </View>
            
            <Text style={styles.successTitle}>{t('verifyEmail')}</Text>
            <Text style={styles.successSubtitle}>
              {t('verificationCodeSent')}{'\n'}
              <Text style={styles.emailText}>{email}</Text>
            </Text>

            <View style={styles.instructionsCard}>
              <Text style={styles.instructionsTitle}>Next Steps:</Text>
              <View style={styles.instruction}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepText}>Check your email inbox</Text>
              </View>
              <View style={styles.instruction}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepText}>Click the reset password link</Text>
              </View>
              <View style={styles.instruction}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepText}>Create your new password</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.resendButton}
              onPress={handleResendEmail}
            >
              <Text style={styles.resendButtonText}>{t('resendCode')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backToLoginButton}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.backToLoginText}>{t('backToSignIn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.card, COLORS.background]}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{t('resetPassword')}</Text>
            <Text style={styles.headerSubtitle}>
              {t('enterEmailToReset')}
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formSection}>
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

          <TouchableOpacity 
            style={[styles.sendButton, !isValidEmail && styles.disabledButton]}
            onPress={handleSendReset}
            disabled={!isValidEmail || isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.sendButtonText}>{t('sendResetLink')}...</Text>
              </View>
            ) : (
              <Text style={styles.sendButtonText}>{t('sendResetLink')}</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t('backToSignIn')}{' '}
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.footerLink}>{t('signIn')}</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
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
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.md,
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: SPACING.xl,
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
  inputIcon: {
    marginRight: SPACING.sm,
  },
  textInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    paddingVertical: SPACING.lg,
  },
  sendButton: {
    backgroundColor: COLORS.primaryGreen,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
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
  sendButtonText: {
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
  // Success Screen Styles
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 2,
    borderColor: COLORS.primaryGreen,
  },
  successTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },
  successSubtitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.xl,
  },
  emailText: {
    color: COLORS.primaryGreen,
    fontWeight: '600',
  },
  instructionsCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    width: '100%',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  instructionsTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  stepNumber: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryGreen + '20',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: SPACING.md,
  },
  stepText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    flex: 1,
  },
  resendButton: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primaryGreen,
    marginBottom: SPACING.md,
  },
  resendButtonText: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  backToLoginButton: {
    paddingVertical: SPACING.md,
  },
  backToLoginText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
  },
});