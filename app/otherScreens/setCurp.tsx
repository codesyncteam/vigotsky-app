import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';  // Usando useRouter
import AsyncStorage from '@react-native-async-storage/async-storage';  // Para obtener el correo almacenado
import { API_URL } from '@/config';  // Asegúrate de tener la URL de la API configurada
import { useNavigation } from 'expo-router';
import * as Updates from 'expo-updates';

export default function SetCurpScreen() {
  const [curp, setCurp] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');  // Estado para almacenar el correo
  const colorScheme = useColorScheme();
  const router = useRouter();
  const navigation = useNavigation();

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

  // Removemos la validación con expresión regular del CURP

  const getToken = async () => {
    return AsyncStorage.getItem('token');
  };

  const handleSubmit = async () => {
    if (!curp) {
      Alert.alert('Error', 'Por favor, ingresa un CURP válido.');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'No se ha encontrado el correo.');
      return;
    }

    setLoading(true);

    try {
      // Realizar la solicitud a la API para establecer el CURP
      const response = await fetch(`${API_URL}/v2/users/set_curp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getToken()}`, 
          },
        body: JSON.stringify({
          curp: curp 
        }), 
      }); 

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'CURP establecido correctamente.');
        await Updates.reloadAsync();
      } else {
        const errorMessage = data.message || 'Hubo un problema al establecer el CURP';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al establecer el CURP.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Ingresa tu CURP</Text>

        <Text style={[styles.instructions, { color: Colors[colorScheme ?? 'light'].text }]}>
          Ingresa el CURP que te proporcionó a la escuela para completar el registro de tu cuenta.
        </Text>

        <TextInput
          style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          placeholder="CURP"
          placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
          value={curp}
          onChangeText={(text) => setCurp(text.toUpperCase())}  // Convertir a mayúsculas
        />

        <TouchableOpacity
          style={[styles.submitButton, { opacity: loading ? 0.5 : 1 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Estableciendo...' : 'Establecer CURP'}
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
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
