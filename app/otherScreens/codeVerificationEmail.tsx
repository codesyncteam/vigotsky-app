// app/otherScreens/codeverificationemail.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';  // Usando useRouter
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importamos AsyncStorage
import { API_URL } from '@/config';  // Asumiendo que tienes la URL de la API configurada

export default function VerificationCodeScreen() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');  // Estado para almacenar el correo
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    // Recuperar el correo del AsyncStorage
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('user_email');
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error al obtener el correo del AsyncStorage:', error);
      }
    };

    fetchEmail();
  }, []);

  const handleVerification = async () => {
    if (code.length !== 4) {
      Alert.alert('Error', 'Por favor, ingresa un código de 4 dígitos.');
      return;
    }

    setLoading(true);

    try {
      // Realizar la solicitud a la API con el código, correo y id_customer
      const response = await fetch(`${API_URL}/v2/users/verify_code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code,
          id_customer: 1,  // Asumiendo que el id_customer es fijo y no cambia
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Código de verificación correcto.');
        // Redirigir a la pantalla de seteo de contraseña
        router.push('/otherScreens/setPassword');

      } else {
        // Manejo del error 422 con mensaje específico de código inválido o expirado
        if (response.status === 422 && data.error === 'Código inválido o expirado.') {
          Alert.alert('Error', 'El código ingresado es inválido o ha expirado. Intenta de nuevo.');
        } else {
          const errorMessage = data.message || 'Hubo un problema al verificar el código';
          Alert.alert('Error', errorMessage);
        }
        console.error(data);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al verificar el código.');
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
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Verificación de código</Text>

        <Text style={[styles.instructions, { color: Colors[colorScheme ?? 'light'].text }]}>
          El código de verificación ha sido enviado a tu correo electrónico registrado. Si no lo encuentras, es posible que nuestro mensaje haya decidido irse de vacaciones a tu carpeta de spam o correo no deseado. ¡Dale un vistazo por allá!
        </Text>

        <TextInput
          style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          placeholder="Ingresa el código"
          placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={4}
        />

        <TouchableOpacity
          style={[styles.verifyButton, { opacity: loading ? 0.5 : 1 }]}
          onPress={handleVerification}
          disabled={loading}
        >
          <Text style={styles.verifyButtonText}>
            {loading ? 'Verificando...' : 'Verificar código'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} >
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
  verifyButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#29348E',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
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
