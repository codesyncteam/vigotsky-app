// app/otherScreens/register.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { API_URL } from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importamos AsyncStorage

export default function ForgotPassword() {
  const [first_name, setFirstName] = useState('');
  const [last_name_paterno, setLastNamePaterno] = useState('');
  const [last_name_materno, setLastNameMaterno] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const colorScheme = useColorScheme();
  const router = useRouter();

  const last_name_paternoRef = useRef(null);
  const last_name_maternoRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!first_name || !last_name_paterno || !last_name_materno || !phone || !email) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      return false;
    }

    if (!phoneRegex.test(phone)) {
      Alert.alert('Error', 'Por favor, ingresa un número de teléfono válido de 10 dígitos.');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const url = `${API_URL}/v2/users/register_app_vigo`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name_paterno,
          last_name_materno,
          phone,
          email,
          id_customer: 1,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Guardar el correo en AsyncStorage
        await AsyncStorage.setItem('user_email', email);
        Alert.alert('Éxito', 'Código de verificación enviado');
        router.push('/otherScreens/codeVerificationEmail');
      } else {
        const errorMessage = data.error === 'Email registrado previamente.'
          ? 'Este correo ya está registrado.'
          : data.message || 'Hubo un problema con el registro';
        Alert.alert('Error', errorMessage);
        console.error(data);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} contentInsetAdjustmentBehavior="automatic">
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Recuperar contraseña</Text>

        <TextInput
          style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          placeholder="Nombre"
          placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
          value={first_name}
          onChangeText={setFirstName}
          returnKeyType="next"
          onSubmitEditing={() => last_name_paternoRef.current.focus()}
        />

        <TextInput
          ref={last_name_paternoRef}
          style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          placeholder="Apellido Paterno"
          placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
          value={last_name_paterno}
          onChangeText={setLastNamePaterno}
          returnKeyType="next"
          onSubmitEditing={() => last_name_maternoRef.current.focus()}
        />

        <TextInput
          ref={last_name_maternoRef}
          style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          placeholder="Apellido Materno"
          placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
          value={last_name_materno}
          onChangeText={setLastNameMaterno}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
        />

        <TextInput
          ref={emailRef}
          style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          placeholder="Email"
          placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current.focus()}
        />

        <TextInput
          ref={phoneRef}
          style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          placeholder="Teléfono"
          placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          returnKeyType="done"
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.registerButtonText}>Recuperar contraseña</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    flexGrow: 1,
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
