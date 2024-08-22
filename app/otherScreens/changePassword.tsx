import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function ChangePassword() {
  const colorScheme = useColorScheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas nuevas no coinciden.');
      return;
    }

    // Aquí se podría agregar la lógica para cambiar la contraseña
    Alert.alert('Éxito', 'Tu contraseña ha sido cambiada con éxito.');
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Contraseña Actual</Text>
      <TextInput
        style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Nueva Contraseña</Text>
      <TextInput
        style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Confirmar Nueva Contraseña</Text>
      <TextInput
        style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#29348E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
