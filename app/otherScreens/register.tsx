import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../src/constants/Colors';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastNamePaterno, setLastNamePaterno] = useState('');
  const [lastNameMaterno, setLastNameMaterno] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [curp, setCurp] = useState('');

  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handleRegister = () => {
    // Aquí puedes añadir la lógica para manejar el registro
    if (!firstName || !lastNamePaterno || !lastNameMaterno || !phone || !email || !curp) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    } else {
      console.log('Registro exitoso');
      navigation.navigate('Home'); // Redirige a la pantalla principal después del registro
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Registro</Text>

      <TextInput
        style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        placeholder="Nombre"
        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        placeholder="Apellido Paterno"
        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
        value={lastNamePaterno}
        onChangeText={setLastNamePaterno}
      />

      <TextInput
        style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        placeholder="Apellido Materno"
        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
        value={lastNameMaterno}
        onChangeText={setLastNameMaterno}
      />

      <TextInput
        style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        placeholder="Teléfono"
        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        placeholder="Email"
        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        placeholder="CURP"
        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
        value={curp}
        onChangeText={setCurp}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
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
  registerButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#29348E',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
