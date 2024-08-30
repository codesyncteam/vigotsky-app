import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Button } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { API_URL } from '@/scr/config'; 

SplashScreen.preventAutoHideAsync();


export default function Home() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = Colors[colorScheme ?? 'light'].text;

  const events = [
    {
      title: 'Taller de Matemáticas',
      description: 'Invitamos a los estudiantes de secundaria al taller intensivo de matemáticas que se realizará el próximo sábado.',
      department: 'Departamento de Matemáticas',
      date: '12 Nov 2023',
      image: 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
      details: 'Este taller está diseñado para ayudar a los estudiantes a mejorar sus habilidades en matemáticas antes de los exámenes finales. Se cubrirán temas como álgebra, geometría, y trigonometría. Los estudiantes deben traer calculadora, cuaderno y lápiz. El taller se llevará a cabo de 9:00 AM a 1:00 PM.',
    },
    {
      title: 'Festival de Primavera',
      description: 'El próximo viernes se celebrará el Festival de Primavera en las instalaciones de la escuela.',
      department: 'Departamento de Actividades Extracurriculares',
      date: '18 Nov 2023',
      image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      details: 'El Festival de Primavera incluirá presentaciones artísticas, juegos, y venta de comida. Todos los fondos recaudados serán destinados a mejoras en la escuela. Las puertas se abrirán a las 4:00 PM y el evento finalizará a las 9:00 PM. Se invita a todos los estudiantes, padres y personal a participar.',
    },
    {
      title: 'Charla sobre Salud Mental',
      description: 'Se invita a los padres y estudiantes a una charla sobre la importancia de la salud mental en el ámbito escolar.',
      department: 'Departamento de Psicología',
      date: '20 Nov 2023',
      image: 'https://img.freepik.com/foto-gratis/belleza-otonal-abstracta-patron-venas-hoja-multicolor-generado-ia_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid',
      details: 'La charla será impartida por expertos en psicología educativa y abordará temas como el manejo del estrés, la ansiedad, y la importancia de mantener un equilibrio entre el estudio y la vida personal. El evento se llevará a cabo en el auditorio de la escuela a las 5:00 PM. Se recomienda la asistencia de padres y estudiantes.',
    },
  ];

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      {events.map((event, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => openModal(event)}>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <Text style={styles.cardContent}>{event.description}</Text>
          <Image source={{ uri: event.image }} style={styles.cardImage} />
          <View style={styles.cardFooter}>
            <Text style={styles.cardDepartment}>{event.department}</Text>
            <Text style={styles.cardDate}>{event.date}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal
        visible={modalVisible}
        animationType="fade" // Cambia el tipo de animación a "fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                <Text style={styles.modalDescription}>{selectedEvent.details}</Text>
                <Image source={{ uri: selectedEvent.image }} style={styles.modalImage} />
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
  cardDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro sólido
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
