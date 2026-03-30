import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { palette } from '@/constants/palette';
import { getAvailabilityLabel, type PeriodKey, type Room } from '@/constants/rooms';

type RoomCardProps = {
  room: Room;
  period: PeriodKey;
  onPress: () => void;
};

export function RoomCard({ room, period, onPress }: RoomCardProps) {
  const available = room.availability[period];

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{room.name}</Text>
          <Text style={styles.subtitle}>
            {room.campus} - Bloco {room.block} - {room.floor}o andar
          </Text>
        </View>
        <View style={[styles.badge, available ? styles.badgeSuccess : styles.badgeWarning]}>
          <Text style={[styles.badgeText, available ? styles.badgeTextSuccess : styles.badgeTextWarning]}>
            {getAvailabilityLabel(room, period)}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{room.description}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>{room.capacity} lugares</Text>
        <Text style={styles.infoText}>{room.recommendedFor}</Text>
      </View>

      <View style={styles.tagsRow}>
        {room.resources.slice(0, 3).map((resource) => (
          <View key={resource} style={styles.tag}>
            <Text style={styles.tagText}>{resource}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 14,
    marginBottom: 14,
    padding: 18,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    color: palette.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeSuccess: {
    backgroundColor: palette.successSoft,
  },
  badgeWarning: {
    backgroundColor: palette.warningSoft,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  badgeTextSuccess: {
    color: palette.success,
  },
  badgeTextWarning: {
    color: palette.warning,
  },
  description: {
    color: palette.text,
    fontSize: 14,
    lineHeight: 20,
  },
  infoRow: {
    gap: 6,
  },
  infoText: {
    color: palette.textMuted,
    fontSize: 13,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: palette.surfaceAlt,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '700',
  },
});
