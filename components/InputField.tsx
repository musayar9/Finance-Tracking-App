import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import { COLORS } from "../utils/theme";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secure?: boolean;
  style?: ViewStyle;
}

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secure,
  style,
}: InputFieldProps) {
  return (
    <View style={[{ marginBottom: 12 }, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: COLORS.textSecondary,
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: COLORS.surfaceGlass,
    color: COLORS.textPrimary,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderGlass,
    fontSize: 16,
  },
});