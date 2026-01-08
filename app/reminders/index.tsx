import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import SectionHeader from '../../components/SectionHeader';
import { Ionicons } from '@expo/vector-icons';

export default function RemindersScreen() {
  const reminders = [
    {
      id: 1,
      title: 'Netflix Payment Due',
      description: 'Your Netflix subscription renews tomorrow',
      type: 'bill',
      time: '2 hours ago',
      priority: 'high',
      icon: 'card',
    },
    {
      id: 2,
      title: 'Budget Alert',
      description: 'You\'ve spent 85% of your dining budget',
      type: 'budget',
      time: '5 hours ago',
      priority: 'medium',
      icon: 'warning',
    },
    {
      id: 3,
      title: 'Savings Goal',
      description: 'Great job! You\'re ahead on your vacation fund',
      type: 'goal',
      time: '1 day ago',
      priority: 'low',
      icon: 'flag',
    },
    {
      id: 4,
      title: 'Investment Update',
      description: 'Your portfolio gained 2.5% this week',
      type: 'investment',
      time: '2 days ago',
      priority: 'low',
      icon: 'trending-up',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return COLORS.error;
      case 'medium':
        return COLORS.warning;
      default:
        return COLORS.success;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bill':
        return COLORS.accentBlue;
      case 'budget':
        return COLORS.warning;
      case 'goal':
        return COLORS.primaryGreen;
      case 'investment':
        return COLORS.secondary;
      default:
        return COLORS.muted;
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title="Reminders" />
      
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Active Reminders</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color={COLORS.background} />
          </TouchableOpacity>
        </View>
        <Text style={styles.totalCount}>{reminders.length}</Text>
        <Text style={styles.summarySubtitle}>
          {reminders.filter(r => r.priority === 'high').length} high priority alerts
        </Text>
      </View>
      
      <View style={styles.filterButtons}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.activeFilterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Goals</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.remindersList}>
        {reminders.map((reminder) => (
          <TouchableOpacity key={reminder.id} style={styles.reminderCard}>
            <View style={styles.reminderHeader}>
              <View style={[styles.reminderIcon, { backgroundColor: getTypeColor(reminder.type) }]}>
                <Ionicons name={reminder.icon as any} size={18} color={COLORS.background} />
              </View>
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <Text style={styles.reminderDescription}>{reminder.description}</Text>
                <Text style={styles.reminderTime}>{reminder.time}</Text>
              </View>
              <View style={styles.reminderRight}>
                <View style={[
                  styles.priorityDot, 
                  { backgroundColor: getPriorityColor(reminder.priority) }
                ]} />
                <TouchableOpacity style={styles.dismissButton}>
                  <Ionicons name="close" size={16} color={COLORS.muted} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Notification Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications" size={20} color={COLORS.accentBlue} />
            <Text style={styles.settingText}>Push Notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="time" size={20} color={COLORS.primaryGreen} />
            <Text style={styles.settingText}>Reminder Frequency</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="volume-high" size={20} color={COLORS.warning} />
            <Text style={styles.settingText}>Sound & Vibration</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
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
  summaryCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryTitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalCount: {
    color: COLORS.white,
    fontSize: FONTS.sizes.display,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  summarySubtitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  filterButtons: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeFilter: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen,
  },
  filterText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  activeFilterText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  remindersList: {
    marginBottom: SPACING.lg,
  },
  reminderCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reminderIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  reminderDescription: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
    lineHeight: 18,
  },
  reminderTime: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
  },
  reminderRight: {
    alignItems: 'center',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: SPACING.sm,
  },
  dismissButton: {
    padding: SPACING.xs,
  },
  settingsCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  settingsTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
    marginLeft: SPACING.md,
  },
});