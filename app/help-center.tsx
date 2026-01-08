import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HelpCenterScreen() {
  const helpCategories = [
    {
      title: 'Getting Started',
      icon: 'rocket',
      items: [
        'How to set up your account',
        'Connecting your bank accounts',
        'Understanding your dashboard',
        'Setting up budgets and goals',
      ],
    },
    {
      title: 'Account & Security',
      icon: 'shield-checkmark',
      items: [
        'Two-factor authentication',
        'Password security',
        'Account verification',
        'Privacy settings',
      ],
    },
    {
      title: 'Transactions & Payments',
      icon: 'card',
      items: [
        'Adding transactions manually',
        'Categorizing expenses',
        'Setting up recurring payments',
        'Understanding transaction sync',
      ],
    },
    {
      title: 'Subscriptions & Bills',
      icon: 'calendar',
      items: [
        'Managing subscriptions',
        'Bill reminders',
        'Canceling subscriptions',
        'Tracking recurring expenses',
      ],
    },
  ];

  const quickActions = [
    { title: 'Contact Support', icon: 'mail', action: () => {} },
    { title: 'Report a Bug', icon: 'bug', action: () => {} },
    { title: 'Feature Request', icon: 'bulb', action: () => {} },
    { title: 'Live Chat', icon: 'chatbubble', action: () => {} },
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
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchCard}>
        <Ionicons name="search" size={20} color={COLORS.muted} />
        <Text style={styles.searchPlaceholder}>Search for help articles...</Text>
      </View>

      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionItem} onPress={action.action}>
              <Ionicons name={action.icon as any} size={24} color={COLORS.primaryGreen} />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Help Categories</Text>
        {helpCategories.map((category, index) => (
          <View key={index} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon as any} size={20} color={COLORS.primaryGreen} />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Ionicons name="chevron-down" size={16} color={COLORS.muted} />
            </View>
            <View style={styles.categoryItems}>
              {category.items.map((item, itemIndex) => (
                <TouchableOpacity key={itemIndex} style={styles.categoryItem}>
                  <Text style={styles.categoryItemText}>{item}</Text>
                  <Ionicons name="chevron-forward" size={14} color={COLORS.muted} />
                </TouchableOpacity>
              ))}
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
  searchCard: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchPlaceholder: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    marginLeft: SPACING.md,
  },
  quickActionsSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    backgroundColor: COLORS.card,
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickActionText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  categoriesSection: {
    marginBottom: SPACING.lg,
  },
  categoryCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  categoryTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  categoryItems: {
    padding: SPACING.sm,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  categoryItemText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    flex: 1,
  },
});