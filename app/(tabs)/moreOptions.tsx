import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from 'react-native';
import { Colors } from '../../src/constants/Colors';

export default function MoreOptions() {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme].tint;
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Link href="/otherScreens/profile" style={styles.cardLink}>
          <View style={[styles.card, { width: width / 2 - 30 }]}>
            <Icon name="person-outline" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>Perfil</Text>
          </View>
        </Link>

        <Link href="/otherScreens/notifications" style={styles.cardLink}>
          <View style={[styles.card, { width: width / 2 - 30 }]}>
            <Icon name="notifications-outline" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>Notificaciones</Text>
          </View>
        </Link>
      </View>
      <View style={styles.row}>
        <Link href="/otherScreens/appSettings" style={styles.cardLink}>
          <View style={[styles.card, { width: width / 2 - 30 }]}>
            <Icon name="settings-outline" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>Configuración</Text>
          </View>
        </Link>

        <Link href="/otherScreens/helpCenter" style={styles.cardLink}>
          <View style={[styles.card, { width: width / 2 - 30 }]}>
            <Icon name="help-circle-outline" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>Centro de Ayuda</Text>
          </View>
        </Link>
      </View>
      <View style={styles.row}>
        <Link href="/otherScreens/privacy" style={styles.cardLink}>
          <View style={[styles.card, { width: width / 2 - 30 }]}>
            <Icon name="shield-checkmark-outline" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>Privacidad</Text>
          </View>
        </Link>

        <Link href="otherScreens/logout" style={styles.cardLink}>
          <View style={[styles.card, { width: width / 2 - 30 }]}>
            <Icon name="log-out-outline" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>Cerrar Sesión</Text>
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
    color: '#333',
    textAlign: 'center',
  },
});
