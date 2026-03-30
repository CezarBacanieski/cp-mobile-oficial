import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { palette } from '@/constants/palette';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
};

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
  style,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.button, variant === 'secondary' && styles.buttonSecondary, style]}>
      <Text style={[styles.label, variant === 'secondary' && styles.labelSecondary]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: palette.accent,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  buttonSecondary: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
  },
  label: {
    color: palette.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  labelSecondary: {
    color: palette.text,
  },
});
