import { useEffect, useState } from 'react';

import { filterRooms, type CampusFilter, type PeriodKey, type Room } from '@/constants/rooms';

type Filters = {
  campus: CampusFilter;
  block: string;
  period: PeriodKey;
  projectorOnly: boolean;
};

export function useRoomResults(filters: Filters) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Room[]>([]);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setResults(filterRooms(filters));
      setLoading(false);
    }, 350);

    return () => clearTimeout(timeout);
  }, [filters.block, filters.campus, filters.period, filters.projectorOnly]);

  return { loading, results };
}
