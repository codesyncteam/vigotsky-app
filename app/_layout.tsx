import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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
        
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
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
