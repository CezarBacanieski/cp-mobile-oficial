import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { ScreenShell } from '@/components/screen-shell';
import { palette } from '@/constants/palette';
import { findRoomById, periodOptions } from '@/constants/rooms';

export default function RoomDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const room = params.id ? findRoomById(params.id) : undefined;

  if (!room) {
    return (
      <ScreenShell>
        <View style={styles.card}>
          <Text style={styles.title}>Sala nao encontrada</Text>
          <Text style={styles.text}>Volte para a lista principal e escolha outra opcao.</Text>
          <ActionButton label="Voltar para salas" onPress={() => router.replace('/salas')} />
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.eyebrow}>
          {room.campus} - Bloco {room.block}
        </Text>
        <Text style={styles.title}>{room.name}</Text>
        <Text style={styles.text}>{room.description}</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Capacidade</Text>
          <Text style={styles.infoValue}>{room.capacity} lugares</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Proxima liberacao</Text>
          <Text style={styles.infoValue}>{room.nextFreeAt}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Disponibilidade de hoje</Text>
        {periodOptions.map((period) => (
          <View key={period.key} style={styles.row}>
            <Text style={styles.rowLabel}>{period.label}</Text>
            <Text style={styles.rowValue}>{room.availability[period.key] ? 'Livre' : 'Ocupada'}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recursos da sala</Text>
        <View style={styles.tags}>
          {room.resources.map((resource) => (
            <View key={resource} style={styles.tag}>
              <Text style={styles.tagText}>{resource}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Faixas livres</Text>,
        {room.todaySlots.map((slot) => (
          <Text key={slot} style={styles.slotText}>
            {slot}
          </Text>
        ))}
      </View>

      <ActionButton
        label={`Ver mais salas em ${room.campus}`}
        onPress={() => router.push({ pathname: '/salas', params: { campus: room.campus } })}
      />
      <ActionButton
        label={`Filtrar bloco ${room.block}`}
        onPress={() => router.push({ pathname: '/salas', params: { campus: room.campus, bloco: room.block } })}
        variant="secondary"
        style={{ marginTop: 10 }}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  backText: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: '800',
  },
  card: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 14,
    marginTop: 14,
    padding: 18,
  },
  eyebrow: {
    color: palette.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: palette.text,
    fontSize: 26,
    fontWeight: '900',
    marginTop: 6,
  },
  text: {
    color: palette.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 2,
  },
  infoCard: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    padding: 16,
  },
  infoLabel: {
    color: palette.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  infoValue: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rowLabel: {
    color: palette.textMuted,
    fontSize: 14,
  },
  rowValue: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '800',
  },
  tags: {
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
  slotText: {
    color: palette.textMuted,
    fontSize: 14,
    marginBottom: 8,
  },
});
