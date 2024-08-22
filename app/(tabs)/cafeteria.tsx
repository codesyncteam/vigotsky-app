import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme].tint;
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Link href="/otherScreens/menu" style={styles.cardLink}>
          <View style={[styles.card, { width: width / 2 - 30 }]}>
            <Icon name="restaurant-outline" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>Ver Menú</Text>
            <Text style={styles.cardContent}>Consulta el menú semanal de la cafetería.</Text>
          </View>
        </Link>

        <Link href="/otherScreens/reserva" style={styles.cardLink}>
          <View style={[styles.card, { width: width / 2 - 30 }]}>
            <Icon name="cart-outline" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>Reserva</Text>
            <Text style={styles.cardContent}>Reserva tus comidas para la semana.</Text>
          </View>
        </Link>
      </View>
      <View style={styles.row}>
        <Link href="/otherScreens/log" style={styles.cardLink}>
          <View style={[styles.card, { width: width / 2 - 30 }]}>
            <Icon name="receipt-outline" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>Historial</Text>
            <Text style={styles.cardContent}>Revisa tu historial de compras en la cafetería.</Text>
          </View>
        </Link>

        <Link href="/otherScreens/config" style={styles.cardLink}>
          <View style={[styles.card, { width: width / 2 - 30 }]}>
            <Icon name="settings-outline" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>Configuración</Text>
            <Text style={styles.cardContent}>Ajusta tus preferencias y configuraciones.</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardLink: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    height: 180, // Altura fija para las tarjetas
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center', // Asegura que el contenido esté centrado verticalmente
  },
  icon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
