import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Colors } from '../../src/constants/Colors';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { API_URL } from '../../src/config'; 
 
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para gestionar el estado de carga
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Por favor, ingresa el usuario y la contraseña.');
    } else {
      setLoading(true); // Deshabilitar el botón y cambiar el texto
  
      try {
        const url = `${API_URL}/login`;
        console.log('URL:', url);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            username,
            password,
          }).toString(),
        });
  
        console.log('Respuesta:', response);
  
        const data = await response.json();
        console.log('Data:', data);
  
        if (response.ok) {
          console.log('Sesión iniciada');
          
          // Extraer información del usuario
          const userInfo = data.data.info;
  
          // Guardar el token y la información del usuario en AsyncStorage
          try {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('token', data.data.token);
  
            // Guardar cada campo de userInfo por separado
            await AsyncStorage.setItem('userId', userInfo.id.toString());
            await AsyncStorage.setItem('username', userInfo.username);
            await AsyncStorage.setItem('email', userInfo.email);
            await AsyncStorage.setItem('firstName', userInfo.first_name);
            await AsyncStorage.setItem('lastName', userInfo.last_name);
            await AsyncStorage.setItem('type', userInfo.type);
            await AsyncStorage.setItem('typeId', userInfo.type_id.toString());
  
            await Updates.reloadAsync();
          } catch (e) {
            console.error('Error al guardar la sesión', e);
          }
        } else {
          // Mostrar el mensaje de error del API
          Alert.alert('Error', data.message || 'Hubo un problema con la solicitud.');
        }
      } catch (error) { 
        console.error(`Error al iniciar sesión. URL: ${url}`, error);

        Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión.');
      } finally {
        setLoading(false); // Habilitar el botón y restablecer el texto
      }
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
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.loginButton, { opacity: loading ? 0.5 : 1 }]} // Reducir la opacidad cuando está cargando
        onPress={handleLogin}
        disabled={loading} // Deshabilitar el botón cuando está cargando
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
