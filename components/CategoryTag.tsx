import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../utils/theme';

interface CategoryTagProps {
  category: string;
  color?: string;
}

export default function CategoryTag({ category, color = COLORS.secondary }: CategoryTagProps) {
  return (
    <View style={[styles.container, { backgroundColor: color + '20', borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
  },
  text: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
});