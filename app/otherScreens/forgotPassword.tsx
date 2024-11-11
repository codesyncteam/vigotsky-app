import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../src/constants/Colors';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
  const [curp, setCurp] = useState('');
  const [email, setEmail] = useState('');
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handlePasswordReset = () => {
    if (!curp || !email) {
      Alert.alert('Error', 'Por favor, ingresa tu CURP y correo electrónico.');
    } else {
      console.log('Solicitud de recuperación de contraseña enviada');
      Alert.alert('Éxito', 'Se ha enviado un enlace de recuperación a tu correo electrónico.');
      navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Recuperar Contraseña</Text>

      <TextInput
        style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        placeholder="CURP"
        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
        value={curp}
        onChangeText={setCurp}
      />

      <TextInput
        style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        placeholder="Correo Electrónico"
        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Recuperar Contraseña</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  resetButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#29348E',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
