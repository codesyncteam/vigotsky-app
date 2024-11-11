import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '../../src/components/navigation/TabBarIcon';
import { Colors } from '../../src/src/constants/Colors';
import { useColorScheme } from '../../src/src/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Noticias',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reportesemanal"
        options={{
          title: 'Reporte',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'document-text' : 'document-text-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'lock-closed' : 'lock-closed-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
