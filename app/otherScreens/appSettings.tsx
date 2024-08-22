import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Configuracion() {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [notifications, setNotifications] = useState(true);
  const navigation = useNavigation();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar Cuenta",
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => console.log("Cuenta eliminada") },
      ],
      { cancelable: true }
    );
  };

  const handleChangePassword = () => {
    navigation.navigate('otherScreens/changePassword');
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>
          Modo Oscuro
        </Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? '#ccc' : '#29348E'}
          trackColor={{ false: '#ccc', true: '#29348E' }}
        />
      </View>

      <View style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>
          Notificaciones
        </Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          thumbColor={notifications ? '#ccc' : '#29348E'}
          trackColor={{ false: '#ccc', true: '#29348E' }}
        />
      </View>

      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Eliminar Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 18,
  },
  changePasswordButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#29348E',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#E7013D',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
