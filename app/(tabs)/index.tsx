import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Button, RefreshControl } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../src/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { fetchEvents } from '../../src/api/api';  
import { API_URL } from '../../src/config';  

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);  // Estado para manejar el refresco
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = Colors[colorScheme ?? 'light'].text;

  useEffect(() => {
    const checkSession = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        console.log('isLoggedIn', isLoggedIn);
        if (isLoggedIn !== 'true') {
          console.log('No hay sesión activa');
          navigation.replace('otherScreens/login');
        } else {
          console.log('Sesión activa');
          setLoading(false);
        }
      } catch (e) {
        console.error('Error al verificar la sesión', e);
        navigation.replace('otherScreens/login');
      }
    };

    checkSession();
  }, [navigation]);

  useEffect(() => {
    // Llamar a fetchEvents al cargar la pantalla
    const url = `${API_URL}/v2/reportes_avanzados/consulta/122`;
    const method = 'POST';  // Método 'POST'
    fetchEvents(setEvents, url, method, {});
  }, []);

  // Función para manejar el refresco
  const onRefresh = async () => {
    setIsRefreshing(true);  // Iniciar el estado de refresco
    const url = `${API_URL}/v2/reportes_avanzados/consulta/122`;
    const method = 'POST';  // Método 'POST'
    await fetchEvents(setEvents, url, method, {});  // Actualizar los eventos
    setIsRefreshing(false);  // Detener el refresco
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}  // Indica si está refrescando
          onRefresh={onRefresh}  // Acción para refrescar
        />
      }
    >
      {events.map((event, index) => (
        <TouchableOpacity key={event.id || index} style={styles.card} onPress={() => openModal(event)}>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <Text style={styles.cardContent}>{event.short_description}</Text>
          <Image source={{ uri: event.image_url || 'https://via.placeholder.com/150' }} style={styles.cardImage} />
          <View style={styles.cardFooter}>
            <Text style={styles.cardDepartment}>{event.area_name}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                <Text style={styles.modalDescription}>{selectedEvent.description}</Text>
                <Image source={{ uri: selectedEvent.image_url || 'https://via.placeholder.com/200' }} style={styles.modalImage} />
                <Button title="Cerrar" onPress={closeModal} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  card: {
    width: '95%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDepartment: {
    fontSize: 12,
    color: '#999',
    textAlign: 'left',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});
