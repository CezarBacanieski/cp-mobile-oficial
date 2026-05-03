import { Redirect, Tabs, router } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';

import { palette } from '@/constants/palette';
import { useAuth } from '@/contexts/auth-context';

export default function TabLayout() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: palette.background },
        headerTintColor: palette.text,
        headerTitleStyle: { fontWeight: '800' },
        headerShadowVisible: false,
        sceneStyle: { backgroundColor: palette.background },
        tabBarActiveTintColor: palette.accent,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopColor: palette.border,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={async () => {
              await logout();
              router.replace('/login');
            }}
            style={{ marginRight: 14 }}>
            <Text style={{ color: palette.accent, fontSize: 13, fontWeight: '800' }}>Sair</Text>
          </TouchableOpacity>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="home" size={size} />,
        }}
      />
      <Tabs.Screen
        name="salas"
        options={{
          title: 'Salas',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="business" size={size} />,
        }}
      />
      <Tabs.Screen
        name="blocos"
        options={{
          title: 'Blocos',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="grid" size={size} />,
        }}
      />
    </Tabs>
  );
}
