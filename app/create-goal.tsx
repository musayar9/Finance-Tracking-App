import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CreateGoalScreen() {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [autoSaveAmount, setAutoSaveAmount] = useState('');
  const [description, setDescription] = useState('');

  const goalCategories = [
    { id: 'emergency', name: 'Emergency Fund', icon: 'shield-checkmark', color: COLORS.error },
    { id: 'vacation', name: 'Vacation', icon: 'airplane', color: COLORS.accentBlue },
    { id: 'car', name: 'New Car', icon: 'car-sport', color: COLORS.secondary },
    { id: 'house', name: 'House/Apartment', icon: 'home', color: COLORS.primaryGreen },
    { id: 'education', name: 'Education', icon: 'school', color: COLORS.warning },
    { id: 'wedding', name: 'Wedding', icon: 'heart', color: COLORS.error },
    { id: 'gadget', name: 'Electronics', icon: 'phone-portrait', color: COLORS.accentBlue },
    { id: 'investment', name: 'Investment', icon: 'trending-up', color: COLORS.success },
    { id: 'other', name: 'Other', icon: 'ellipsis-horizontal', color: COLORS.muted },
  ];

  const deadlineOptions = [
    { id: '3months', label: '3 Months', value: '3 months' },
    { id: '6months', label: '6 Months', value: '6 months' },
    { id: '1year', label: '1 Year', value: '1 year' },
    { id: '2years', label: '2 Years', value: '2 years' },
    { id: 'custom', label: 'Custom', value: 'custom' },
  ];

  const handleSave = () => {
    console.log('Creating goal:', {
      name: goalName,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0,
      deadline,
      category: selectedCategory,
      autoSave: autoSaveEnabled,
      autoSaveAmount: autoSaveEnabled ? parseFloat(autoSaveAmount) : 0,
      description,
    });
    router.back();
  };

  const canSave = goalName && targetAmount && deadline && selectedCategory;
  const progress = currentAmount && targetAmount ? (parseFloat(currentAmount) / parseFloat(targetAmount)) * 100 : 0;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Goal</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Goal Information</Text>
        <TextInput
          style={styles.textInput}
          value={goalName}
          onChangeText={setGoalName}
          placeholder="Goal name (e.g., Emergency Fund, New MacBook)"
          placeholderTextColor={COLORS.muted}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Target Amount</Text>
        <View style={styles.amountInput}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountField}
            value={targetAmount}
            onChangeText={setTargetAmount}
            placeholder="0.00"
            placeholderTextColor={COLORS.muted}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Amount (Optional)</Text>
        <View style={styles.amountInput}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountField}
            value={currentAmount}
            onChangeText={setCurrentAmount}
            placeholder="0.00"
            placeholderTextColor={COLORS.muted}
            keyboardType="numeric"
          />
        </View>
        {currentAmount && targetAmount && (
          <View style={styles.progressPreview}>
            <Text style={styles.progressText}>
              {progress.toFixed(1)}% of your goal completed
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.categoryGrid}>
          {goalCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <Ionicons name={category.icon as any} size={18} color={COLORS.background} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Target Deadline</Text>
        <View style={styles.deadlineOptions}>
          {deadlineOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.deadlineOption,
                deadline === option.value && styles.selectedDeadline
              ]}
              onPress={() => setDeadline(option.value)}
            >
              <Text style={[
                styles.deadlineText,
                deadline === option.value && styles.selectedDeadlineText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {deadline === 'custom' && (
          <TextInput
            style={[styles.textInput, { marginTop: SPACING.sm }]}
            placeholder="Enter custom deadline (e.g., Dec 2024, 18 months)"
            placeholderTextColor={COLORS.muted}
            onChangeText={(text) => setDeadline(text)}
          />
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.autoSaveHeader}>
          <Text style={styles.sectionTitle}>Auto-Save</Text>
          <TouchableOpacity 
            style={[styles.toggleButton, autoSaveEnabled && styles.activeToggle]}
            onPress={() => setAutoSaveEnabled(!autoSaveEnabled)}
          >
            <Text style={[styles.toggleText, autoSaveEnabled && styles.activeToggleText]}>
              {autoSaveEnabled ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {autoSaveEnabled && (
          <View style={styles.autoSaveSettings}>
            <Text style={styles.autoSaveLabel}>Monthly auto-save amount</Text>
            <View style={styles.amountInput}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountField}
                value={autoSaveAmount}
                onChangeText={setAutoSaveAmount}
                placeholder="0.00"
                placeholderTextColor={COLORS.muted}
                keyboardType="numeric"
              />
            </View>
            {autoSaveAmount && targetAmount && (
              <Text style={styles.autoSaveInfo}>
                You'll reach your goal in approximately {Math.ceil(parseFloat(targetAmount) / parseFloat(autoSaveAmount))} months
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description (Optional)</Text>
        <TextInput
          style={[styles.textInput, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Add a description or motivation for this goal..."
          placeholderTextColor={COLORS.muted}
          multiline
        />
      </View>

      <View style={styles.motivationCard}>
        <View style={styles.motivationHeader}>
          <Ionicons name="trophy" size={20} color={COLORS.warning} />
          <Text style={styles.motivationTitle}>Stay Motivated!</Text>
        </View>
        <Text style={styles.motivationText}>
          Setting clear financial goals increases your chances of achieving them by 42%. 
          We'll send you progress updates and celebrate milestones with you!
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.createButton, !canSave && styles.disabledButton]}
        onPress={handleSave}
        disabled={!canSave}
      >
        <Ionicons name="flag" size={20} color={COLORS.background} />
        <Text style={styles.createButtonText}>Create Goal</Text>
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
    paddingBottom: Platform.OS === 'android' ? 100 : 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    paddingTop: Platform.OS === 'ios' ? 50 : SPACING.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  section: {
    margin: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  textInput: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  currencySymbol: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    marginRight: SPACING.sm,
  },
  amountField: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
  },
  progressPreview: {
    marginTop: SPACING.md,
  },
  progressText: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primaryGreen,
    borderRadius: BORDER_RADIUS.sm,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCategory: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.primaryGreen + '20',
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  categoryName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    textAlign: 'center',
  },
  deadlineOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deadlineOption: {
    width: '48%',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedDeadline: {
    borderColor: COLORS.accentBlue,
    backgroundColor: COLORS.accentBlue + '20',
  },
  deadlineText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
  },
  selectedDeadlineText: {
    color: COLORS.accentBlue,
    fontWeight: '600',
  },
  autoSaveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  toggleButton: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeToggle: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen,
  },
  toggleText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  activeToggleText: {
    color: COLORS.background,
  },
  autoSaveSettings: {
    marginTop: SPACING.sm,
  },
  autoSaveLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.sm,
  },
  autoSaveInfo: {
    color: COLORS.success,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.sm,
    fontStyle: 'italic',
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  motivationCard: {
    backgroundColor: COLORS.card,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  motivationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  motivationTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  motivationText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
  },
  createButton: {
    backgroundColor: COLORS.primaryGreen,
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  disabledButton: {
    backgroundColor: COLORS.muted,
    opacity: 0.5,
  },
  createButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    marginLeft: SPACING.sm,
  },
});