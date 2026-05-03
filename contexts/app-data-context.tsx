import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '@/lib/storage';

type Reservation = {
  roomId: string;
  createdAt: string;
};

type AppDataContextValue = {
  reservations: Reservation[];
  isDataLoading: boolean;
  hasReservation: (roomId: string) => boolean;
  toggleReservation: (roomId: string) => Promise<void>;
};

const RESERVATIONS_KEY = '@cp_mobile:reservations';
const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const raw = await storage.getItem(RESERVATIONS_KEY);
        if (raw) {
          setReservations(JSON.parse(raw) as Reservation[]);
        }
      } finally {
        setIsDataLoading(false);
      }
    };

    void loadData();
  }, []);

  const persist = async (next: Reservation[]) => {
    setReservations(next);
    await storage.setItem(RESERVATIONS_KEY, JSON.stringify(next));
  };

  const value = useMemo<AppDataContextValue>(
    () => ({
      reservations,
      isDataLoading,
      hasReservation: (roomId: string) => reservations.some((item) => item.roomId === roomId),
      toggleReservation: async (roomId: string) => {
        const exists = reservations.some((item) => item.roomId === roomId);
        const next = exists
          ? reservations.filter((item) => item.roomId !== roomId)
          : [...reservations, { roomId, createdAt: new Date().toISOString() }];

        await persist(next);
      },
    }),
    [isDataLoading, reservations]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData precisa ser usado dentro de AppDataProvider.');
  }

  return context;
}
