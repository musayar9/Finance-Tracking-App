import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Switch, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from '../utils/translations';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(false);
const router = useRouter();
  const settingSections = [
    {
      title: t('appearance'),
      items: [
        {
          title: t('darkMode'),
          icon: 'moon',
          type: 'switch',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          title: t('language'),
          icon: 'language',
          type: 'action',
          value: 'English',
          action: () => router.push('/language-settings' as any),
        },
        {
          title: 'Currency',
          icon: 'card',
          type: 'action',
          value: 'USD ($)',
          action: () => {},
        },
      ],
    },
    {
      title: 'Security & Privacy',
      items: [
        {
          title: 'Biometric Login',
          icon: 'finger-print',
          type: 'switch',
          value: biometrics,
          onToggle: setBiometrics,
        },
        {
          title: 'App Lock',
          icon: 'lock-closed',
          type: 'action',
          value: 'Enabled',
          action: () => {},
        },
        {
          title: 'Data Privacy',
          icon: 'shield-checkmark',
          type: 'action',
          action: () => {},
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          title: 'Push Notifications',
          icon: 'notifications',
          type: 'switch',
          value: notifications,
          onToggle: setNotifications,
        },
        {
          title: 'Email Alerts',
          icon: 'mail',
          type: 'action',
          value: 'Weekly',
          action: () => {},
        },
        {
          title: 'Budget Alerts',
          icon: 'warning',
          type: 'action',
          value: 'Enabled',
          action: () => {},
        },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        {
          title: 'Auto Backup',
          icon: 'cloud-upload',
          type: 'switch',
          value: autoBackup,
          onToggle: setAutoBackup,
        },
        {
          title: 'Export Data',
          icon: 'download',
          type: 'action',
          action: () => {},
        },
        {
          title: 'Clear Cache',
          icon: 'trash',
          type: 'action',
          action: () => {},
        },
      ],
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings')}</Text>
        <Text style={styles.headerSubtitle}>Customize your app experience</Text>
      </View>
      
      {settingSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionCard}>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex}>
                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon as any} size={18} color={COLORS.primaryGreen} />
                    </View>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      {item.value && item.type === 'action' && (
                        <Text style={styles.settingValue}>{item.value}</Text>
                      )}
                    </View>
                  </View>
                  
                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: COLORS.border, true: COLORS.primaryGreen }}
                      thumbColor={COLORS.white}
                    />
                  ) : (
                    <TouchableOpacity onPress={item.action}>
                      <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
                    </TouchableOpacity>
                  )}
                </View>
                {itemIndex < section.items.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        </View>
      ))}
      
      <View style={styles.dangerZone}>
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.dangerItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: COLORS.error + '20' }]}>
                <Ionicons name="trash" size={18} color={COLORS.error} />
              </View>
              <Text style={[styles.settingTitle, { color: COLORS.error }]}>Delete Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Finance App v1.0.0</Text>
        <Text style={styles.footerSubtext}>Made with ❤️ for better financial management</Text>
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
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.xs,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryGreen + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
  },
  settingValue: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: SPACING.md + 32 + SPACING.md,
    marginRight: SPACING.md,
  },
  dangerZone: {
    marginBottom: SPACING.lg,
  },
  dangerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  footerSubtext: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
  },
});