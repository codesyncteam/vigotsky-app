// otherScreens/setPassword.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';  // Usando useRouter
import AsyncStorage from '@react-native-async-storage/async-storage';  // Para obtener el correo almacenado
import { API_URL } from '@/config';  // Asegúrate de tener la URL de la API configurada
import * as Updates from 'expo-updates';

export default function SetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');  // Estado para almacenar el correo
  const colorScheme = useColorScheme();
  const router = useRouter();

  // Obtener el correo de AsyncStorage al cargar la pantalla
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('user_email');
        if (storedEmail) {
          setEmail(storedEmail);
        } else {
          Alert.alert('Error', 'No se encontró el correo registrado.');
        }
      } catch (error) {
        console.error('Error al obtener el correo:', error);
        Alert.alert('Error', 'Hubo un problema al recuperar el correo.');
      }
    };

    fetchEmail();
  }, []);

  // Validación para la contraseña
  const validatePassword = () => {
    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/\d/.test(password)) {
      return 'La contraseña debe contener al menos un número';
    }
    if (!/[A-Za-z]/.test(password)) {
      return 'La contraseña debe contener al menos una letra';
    }
    if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden';
    }
    return null;
  };

  const handleSubmit = async () => {
    const errorMessage = validatePassword();
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
      return;
    }

    if (!email) {
      Alert.alert('Error', 'No se ha encontrado el correo.');
      return;
    }

    setLoading(true);

    try {
      // Realizar la solicitud a la API para establecer la contraseña
      const response = await fetch(`${API_URL}/v2/users/set_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,  // Usamos el correo recuperado de AsyncStorage
          password: password,
          id_customer: 1,  // Asumiendo que el id_customer es fijo y no cambia
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Contraseña establecida correctamente.');

        // Realizar el login automáticamente después de establecer la contraseña
        const loginResponse = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            username: email, // Usamos el email como username para el login
            password: password,
          }).toString(),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          const userInfo = loginData.data.info;

          // Guardar la información del usuario en AsyncStorage
          await AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('token', loginData.data.token);
          await AsyncStorage.setItem('userId', userInfo.id.toString());
          await AsyncStorage.setItem('username', userInfo.username);
          await AsyncStorage.setItem('email', userInfo.email);
          await AsyncStorage.setItem('firstName', userInfo.first_name);
          await AsyncStorage.setItem('lastName', userInfo.last_name);
          await AsyncStorage.setItem('type', userInfo.type);
          await AsyncStorage.setItem('typeId', userInfo.type_id.toString());

          await Updates.reloadAsync();
        } else {
          Alert.alert('Error', loginData.message || 'Hubo un problema al iniciar sesión.');
        }
      } else {
        const errorMessage = data.message || 'Hubo un problema al establecer la contraseña';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al establecer la contraseña.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Establecer Contraseña</Text>

        <Text style={[styles.instructions, { color: Colors[colorScheme ?? 'light'].text }]}>
          Ingresa una nueva contraseña para tu cuenta.
        </Text>

        <TextInput
          style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          placeholder="Contraseña"
          placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          placeholder="Confirmar Contraseña"
          placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.submitButton, { opacity: loading ? 0.5 : 1 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Estableciendo...' : 'Establecer Contraseña'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.goBackLink, { color: Colors[colorScheme ?? 'light'].tint }]}>
            ¿Volver atrás?
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  submitButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#29348E',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  goBackLink: {
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
