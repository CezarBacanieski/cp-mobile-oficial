import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

import { ScreenShell } from '@/components/screen-shell';
import { palette } from '@/constants/palette';
import { campuses, rooms } from '@/constants/rooms';

export default function BlocosScreen() {
  const { width } = useWindowDimensions();
  const wide = width > 540;

  return (
    <ScreenShell>
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Mapa rapido por blocos</Text>
        <Text style={styles.headerText}>
          Escolha um bloco e abra a lista ja filtrada para acelerar a busca durante a apresentacao.
        </Text>
      </View>

      {campuses.map((campus) => {
        const campusRooms = rooms.filter((room) => room.campus === campus);
        const blocks = [...new Set(campusRooms.map((room) => room.block))];

        return (
          <View key={campus} style={styles.section}>
            <Text style={styles.sectionTitle}>{campus}</Text>
            <View style={[styles.grid, wide && styles.gridWide]}>
              {blocks.map((block) => {
                const blockRooms = campusRooms.filter((room) => room.block === block);
                const freeNow = blockRooms.filter((room) => room.availability.agora).length;

                return (
                  <TouchableOpacity
                    key={`${campus}-${block}`}
                    activeOpacity={0.88}
                    onPress={() =>
                      router.push({
                        pathname: '/salas',
                        params: { campus, bloco: block, periodo: 'agora' },
                      })
                    }
                    style={[styles.blockCard, wide && styles.blockCardWide]}>
                    <Text style={styles.blockLabel}>Bloco {block}</Text>
                    <Text style={styles.blockValue}>{freeNow}</Text>
                    <Text style={styles.blockText}>salas livres agora</Text>
                    <Text style={styles.blockHint}>
                      {blockRooms[0]?.name} e mais {Math.max(blockRooms.length - 1, 0)} opcoes
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 18,
    padding: 18,
  },
  headerTitle: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '900',
  },
  headerText: {
    color: palette.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  grid: {
    gap: 12,
  },
  gridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  blockCard: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
  },
  blockCardWide: {
    width: '48%',
  },
  blockLabel: {
    color: palette.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  blockValue: {
    color: palette.text,
    fontSize: 34,
    fontWeight: '900',
    marginTop: 8,
  },
  blockText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '700',
  },
  blockHint: {
    color: palette.textMuted,
    fontSize: 13,
    marginTop: 10,
  },
});
