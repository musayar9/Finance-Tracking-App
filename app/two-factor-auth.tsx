import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Switch, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TwoFactorAuthScreen() {
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [authenticatorEnabled, setAuthenticatorEnabled] = useState(false);

  const authMethods = [
    {
      title: 'SMS Authentication',
      description: 'Receive codes via text message',
      icon: 'chatbubble',
      enabled: smsEnabled,
      onToggle: setSmsEnabled,
    },
    {
      title: 'Email Authentication',
      description: 'Receive codes via email',
      icon: 'mail',
      enabled: emailEnabled,
      onToggle: setEmailEnabled,
    },
    {
      title: 'Authenticator App',
      description: 'Use Google Authenticator or similar',
      icon: 'shield-checkmark',
      enabled: authenticatorEnabled,
      onToggle: setAuthenticatorEnabled,
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Two-Factor Authentication</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="shield-checkmark" size={32} color={COLORS.primaryGreen} />
        <Text style={styles.infoTitle}>Secure Your Account</Text>
        <Text style={styles.infoDescription}>
          Two-factor authentication adds an extra layer of security to your account by requiring a second form of verification.
        </Text>
      </View>

      <View style={styles.methodsList}>
        {authMethods.map((method, index) => (
          <View key={index} style={styles.methodItem}>
            <View style={styles.methodLeft}>
              <View style={styles.methodIcon}>
                <Ionicons name={method.icon as any} size={20} color={COLORS.primaryGreen} />
              </View>
              <View style={styles.methodContent}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodDescription}>{method.description}</Text>
              </View>
            </View>
            <Switch
              value={method.enabled}
              onValueChange={method.onToggle}
              trackColor={{ false: COLORS.border, true: COLORS.primaryGreen }}
              thumbColor={COLORS.white}
            />
          </View>
        ))}
      </View>

      <View style={styles.backupCodes}>
        <Text style={styles.backupTitle}>Backup Codes</Text>
        <Text style={styles.backupDescription}>
          Generate backup codes that you can use if you lose access to your primary 2FA method.
        </Text>
        <TouchableOpacity style={styles.generateButton}>
          <Ionicons name="download" size={20} color={COLORS.background} />
          <Text style={styles.generateButtonText}>Generate Backup Codes</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: Platform.OS === 'android' ? 100 : 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  infoDescription: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  methodsList: {
    marginBottom: SPACING.xl,
  },
  methodItem: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  methodContent: {
    flex: 1,
  },
  methodTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  methodDescription: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  backupCodes: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backupTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  backupDescription: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  generateButton: {
    backgroundColor: COLORS.primaryGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  generateButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
});