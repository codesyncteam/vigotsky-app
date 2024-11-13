// otherScreens/login.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { API_URL } from '@/config';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Por favor, ingresa el usuario y la contraseña.');
    } else {
      setLoading(true);

      try {
        const url = `${API_URL}/login`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ username, password }).toString(),
        });

        const data = await response.json();

        if (response.ok) {
          const userInfo = data.data.info;

          // Guardar la información del usuario en AsyncStorage
          await AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('token', data.data.token);
          await AsyncStorage.setItem('userId', userInfo.id.toString());
          await AsyncStorage.setItem('username', userInfo.username);
          await AsyncStorage.setItem('email', userInfo.email);
          await AsyncStorage.setItem('firstName', userInfo.first_name);
          await AsyncStorage.setItem('lastName', userInfo.last_name);
          await AsyncStorage.setItem('type', userInfo.type);
          await AsyncStorage.setItem('typeId', userInfo.type_id.toString());

          await Updates.reloadAsync();
        } else {
          Alert.alert('Error', data.message || 'Hubo un problema con la solicitud.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión.');
      } finally {
        setLoading(false);
      }
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
      <Image source={require('../../assets/images/splash.png')} style={styles.logo} />
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Iniciar Sesión</Text>
      <TextInput
        style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        placeholder="Usuario"
        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        placeholder="Contraseña"
        placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.loginButton, { opacity: loading ? 0.5 : 1 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? 'Entrando...' : 'Ingresar'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('otherScreens/forgotPassword')}>
        <Text style={[styles.forgotPassword, { color: Colors[colorScheme ?? 'light'].tint }]}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('otherScreens/register')}>
        <Text style={[styles.registerLink, { color: Colors[colorScheme ?? 'light'].tint }]}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
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
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#29348E',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    fontSize: 14,
    marginTop: 10,
  },
  registerLink: {
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
