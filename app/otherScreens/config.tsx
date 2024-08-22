import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';

const allergens = [
  { id: '1', name: 'Maní' },
  { id: '2', name: 'Gluten' },
  { id: '3', name: 'Lactosa' },
  { id: '4', name: 'Huevos' },
  { id: '5', name: 'Mariscos' },
];

const foodGroups = [
  { id: '1', name: 'Dulces' },
  { id: '2', name: 'Bebidas azucaradas' },
  { id: '3', name: 'Fritos' },
  { id: '4', name: 'Carne roja' },
];

export default function Config() {
  const [selectedAllergens, setSelectedAllergens] = useState({});
  const [selectedFoodGroups, setSelectedFoodGroups] = useState({});

  const toggleAllergen = (id) => {
    setSelectedAllergens((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFoodGroup = (id) => {
    setSelectedFoodGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderAllergenItem = ({ item }) => (
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>{item.name}</Text>
      <Switch
        value={!!selectedAllergens[item.id]}
        onValueChange={() => toggleAllergen(item.id)}
      />
    </View>
  );

  const renderFoodGroupItem = ({ item }) => (
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>{item.name}</Text>
      <Switch
        value={!!selectedFoodGroups[item.id]}
        onValueChange={() => toggleFoodGroup(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Restricciones</Text>

      <Text style={styles.sectionTitle}>Alimentos a los que es alérgico:</Text>
      <FlatList
        data={allergens}
        renderItem={renderAllergenItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.sectionTitle}>Grupos de alimentos restringidos:</Text>
      <FlatList
        data={foodGroups}
        renderItem={renderFoodGroupItem}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  listContainer: {
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  switchLabel: {
    fontSize: 18,
    color: '#333',
  },
});
