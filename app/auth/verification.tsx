import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from '../../utils/translations';

export default function VerificationScreen() {
  const { t } = useTranslation();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
    if (newCode.every(digit => digit !== '') && !isLoading) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join('');
    
    if (codeToVerify.length !== 6) {
      alert('Please enter the complete verification code');
      return;
    }

    setIsLoading(true);
    // Verification logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push('/(tabs)/home');
    }, 1500);
  };

  const handleResendCode = () => {
    setTimer(60);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    
    // Resend code logic here
    console.log('Resending verification code');
  };

  const isCodeComplete = code.every(digit => digit !== '');

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
            <View style={styles.iconContainer}>
              <Ionicons name="shield-checkmark" size={40} color={COLORS.primaryGreen} />
            </View>
            <Text style={styles.headerTitle}>{t('verifyEmail')}</Text>
            <Text style={styles.headerSubtitle}>
              {t('verificationCodeSent')}{'\n'}
              <Text style={styles.emailText}>alex@example.com</Text>
            </Text>
          </View>
        </View>

        {/* Verification Code Input */}
        <View style={styles.codeSection}>
          <Text style={styles.codeLabel}>{t('enterVerificationCode')}</Text>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[
                  styles.codeInput,
                  digit && styles.filledInput,
                  isCodeComplete && styles.completeInput
                ]}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>
        </View>

        {/* Timer and Resend */}
        <View style={styles.timerSection}>
          {!canResend ? (
            <Text style={styles.timerText}>
              Resend code in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendText}>{t('resendCode')}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={[styles.verifyButton, !isCodeComplete && styles.disabledButton]}
            onPress={() => handleVerify()}
            disabled={!isCodeComplete || isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.verifyButtonText}>{t('verify')}...</Text>
              </View>
            ) : (
              <Text style={styles.verifyButtonText}>{t('verify')}</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <View style={styles.helpCard}>
            <Ionicons name="information-circle" size={20} color={COLORS.accentBlue} />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>{t('didntReceiveCode')}</Text>
              <Text style={styles.helpText}>
                {t('resendCode')}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Wrong email?{' '}
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text style={styles.footerLink}>Change Email</Text>
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.primaryGreen,
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
  },
  emailText: {
    color: COLORS.primaryGreen,
    fontWeight: '600',
  },
  codeSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  codeLabel: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.lg,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SPACING.md,
  },
  codeInput: {
    width: 50,
    height: 60,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    textAlign: 'center',
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.white,
  },
  filledInput: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.primaryGreen + '10',
  },
  completeInput: {
    borderColor: COLORS.success,
  },
  timerSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  timerText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
  },
  resendText: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  buttonSection: {
    marginBottom: SPACING.xl,
  },
  verifyButton: {
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
  verifyButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  helpSection: {
    marginBottom: SPACING.xl,
  },
  helpCard: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.accentBlue,
  },
  helpContent: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  helpTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  helpText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
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