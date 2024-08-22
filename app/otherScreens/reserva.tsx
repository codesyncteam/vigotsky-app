import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const reservaData = [
  { id: '1', day: 'Lunes' },
  { id: '2', day: 'Martes' },
  { id: '3', day: 'Miércoles' },
  { id: '4', day: 'Jueves' },
  { id: '5', day: 'Viernes' },
];

export default function Reserva() {
  const [selectedMeals, setSelectedMeals] = useState({});

  const toggleButton = (day, meal) => {
    setSelectedMeals((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: !prev[day]?.[meal],
      },
    }));
  };

  const selectAll = () => {
    const allSelected = reservaData.reduce((acc, item) => {
      acc[item.day] = { Desayuno: true, Comida: true };
      return acc;
    }, {});
    setSelectedMeals(allSelected);
  };

  const deselectAll = () => {
    setSelectedMeals({});
  };

  const handleReservation = () => {
    console.log('Reserva realizada:', selectedMeals);
    alert('Reserva realizada con éxito');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.selectButton, { backgroundColor: '#4CAF50' }]} onPress={selectAll}>
          <Text style={styles.buttonText}>Seleccionar Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.selectButton, { backgroundColor: '#FF5252' }]} onPress={deselectAll}>
          <Text style={styles.buttonText}>Deseleccionar Todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {reservaData.map((item) => (
          <View key={item.id} style={styles.column}>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>{item.day}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.mealButton,
                    { backgroundColor: selectedMeals[item.day]?.Desayuno ? '#4CAF50' : '#ccc' },
                  ]}
                  onPress={() => toggleButton(item.day, 'Desayuno')}
                >
                  <Text style={styles.buttonText}>Desayuno {selectedMeals[item.day]?.Desayuno ? '✅' : '⬜️'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.mealButton,
                    { backgroundColor: selectedMeals[item.day]?.Comida ? '#4CAF50' : '#ccc' },
                  ]}
                  onPress={() => toggleButton(item.day, 'Comida')}
                >
                  <Text style={styles.buttonText}>Comida {selectedMeals[item.day]?.Comida ? '✅' : '⬜️'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.reserveButtonContainer}>
        <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
          <Text style={styles.reserveButtonText}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f8f8f8',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
    marginBottom: 20,
  },
  dayContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonRow: {
    marginBottom: 8,
  },
  mealButton: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectButton: {
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  reserveButtonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  reserveButton: {
    backgroundColor: '#29348E',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
