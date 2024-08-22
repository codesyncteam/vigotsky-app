import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const data = [
    { id: '16', type: 'Salida', time: '02:40 PM', date: '28 Ago 2024' },
    { id: '15', type: 'Entrada', time: '07:55 AM', date: '28 Ago 2024' },
    { id: '14', type: 'Salida', time: '02:30 PM', date: '27 Ago 2024' },
    { id: '13', type: 'Entrada', time: '07:45 AM', date: '27 Ago 2024' },
    { id: '12', type: 'Salida', time: '02:35 PM', date: '26 Ago 2024' },
    { id: '11', type: 'Entrada', time: '07:50 AM', date: '26 Ago 2024' },
    { id: '10', type: 'Salida', time: '02:15 PM', date: '25 Ago 2024' },
    { id: '9', type: 'Entrada', time: '08:00 AM', date: '25 Ago 2024' },
    { id: '8', type: 'Salida', time: '02:20 PM', date: '24 Ago 2024' },
    { id: '7', type: 'Entrada', time: '07:55 AM', date: '24 Ago 2024' },
    { id: '6', type: 'Salida', time: '02:25 PM', date: '23 Ago 2024' },
    { id: '5', type: 'Entrada', time: '07:40 AM', date: '23 Ago 2024' },
    { id: '4', type: 'Salida', time: '02:35 PM', date: '22 Ago 2024' },
    { id: '3', type: 'Entrada', time: '07:50 AM', date: '22 Ago 2024' },
    { id: '2', type: 'Salida', time: '02:30 PM', date: '21 Ago 2024' },
    { id: '1', type: 'Entrada', time: '07:45 AM', date: '21 Ago 2024' }
  ];
  
  

export default function Check() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {item.type} - {item.time} - {item.date}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
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
});
