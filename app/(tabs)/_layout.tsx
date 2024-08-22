import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{ 
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].placeholderText,
        headerShown: true,
        headerTintColor: Colors[colorScheme ?? 'light'].headerTintColor,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Avisos',
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="check"
        options={{
          title: 'Registro de Horarios',
          tabBarLabel: 'Registro',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'checkmark-done' : 'checkmark-done-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reporteSemanal"
        options={{
          title: 'Reporte Semanal',
          tabBarLabel: 'Reporte',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'document-text' : 'document-text-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cafeteria"
        options={{
          title: 'Gestión de Cafetería',
          tabBarLabel: 'Cafetería',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cafe' : 'cafe-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="moreOptions"
        options={{
          title: 'Más Opciones',
          tabBarLabel: 'Más',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
