import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Por favor, ingresa el usuario y la contraseña.');
    } else {
      console.log('Sesión iniciada');
      navigation.navigate('index');
    }
  };

  useLayoutEffect(() => {
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
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Ingresar</Text>
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
