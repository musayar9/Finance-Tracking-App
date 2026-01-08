import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { user } from '../constants/mockData';

export default function PersonalInfoScreen() {
  const personalInfo = [
    { label: 'Full Name', value: user.name, icon: 'person' },
    { label: 'Email', value: user.email, icon: 'mail' },
    { label: 'Phone', value: '+1 (555) 123-4567', icon: 'call' },
    { label: 'Date of Birth', value: 'January 15, 1990', icon: 'calendar' },
    { label: 'Address', value: '123 Main St, New York, NY 10001', icon: 'location' },
    { label: 'Occupation', value: 'Software Engineer', icon: 'briefcase' },
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
        <Text style={styles.headerTitle}>Personal Information</Text>
        <TouchableOpacity onPress={() => router.push('/edit-profile')}>
          <Ionicons name="create" size={24} color={COLORS.primaryGreen} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoList}>
        {personalInfo.map((item, index) => (
          <View key={index} style={styles.infoItem}>
            <View style={styles.infoLeft}>
              <Ionicons name={item.icon as any} size={20} color={COLORS.primaryGreen} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          </View>
        ))}
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
  infoList: {
    marginBottom: SPACING.lg,
  },
  infoItem: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  infoLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.xs,
  },
  infoValue: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
  },
});