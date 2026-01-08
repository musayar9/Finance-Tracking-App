import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../utils/theme';

interface AIBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export default function AIBubble({ message, isUser, timestamp }: AIBubbleProps) {
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.message, isUser ? styles.userMessage : styles.aiMessage]}>
          {message}
        </Text>
        {timestamp && (
          <Text style={styles.timestamp}>{timestamp}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  userBubble: {
    backgroundColor: COLORS.primaryGreen,
    borderBottomRightRadius: BORDER_RADIUS.xs,
  },
  aiBubble: {
    backgroundColor: COLORS.card,
    borderBottomLeftRadius: BORDER_RADIUS.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  message: {
    fontSize: FONTS.sizes.md,
    lineHeight: 20,
  },
  userMessage: {
    color: COLORS.background,
  },
  aiMessage: {
    color: COLORS.white,
  },
  timestamp: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.muted,
    marginTop: SPACING.xs,
    textAlign: 'right',
  },
});