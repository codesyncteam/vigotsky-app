// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';  // Asegúrate de importar esto
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  console.log('RootLayout');
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter();


  useEffect(() => {
    const checkSession = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        console.log('isLoggedIn', isLoggedIn);
        if (isLoggedIn !== 'true') {
          console.log('No hay sesión activa');
          router.push('/otherScreens/login'); // Cambié la navegación
        } else {
          console.log('Sesión activa');
          setLoading(false);
          SplashScreen.hideAsync(); // Ocultar splash cuando todo esté listo
        }
      } catch (e) {
        console.error('Error al verificar la sesión', e);
        router.push('/otherScreens/login'); // Cambié la navegación
      }

      console.log('Fin de checkSession');
      

    };

    checkSession();
  }, [router]);


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View style={styles.loaderContainer}>
        <Image source={require('../assets/images/splash.png')} style={styles.loaderImage} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="otherScreens/login" options={{ title: 'Iniciar Sesión' }} />
          <Stack.Screen name="otherScreens/menu" options={{ title: 'Menú Semanal',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/reserva" options={{ title: 'Reserva',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/log" options={{ title: 'Historial de compras',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/config" options={{ title: 'Configuración',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/profile" options={{ title: 'Perfil',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/notifications" options={{ title: 'Notificaciones',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/appSettings" options={{ title: 'Configuración',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/changePassword" options={{ title: 'Cambiar Contraseña',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/privacy" options={{ title: 'Privacidad',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/logout" options={{ title: 'Cerrar Sesión',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/forgotPassword" options={{ title: 'Recuperar Contraseña',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/register" options={{ title: 'Registrarse',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/helpCenter" options={{ title: 'Centro de Ayuda',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/programarSalida" options={{ title: 'Programar Salida',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/codeVerificationEmail" options={{ title: 'Verificación de Código',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/setPassword" options={{ title: 'Establecer Contraseña',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="otherScreens/setCurp" options={{ title: 'Establecer CURP',headerBackTitle: 'Atrás' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,  // O puedes usar un color específico dependiendo del tema
  },
  loaderImage: {
    width: 150,  // Ajusta el tamaño de la imagen según sea necesario
    height: 150,
    resizeMode: 'contain',  // Ajusta la imagen dentro del contenedor
  },
});
