import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from '../../utils/translations';


export default function AddSubscriptionScreen() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('tv');

  const iconOptions = [
    { name: 'tv', label: 'Entertainment' },
    { name: 'musical-notes', label: 'Music' },
    { name: 'brush', label: 'Creative' },
    { name: 'fitness', label: 'Fitness' },
    { name: 'game-controller', label: 'Gaming' },
    { name: 'newspaper', label: 'News' },
    { name: 'cloud', label: 'Cloud' },
    { name: 'car', label: 'Transport' },
  ];

  const handleSave = () => {
    // Save subscription logic here
    console.log('Saving subscription:', { name, price, renewalDate, selectedIcon });
    router.back();
  };

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
        <Text style={styles.headerTitle}>{t('addSubscription')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('serviceName')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Netflix, Spotify"
            placeholderTextColor={COLORS.muted}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('monthlyPrice')}</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="0.00"
            placeholderTextColor={COLORS.muted}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('nextRenewalDate')}</Text>
          <TextInput
            style={styles.input}
            value={renewalDate}
            onChangeText={setRenewalDate}
            placeholder="Dec 15"
            placeholderTextColor={COLORS.muted}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('categoryIcon')}</Text>
          <View style={styles.iconGrid}>
            {iconOptions.map((icon) => (
              <TouchableOpacity
                key={icon.name}
                style={[
                  styles.iconOption,
                  selectedIcon === icon.name && styles.selectedIcon
                ]}
                onPress={() => setSelectedIcon(icon.name)}
              >
                <Ionicons 
                  name={icon.name as any} 
                  size={24} 
                  color={selectedIcon === icon.name ? COLORS.background : COLORS.white} 
                />
                <Text style={[
                  styles.iconLabel,
                  selectedIcon === icon.name && styles.selectedIconLabel
                ]}>
                  {icon.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{t('addSubscription')}</Text>
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
  form: {
    marginBottom: SPACING.xl,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconOption: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  selectedIcon: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen,
  },
  iconLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  selectedIconLabel: {
    color: COLORS.background,
  },
  saveButton: {
    backgroundColor: COLORS.primaryGreen,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },
});