import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import SectionHeader from '../../components/SectionHeader';
import GoalCard from '../../components/GoalCard';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function GoalsScreen() {
  const goals = [
    {
      id: 1,
      title: 'Emergency Fund',
      currentAmount: 8500,
      targetAmount: 15000,
      deadline: 'Jun 2024',
      icon: 'shield-checkmark',
    },
    {
      id: 2,
      title: 'New Car',
      currentAmount: 12000,
      targetAmount: 25000,
      deadline: 'Dec 2024',
      icon: 'car-sport',
    },
    {
      id: 3,
      title: 'Vacation Fund',
      currentAmount: 2800,
      targetAmount: 5000,
      deadline: 'Mar 2024',
      icon: 'airplane',
    },
  ];

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title="Savings Goals" />
      
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Total Progress</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/create-goal')}
          >
            <Ionicons name="add" size={20} color={COLORS.background} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.totalAmount}>${totalSaved.toLocaleString()}</Text>
        <Text style={styles.targetAmount}>of ${totalTarget.toLocaleString()}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${overallProgress}%` }]} />
          </View>
          <Text style={styles.progressText}>{overallProgress.toFixed(0)}%</Text>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{goals.length}</Text>
            <Text style={styles.statLabel}>Active Goals</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              ${(totalTarget - totalSaved).toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.goalsContainer}>
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            title={goal.title}
            currentAmount={goal.currentAmount}
            targetAmount={goal.targetAmount}
            deadline={goal.deadline}
            icon={goal.icon}
            onPress={() => {}}
          />
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.createGoalButton}
        onPress={() => router.push('/create-goal')}
      >
        <Ionicons name="add-circle" size={24} color={COLORS.primaryGreen} />
        <Text style={styles.createGoalText}>Create New Goal</Text>
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
    marginBottom: SPACING.md,
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
  totalAmount: {
    color: COLORS.white,
    fontSize: FONTS.sizes.display,
    fontWeight: '800',
  },
  targetAmount: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.lg,
    marginBottom: SPACING.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    marginRight: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primaryGreen,
    borderRadius: BORDER_RADIUS.sm,
  },
  progressText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    minWidth: 35,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  goalsContainer: {
    marginBottom: SPACING.lg,
  },
  createGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.primaryGreen,
    borderStyle: 'dashed',
  },
  createGoalText: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
});