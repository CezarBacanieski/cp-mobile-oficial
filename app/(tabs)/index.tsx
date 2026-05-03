import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { RoomCard } from '@/components/room-card';
import { ScreenShell } from '@/components/screen-shell';
import { palette } from '@/constants/palette';
import { getFreeRoomsCount, getTopCampus, rooms } from '@/constants/rooms';
import { useAppData } from '@/contexts/app-data-context';
import { useAuth } from '@/contexts/auth-context';

export default function HomeScreen() {
  const { user } = useAuth();
  const { reservations } = useAppData();
  const { width } = useWindowDimensions();
  const wide = width > 420;
  const previewRooms = rooms.filter((room) => room.availability.agora).slice(0, 3);
  const bestCampus = getTopCampus('agora');

  const metrics = [
    { label: 'Salas livres agora', value: String(getFreeRoomsCount('agora')) },
    { label: 'Campus com mais vagas', value: bestCampus.campus },
    { label: 'Reservas salvas', value: String(reservations.length) },
    {
      label: 'Salas com projetor',
      value: String(
        rooms.filter((room) => room.availability.agora && room.resources.includes('Projetor')).length
      ),
    },
  ];

  return (
    <ScreenShell>
      <View style={styles.hero}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Checkpoint 1 - MVP</Text>
        </View>
        <Text style={styles.heroTitle}>Sala Livre FIAP</Text>
        <Text style={styles.welcomeText}>Bem-vindo, {user?.fullName ?? 'aluno'}.</Text>
        <Text style={styles.heroText}>
          Um app para descobrir salas vagas em poucos toques e reduzir a perda de tempo entre aulas.
        </Text>

        {/* <Image source={require('@/assets/images/icon.png')} style={styles.heroImage} /> */}

        <View style={styles.heroActions}>
          <ActionButton label="Consultar agora" onPress={() => router.push('/salas')} />
          <ActionButton label="Ver blocos" onPress={() => router.push('/blocos')} variant="secondary" />
        </View>
      </View>

      <View style={[styles.metricsGrid, wide && styles.metricsGridWide]}>
        {metrics.map((item) => (
          <View key={item.label} style={[styles.metricCard, wide && styles.metricCardWide]}>
            <Text style={styles.metricValue}>{item.value}</Text>
            <Text style={styles.metricLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Melhores opcoes agora</Text>
        <TouchableOpacity onPress={() => router.push('/salas')}>
          <Text style={styles.sectionAction}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {previewRooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          period="agora"
          onPress={() => router.push({ pathname: '/sala/[id]', params: { id: room.id } })}
        />
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 18,
    overflow: 'hidden',
    padding: 20,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: palette.accentSoft,
    borderRadius: 999,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroBadgeText: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '800',
  },
  heroTitle: {
    color: palette.text,
    fontSize: 30,
    fontWeight: '900',
  },
  heroText: {
    color: palette.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    maxWidth: 290,
  },
  welcomeText: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  heroImage: {
    height: 110,
    opacity: 0.22,
    position: 'absolute',
    right: -10,
    top: 30,
    width: 110,
  },
  heroActions: {
    gap: 10,
    marginTop: 18,
  },
  metricsGrid: {
    gap: 12,
    marginBottom: 18,
  },
  metricsGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metricCard: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  metricCardWide: {
    width: '31%',
  },
  metricValue: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '900',
  },
  metricLabel: {
    color: palette.textMuted,
    fontSize: 13,
    marginTop: 8,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 19,
    fontWeight: '800',
  },
  sectionAction: {
    color: palette.accent,
    fontSize: 13,
    fontWeight: '800',
  },
});
