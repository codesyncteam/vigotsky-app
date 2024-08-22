import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Cerrar Sesión", onPress: () => performLogout() },
      ],
      { cancelable: true }
    );
  };

  const performLogout = () => {
    // Aquí podrías añadir la lógica para cerrar sesión, como eliminar tokens, etc.
    // Luego redirigir al usuario a la pantalla de inicio de sesión o cualquier otra pantalla
    console.log("Sesión cerrada");
    navigation.navigate('otherScreens/login'); // Navega a la pantalla de inicio de sesión
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.message, { color: Colors[colorScheme ?? 'light'].text }]}>
        Estás a punto de cerrar sesión de tu cuenta. ¿Deseas continuar?
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#E7013D',
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});