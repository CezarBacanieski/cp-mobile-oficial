import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '@/lib/storage';

type User = {
  fullName: string;
  email: string;
  password: string;
};

type RegisterInput = {
  fullName: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (input: RegisterInput) => Promise<boolean>;
  logout: () => Promise<void>;
};

const USER_KEY = '@cp_mobile:user';
const SESSION_KEY = '@cp_mobile:session';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const [savedUser, isLogged] = await Promise.all([
          storage.getItem(USER_KEY),
          storage.getItem(SESSION_KEY),
        ]);

        if (savedUser && isLogged === 'true') {
          setUser(JSON.parse(savedUser) as User);
        }
      } finally {
        setIsBootstrapping(false);
      }
    };

    void loadSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isBootstrapping,
      login: async (email: string, password: string) => {
        const rawUser = await storage.getItem(USER_KEY);
        if (!rawUser) return false;

        const savedUser = JSON.parse(rawUser) as User;
        const validCredentials = savedUser.email === email.trim().toLowerCase() && savedUser.password === password;

        if (!validCredentials) return false;

        await storage.setItem(SESSION_KEY, 'true');
        setUser(savedUser);
        return true;
      },
      register: async ({ fullName, email, password }: RegisterInput) => {
        const nextUser: User = {
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          password,
        };

        await storage.setItem(USER_KEY, JSON.stringify(nextUser));
        await storage.setItem(SESSION_KEY, 'true');
        setUser(nextUser);
        return true;
      },
      logout: async () => {
        await storage.removeItem(SESSION_KEY);
        setUser(null);
      },
    }),
    [isBootstrapping, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de AuthProvider.');
  }

  return context;
}
