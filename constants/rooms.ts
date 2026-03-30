export type Campus = 'Paulista' | 'Vila Olimpia' | 'Aclimacao';
export type CampusFilter = 'Todos' | Campus;
export type PeriodKey = 'agora' | 'proxima' | 'noite';

export type Room = {
  id: string;
  name: string;
  campus: Campus;
  block: string;
  floor: number;
  capacity: number;
  description: string;
  nextFreeAt: string;
  recommendedFor: string;
  resources: string[];
  availability: Record<PeriodKey, boolean>;
  todaySlots: string[];
};

export const campuses: Campus[] = ['Paulista', 'Vila Olimpia', 'Aclimacao'];
export const campusFilters: CampusFilter[] = ['Todos', ...campuses];

export const periodOptions: { key: PeriodKey; label: string }[] = [
  { key: 'agora', label: 'Agora' },
  { key: 'proxima', label: 'Proxima aula' },
  { key: 'noite', label: 'Noite' },
];

export const rooms: Room[] = [
  {
    id: 'a201',
    name: 'Sala A201',
    campus: 'Paulista',
    block: 'A',
    floor: 2,
    capacity: 36,
    description: 'Sala perto do elevador principal.',
    nextFreeAt: '21:00',
    recommendedFor: 'Estudo rapido antes da proxima aula.',
    resources: ['Projetor', 'Tomadas', 'Ar-condicionado'],
    availability: { agora: true, proxima: true, noite: false },
    todaySlots: ['19:10 - 20:50', '21:00 - 22:40'],
  },
  {
    id: 'a305',
    name: 'Sala A305',
    campus: 'Paulista',
    block: 'A',
    floor: 3,
    capacity: 28,
    description: 'Boa para reunioes curtas e grupos pequenos.',
    nextFreeAt: '20:50',
    recommendedFor: 'Mentoria e alinhamento rapido do grupo.',
    resources: ['TV', 'Tomadas', 'Quadro branco'],
    availability: { agora: false, proxima: true, noite: true },
    todaySlots: ['20:50 - 22:40'],
  },
  {
    id: 'b102',
    name: 'Sala B102',
    campus: 'Paulista',
    block: 'B',
    floor: 1,
    capacity: 42,
    description: 'Facil acesso para quem esta entrando no campus.',
    nextFreeAt: '19:10',
    recommendedFor: 'Revisao em grupo e checkpoints rapidos.',
    resources: ['Projetor', 'Quadro digital', 'Tomadas'],
    availability: { agora: true, proxima: false, noite: true },
    todaySlots: ['17:30 - 19:00', '21:00 - 22:40'],
  },
  {
    id: 'b401',
    name: 'Sala B401',
    campus: 'Paulista',
    block: 'B',
    floor: 4,
    capacity: 30,
    description: 'Andar silencioso, ideal para concentracao.',
    nextFreeAt: 'Disponivel o dia todo',
    recommendedFor: 'Leitura, concentracao e revisao individual.',
    resources: ['Ar-condicionado', 'Tomadas', 'Quadro branco'],
    availability: { agora: true, proxima: true, noite: true },
    todaySlots: ['Livre durante todo o periodo'],
  },
  {
    id: 'v203',
    name: 'Sala V203',
    campus: 'Vila Olimpia',
    block: 'V',
    floor: 2,
    capacity: 24,
    description: 'Sala proxima ao hall de convivencia.',
    nextFreeAt: '20:50',
    recommendedFor: 'Apresentacoes curtas e alinhamentos rapidos.',
    resources: ['Projetor', 'Tomadas'],
    availability: { agora: false, proxima: true, noite: true },
    todaySlots: ['20:50 - 22:40'],
  },
  {
    id: 'v507',
    name: 'Sala V507',
    campus: 'Vila Olimpia',
    block: 'V',
    floor: 5,
    capacity: 32,
    description: 'Boa vista e baixo fluxo de pessoas.',
    nextFreeAt: '21:00',
    recommendedFor: 'Reunioes do grupo e estudo em dupla.',
    resources: ['Projetor', 'Ar-condicionado', 'Tomadas'],
    availability: { agora: true, proxima: true, noite: false },
    todaySlots: ['18:00 - 20:50'],
  },
  {
    id: 'c110',
    name: 'Sala C110',
    campus: 'Aclimacao',
    block: 'C',
    floor: 1,
    capacity: 26,
    description: 'Perto da entrada e da area de apoio.',
    nextFreeAt: 'Disponivel o dia todo',
    recommendedFor: 'Aula vaga entre horarios e reunioes pequenas.',
    resources: ['TV', 'Tomadas', 'Quadro branco'],
    availability: { agora: true, proxima: true, noite: true },
    todaySlots: ['Livre durante todo o periodo'],
  },
  {
    id: 'c308',
    name: 'Sala C308',
    campus: 'Aclimacao',
    block: 'C',
    floor: 3,
    capacity: 34,
    description: 'Sala ampla para grupos maiores.',
    nextFreeAt: '21:00',
    recommendedFor: 'Ensaios de apresentacao e revisao final.',
    resources: ['Projetor', 'Tomadas', 'Ar-condicionado'],
    availability: { agora: false, proxima: false, noite: true },
    todaySlots: ['21:00 - 22:40'],
  },
  {
    id: 'd204',
    name: 'Sala D204',
    campus: 'Aclimacao',
    block: 'D',
    floor: 2,
    capacity: 20,
    description: 'Espaco compacto e silencioso.',
    nextFreeAt: '19:10',
    recommendedFor: 'Estudo individual e revisao em dupla.',
    resources: ['Tomadas', 'Quadro branco'],
    availability: { agora: true, proxima: true, noite: true },
    todaySlots: ['Livre durante todo o periodo'],
  },
];

export function filterRooms(filters: {
  campus: CampusFilter;
  block: string;
  period: PeriodKey;
  projectorOnly: boolean;
}) {
  return rooms.filter((room) => {
    const matchesCampus = filters.campus === 'Todos' || room.campus === filters.campus;
    const matchesBlock = !filters.block || room.block === filters.block;
    const matchesPeriod = room.availability[filters.period];
    const matchesProjector = !filters.projectorOnly || room.resources.includes('Projetor');

    return matchesCampus && matchesBlock && matchesPeriod && matchesProjector;
  });
}

export function findRoomById(id: string) {
  return rooms.find((room) => room.id === id);
}

export function getFreeRoomsCount(period: PeriodKey) {
  return rooms.filter((room) => room.availability[period]).length;
}

export function getTopCampus(period: PeriodKey) {
  const counts = campuses.map((campus) => ({
    campus,
    total: rooms.filter((room) => room.campus === campus && room.availability[period]).length,
  }));

  return counts.sort((first, second) => second.total - first.total)[0];
}

export function getBlocksByCampus(campus: CampusFilter) {
  const items = rooms
    .filter((room) => campus === 'Todos' || room.campus === campus)
    .map((room) => room.block);

  return [...new Set(items)].sort();
}

export function getAvailabilityLabel(room: Room, period: PeriodKey) {
  if (room.availability[period]) {
    return period === 'agora' ? 'Livre agora' : `Livre na ${period === 'proxima' ? 'proxima aula' : 'noite'}`;
  }

  return `Libera as ${room.nextFreeAt}`;
}
