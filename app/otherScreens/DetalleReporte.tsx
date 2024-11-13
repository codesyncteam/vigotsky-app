import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const report = {
  week: 'Semana 42 - 21 Ago 2024 al 27 Ago 2024',
  details: [
    {
      subject: 'Español',
      academic: 'Sin pendientes',
      conduct: '',
      teacher: '',
    },
    {
      subject: 'Inglés',
      academic:
        'Tienes pendientes por realizar en tu kn book, las actividades están marcadas en la parte posterior de cada página.',
      conduct: 'Solo evita platicar en clase.',
      teacher: 'Miss Adriana',
    },
    { subject: 'Tecnología', academic: '', conduct: '', teacher: '' },
    { subject: 'Música', academic: '', conduct: '', teacher: '' }, 
    {
      subject: 'Educación Física',
      academic: '',
      conduct: '',
      teacher: 'Prof. Carlos',
    },
    {
      subject: 'Francés',
      academic: 'Sin pendientes',
      conduct: 'Buena conducta.',
      teacher: 'Profe Roberto',
    },
  ],
};

export default function DetalleReporte() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{report.week}</Text>
      {report.details.map((detail, index) => (
        <View key={index} style={styles.detailContainer}>
          <Icon name="book" size={20} color="#333" style={styles.icon} />
          <Text style={styles.subject}>{detail.subject}</Text>
          <Text style={styles.text}>Académico: {detail.academic || 'N/A'}</Text>
          <Text style={styles.text}>Conducta: {detail.conduct || 'N/A'}</Text>
          <Text style={styles.text}>Profesor: {detail.teacher || 'N/A'}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailContainer: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  icon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});
