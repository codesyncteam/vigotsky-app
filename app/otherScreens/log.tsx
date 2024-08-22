import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';

const logData = [
  { 
    id: '1', 
    date: '21 Ago 2024', 
    amount: '$50.00', 
    details: [
      { id: '1', name: 'Plato de Pollo Asado', price: '$20.00' },
      { id: '2', name: 'Ensalada César', price: '$10.00' },
      { id: '3', name: 'Bebida Refrescante', price: '$5.00' },
      { id: '4', name: 'Postre de Chocolate', price: '$8.00' },
      { id: '5', name: 'Sopa de Vegetales', price: '$7.00' },
    ]
  },
  { 
    id: '2', 
    date: '20 Ago 2024', 
    amount: '$30.00', 
    details: [
      { id: '1', name: 'Sandwich de Pavo', price: '$15.00' },
      { id: '2', name: 'Bebida de Naranja', price: '$5.00' },
      { id: '3', name: 'Postre de Vainilla', price: '$10.00' },
    ]
  },
  // Otros registros...
];

export default function Log() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={logData}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
            <Text style={styles.itemDate}>{item.date}</Text>
            <Text style={styles.itemAmount}>{item.amount}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalDate}>{selectedItem.date}</Text>
                <View style={styles.table}>
                  {selectedItem.details.map((item) => (
                    <View key={item.id} style={styles.tableRow}>
                      <Text style={styles.tableCellName}>{item.name}</Text>
                      <Text style={styles.tableCellPrice}>{item.price}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.modalAmount}>Total: {selectedItem.amount}</Text>
                <View style={styles.buttonSpacer} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDate: {
    fontSize: 16,
    color: '#333',
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalDate: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCellName: {
    fontSize: 16,
    color: '#333',
    flex: 2,
  },
  tableCellPrice: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  modalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20, // Separación del total con la lista de detalles
  },
  buttonSpacer: {
    height: 20, // Espacio entre el total y el botón
  },
});
