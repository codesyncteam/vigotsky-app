import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { API_URL } from '@/config';

export default function TabLayout() {
  console.log('TabLayout');
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [curpMissing, setCurpMissing] = useState(false);

  useEffect(() => {
    const checkCurp = async () => {
      try {
        const id = await AsyncStorage.getItem('userId'); // Obtener el ID del usuario desde AsyncStorage

        if (!id) {
          console.log('ID no encontrado');
          return;
        }

        // Hacer la solicitud POST con el id
        const response = await fetch(`${API_URL}/v2/reportes_avanzados/consulta/125`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`, // Obtener el token de autenticación
          },
          body: JSON.stringify({
            id: id, // Incluir el id en el cuerpo de la solicitud
          }),
        });

        const data = await response.json();

        // Verificar si el CURP está vacío
        if (data.status === 'success' && data.data[0].curp === null) {
          console.log('Falta CURP');
          setCurpMissing(true); // Indicar que falta el CURP
        } else {
          setCurpMissing(false); // El CURP está disponible
        }
      } catch (e) {
        console.error('Error al consultar CURP', e);
      }
    };

    checkCurp();
  }, []);

  useEffect(() => {
    if (curpMissing) {
      router.push('/otherScreens/setCurp'); // Redirigir a la pantalla de establecer CURP
    }
  }, [curpMissing, router]);

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
