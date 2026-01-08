import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import SectionHeader from '../../components/SectionHeader';
import { Ionicons } from '@expo/vector-icons';

export default function AIAdvisorScreen() {
  const budgetScore = 85;
  
  const recommendations = [
    {
      category: 'Food & Dining',
      current: 25,
      recommended: 20,
      savings: 180,
      color: COLORS.warning,
    },
    {
      category: 'Transportation',
      current: 15,
      recommended: 15,
      savings: 0,
      color: COLORS.success,
    },
    {
      category: 'Entertainment',
      current: 10,
      recommended: 8,
      savings: 80,
      color: COLORS.accentBlue,
    },
    {
      category: 'Shopping',
      current: 20,
      recommended: 15,
      savings: 200,
      color: COLORS.error,
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title="Budget Advisor" />
      
      <View style={styles.scoreCard}>
        <View style={styles.scoreHeader}>
          <Ionicons name="trophy" size={32} color={COLORS.primaryGreen} />
          <Text style={styles.scoreTitle}>Budget Score</Text>
        </View>
        <Text style={styles.scoreValue}>{budgetScore}/100</Text>
        <Text style={styles.scoreDescription}>
          Great job! You're managing your budget well.
        </Text>
      </View>
      
      <View style={styles.recommendationsSection}>
        <Text style={styles.sectionTitle}>Recommended Budget Distribution</Text>
        
        {recommendations.map((item, index) => (
          <View key={index} style={styles.recommendationCard}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{item.category}</Text>
              <View style={styles.percentageContainer}>
                <Text style={styles.currentPercentage}>{item.current}%</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.muted} />
                <Text style={[styles.recommendedPercentage, { color: item.color }]}>
                  {item.recommended}%
                </Text>
              </View>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.currentProgress, 
                    { width: `${item.current}%`, backgroundColor: COLORS.muted }
                  ]} 
                />
                <View 
                  style={[
                    styles.recommendedProgress, 
                    { width: `${item.recommended}%`, backgroundColor: item.color }
                  ]} 
                />
              </View>
            </View>
            
            {item.savings > 0 && (
              <Text style={styles.savingsText}>
                Potential savings: ${item.savings}/month
              </Text>
            )}
          </View>
        ))}
      </View>
      
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>AI Tips</Text>
        <View style={styles.tip}>
          <Ionicons name="bulb" size={20} color={COLORS.primaryGreen} />
          <Text style={styles.tipText}>
            Consider meal planning to reduce dining expenses by 15%
          </Text>
        </View>
        <View style={styles.tip}>
          <Ionicons name="bulb" size={20} color={COLORS.primaryGreen} />
          <Text style={styles.tipText}>
            Set up automatic transfers to savings after each paycheck
          </Text>
        </View>
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
  scoreCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  scoreHeader: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  scoreTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginTop: SPACING.sm,
  },
  scoreValue: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.display,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  scoreDescription: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
  },
  recommendationsSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  recommendationCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPercentage: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginRight: SPACING.xs,
  },
  recommendedPercentage: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  progressContainer: {
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  currentProgress: {
    height: '100%',
    position: 'absolute',
    opacity: 0.5,
  },
  recommendedProgress: {
    height: '100%',
    position: 'absolute',
  },
  savingsText: {
    color: COLORS.success,
    fontSize: FONTS.sizes.xs,
    fontWeight: '500',
  },
  tipsCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  tipsTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  tipText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginLeft: SPACING.sm,
    flex: 1,
    lineHeight: 18,
  },
});