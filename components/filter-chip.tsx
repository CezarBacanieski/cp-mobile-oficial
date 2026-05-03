import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { palette } from '@/constants/palette';

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (

    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  chipSelected: {
    backgroundColor: palette.accentSoft,
    borderColor: palette.accent,
  },
  label: {
    color: palette.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  labelSelected: {
    color: palette.text,


  },
});
