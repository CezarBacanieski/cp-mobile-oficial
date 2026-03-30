import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { FilterChip } from '@/components/filter-chip';
import { RoomCard } from '@/components/room-card';
import { ScreenShell } from '@/components/screen-shell';
import { palette } from '@/constants/palette';
import {
  campusFilters,
  getBlocksByCampus,
  periodOptions,
  type CampusFilter,
  type PeriodKey,
} from '@/constants/rooms';
import { useRoomResults } from '@/hooks/use-room-results';

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function SalasScreen() {
  const params = useLocalSearchParams<{ campus?: string; bloco?: string; periodo?: string }>();
  const [selectedCampus, setSelectedCampus] = useState<CampusFilter>('Todos');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('agora');
  const [projectorOnly, setProjectorOnly] = useState(false);

  useEffect(() => {
    const campus = readParam(params.campus);
    const block = readParam(params.bloco);
    const period = readParam(params.periodo);

    if (campus && campusFilters.includes(campus as CampusFilter)) {
      setSelectedCampus(campus as CampusFilter);
    }

    if (block) {
      setSelectedBlock(block);
    }

    if (period === 'agora' || period === 'proxima' || period === 'noite') {
      setSelectedPeriod(period);
    }
  }, [params.bloco, params.campus, params.periodo]);

  const blocks = getBlocksByCampus(selectedCampus);

  useEffect(() => {
    if (selectedBlock && !blocks.includes(selectedBlock)) {
      setSelectedBlock('');
    }
  }, [blocks, selectedBlock]);

  const { loading, results } = useRoomResults({
    campus: selectedCampus,
    block: selectedBlock,
    period: selectedPeriod,
    projectorOnly,
  });

  const resetFilters = () => {
    setSelectedCampus('Todos');
    setSelectedBlock('');
    setSelectedPeriod('agora');
    setProjectorOnly(false);
  };

  return (
    <ScreenShell>
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Salas livres</Text>
        <Text style={styles.headerText}>
          Filtre por campus, bloco e periodo para encontrar uma sala vaga rapido.
        </Text>
      </View>

      <Text style={styles.label}>Campus</Text>
      <View style={styles.rowWrap}>
        {campusFilters.map((campus) => (
          <FilterChip
            key={campus}
            label={campus}
            selected={selectedCampus === campus}
            onPress={() => setSelectedCampus(campus)}
          />
        ))}
      </View>

      <Text style={styles.label}>Periodo</Text>
      <View style={styles.rowWrap}>
        {periodOptions.map((period) => (
          <FilterChip
            key={period.key}
            label={period.label}
            selected={selectedPeriod === period.key}
            onPress={() => setSelectedPeriod(period.key)}
          />
        ))}
      </View>

      {blocks.length > 0 ? (
        <>
          <Text style={styles.label}>Bloco</Text>
          <View style={styles.rowWrap}>
            <FilterChip label="Todos" selected={!selectedBlock} onPress={() => setSelectedBlock('')} />
            {blocks.map((block) => (
              <FilterChip
                key={block}
                label={`Bloco ${block}`}
                selected={selectedBlock === block}
                onPress={() => setSelectedBlock(block)}
              />
            ))}
          </View>
        </>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setProjectorOnly((current) => !current)}
        style={[styles.toggleCard, projectorOnly && styles.toggleCardActive]}>
        <Text style={styles.toggleTitle}>Somente salas com projetor</Text>
        <Text style={styles.toggleText}>
          {projectorOnly ? 'Filtro ativo' : 'Ative para apresentar trabalhos com mais seguranca.'}
        </Text>
      </TouchableOpacity>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          {loading ? 'Buscando salas...' : `${results.length} salas encontradas`}
        </Text>
        <TouchableOpacity onPress={resetFilters}>
          <Text style={styles.resetText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.feedbackCard}>
          <ActivityIndicator color={palette.accent} />
          <Text style={styles.feedbackText}>Atualizando disponibilidade...</Text>
        </View>
      ) : null}

      {!loading && results.length === 0 ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.emptyTitle}>Nenhuma sala encontrada</Text>
          <Text style={styles.feedbackText}>
            Tente mudar o campus, o periodo ou desativar o filtro de projetor.
          </Text>
          <TouchableOpacity onPress={resetFilters} style={styles.emptyButton}>
            <Text style={styles.emptyButtonText}>Ver todas as salas</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {!loading &&
        results.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            period={selectedPeriod}
            onPress={() => router.push({ pathname: '/sala/[id]', params: { id: room.id } })}
          />
        ))}
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
  label: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 8,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 6,
  },
  toggleCard: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 14,
    padding: 16,
  },
  toggleCardActive: {
    borderColor: palette.accent,
  },
  toggleTitle: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '800',
  },
  toggleText: {
    color: palette.textMuted,
    fontSize: 13,
    marginTop: 6,
  },
  resultsHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 18,
  },
  resultsTitle: {
    color: palette.text,
    fontSize: 17,
    fontWeight: '800',
  },
  resetText: {
    color: palette.accent,
    fontSize: 13,
    fontWeight: '800',
  },
  feedbackCard: {
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 18,
    borderWidth: 1,
    gap: 12,
    marginBottom: 16,
    padding: 20,
  },
  feedbackText: {
    color: palette.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  emptyTitle: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '900',
  },
  emptyButton: {
    backgroundColor: palette.accent,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  emptyButtonText: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '800',
  },
});
