import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../../utils/theme';
import AIBubble from '../../components/AIBubble';
import { Ionicons } from '@expo/vector-icons';

export default function AIChatScreen() {
  const [message, setMessage] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: 'Hello! I\'m your AI financial assistant. How can I help you today?',
      isUser: false,
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      message: 'Can you analyze my spending this month?',
      isUser: true,
      timestamp: '10:31 AM',
    },
    {
      id: 3,
      message: 'Based on your transactions, you\'ve spent $2,450 this month. Your biggest categories are dining ($680) and shopping ($520). You\'re 15% over your dining budget.',
      isUser: false,
      timestamp: '10:31 AM',
    },
  ]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        message: message.trim(),
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          message: 'I understand your question. Let me analyze your financial data and provide you with personalized insights.',
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.header}>
        <View style={styles.aiAvatar}>
          <Ionicons name="sparkles" size={20} color={COLORS.primaryGreen} />
        </View>
        <View>
          <Text style={styles.headerTitle}>AI Assistant</Text>
          <Text style={styles.headerSubtitle}>Online • Ready to help</Text>
        </View>
      </View>
      
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <AIBubble
            key={msg.id}
            message={msg.message}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask me anything about your finances..."
            placeholderTextColor={COLORS.muted}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={20} color={COLORS.muted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={20} color={COLORS.muted} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={[styles.sendButton, { opacity: message.trim() ? 1 : 0.5 }]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Ionicons name="send" size={20} color={COLORS.background} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.sm,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SPACING.md,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : SPACING.lg,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    maxHeight: 100,
  },
  attachButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  micButton: {
    padding: SPACING.xs,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
});