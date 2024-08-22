import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
} from 'react-native';

const data = [
  {
    id: '1',
    week: '21 Ago 2024 al 27 Ago 2024',
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
  },
  // Otras semanas
];

export default function ReporteSemanal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const openModal = (item) => {
    setSelectedWeek(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedWeek(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
      <Text style={styles.itemText}>Semana - {item.week}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedWeek && (
              <>
                <Text style={styles.modalTitle}>{selectedWeek.week}</Text>
                <ScrollView horizontal>
                  <View style={styles.tableContainer}>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableHeader, { flex: 1 }]}>
                        Asignatura
                      </Text>
                      <Text style={[styles.tableHeader, { flex: 2 }]}>
                        Situación académica
                      </Text>
                      <Text style={[styles.tableHeader, { flex: 2 }]}>
                        Situación conductual
                      </Text>
                      <Text style={[styles.tableHeader, { flex: 1 }]}>
                        Maestro
                      </Text>
                    </View>
                    {selectedWeek.details.map((detail, index) => (
                      <View
                        key={index}
                        style={[
                          styles.tableRow,
                          index % 2 === 0 ? styles.evenRow : styles.oddRow, // Estilo condicional para alternar colores
                        ]}
                      >
                        <Text style={[styles.tableCell, { flex: 1 }]}>
                          {detail.subject}
                        </Text>
                        <Text style={[styles.tableCell, { flex: 2 }]}>
                          {detail.academic}
                        </Text>
                        <Text style={[styles.tableCell, { flex: 2 }]}>
                          {detail.conduct}
                        </Text>
                        <Text style={[styles.tableCell, { flex: 1 }]}>
                          {detail.teacher}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
                <Button title="Cerrar" onPress={closeModal} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: 900, // Ancho de la tabla para permitir scroll horizontal
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'start',
  },
  tableCell: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'justify',
  },
  evenRow: {
    backgroundColor: '#f9f9f9', // Color para las filas pares
  },
  oddRow: {
    backgroundColor: '#ffffff', // Color para las filas impares
  },
});
